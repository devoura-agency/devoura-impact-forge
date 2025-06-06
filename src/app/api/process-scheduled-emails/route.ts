import { NextResponse } from 'next/server';
import { collection, query, where, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Get all pending scheduled emails that are due
    const now = new Date();
    const scheduledEmailsRef = collection(db, 'scheduledEmails');
    const q = query(
      scheduledEmailsRef,
      where('status', '==', 'pending'),
      where('scheduledFor', '<=', now.toISOString())
    );

    const snapshot = await getDocs(q);
    const scheduledEmails = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (scheduledEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No scheduled emails to process'
      });
    }

    const results = {
      processed: 0,
      success: 0,
      failed: 0
    };

    // Process each scheduled email batch
    for (const batch of scheduledEmails) {
      try {
        // Update status to processing
        await updateDoc(doc(db, 'scheduledEmails', batch.id), {
          status: 'processing',
          startedAt: now.toISOString()
        });

        // Send emails to each recipient
        for (const recipient of batch.recipients) {
          try {
            await resend.emails.send({
              from: 'Devoura <onboarding@resend.dev>',
              to: recipient.email,
              subject: batch.subject,
              html: batch.message,
              attachments: batch.attachments?.map((file: any) => ({
                filename: file.name,
                content: file.content
              }))
            });

            results.success++;
          } catch (error) {
            console.error(`Failed to send email to ${recipient.email}:`, error);
            results.failed++;

            // Log the error
            await addDoc(collection(db, 'emailErrors'), {
              batchId: batch.id,
              recipient: recipient.email,
              error: error instanceof Error ? error.message : 'Unknown error',
              timestamp: now.toISOString()
            });
          }
        }

        // Update batch status to completed
        await updateDoc(doc(db, 'scheduledEmails', batch.id), {
          status: 'completed',
          completedAt: now.toISOString(),
          results: {
            success: results.success,
            failed: results.failed
          }
        });

        results.processed++;
      } catch (error) {
        console.error(`Failed to process batch ${batch.id}:`, error);
        
        // Update batch status to failed
        await updateDoc(doc(db, 'scheduledEmails', batch.id), {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          failedAt: now.toISOString()
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Processed ${results.processed} batches (${results.success} successful, ${results.failed} failed)`
    });
  } catch (error) {
    console.error('Error processing scheduled emails:', error);
    return NextResponse.json(
      { error: 'Failed to process scheduled emails' },
      { status: 500 }
    );
  }
} 