import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const resend = new Resend(process.env.RESEND_API_KEY);
const DAILY_EMAIL_LIMIT = 100;

// Check daily email count
async function checkDailyEmailCount() {
  const today = new Date().toISOString().split('T')[0];
  const counterRef = collection(db, 'emailCounters');
  const counterDoc = await getDocs(query(counterRef, where('date', '==', today)));
  
  if (counterDoc.empty) {
    return 0;
  }
  
  return counterDoc.docs[0].data().count;
}

// Increment daily email count
async function incrementDailyEmailCount() {
  const today = new Date().toISOString().split('T')[0];
  const counterRef = collection(db, 'emailCounters');
  const counterDoc = await getDocs(query(counterRef, where('date', '==', today)));
  
  if (counterDoc.empty) {
    await addDoc(counterRef, {
      date: today,
      count: 1
    });
    return 1;
  }
  
  const docRef = counterDoc.docs[0].ref;
  const newCount = counterDoc.docs[0].data().count + 1;
  await updateDoc(docRef, { count: newCount });
  return newCount;
}

export async function POST(req: Request) {
  try {
    const { recipients, subject, message, attachments } = await req.json();

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients provided' },
        { status: 400 }
      );
    }

    if (!subject || !message) {
      return NextResponse.json(
        { error: 'Subject and message are required' },
        { status: 400 }
      );
    }

    // Check daily limit
    const currentCount = await checkDailyEmailCount();
    if (currentCount >= DAILY_EMAIL_LIMIT) {
      return NextResponse.json(
        { 
          error: 'Daily email limit reached',
          dailyCount: currentCount,
          remainingEmails: 0
        },
        { status: 429 }
      );
    }

    // Create batch record
    const batchRef = await addDoc(collection(db, 'bulkEmailBatches'), {
      sentAt: new Date().toISOString(),
      recipients,
      status: 'in_progress',
      stats: {
        total: recipients.length,
        success: 0,
        failed: 0
      }
    });

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ recipient: string; error: string }>
    };

    // Process each recipient
    for (const recipient of recipients) {
      try {
        // Check if we've hit the daily limit
        const currentCount = await checkDailyEmailCount();
        if (currentCount >= DAILY_EMAIL_LIMIT) {
          throw new Error('Daily email limit reached');
        }

        // Send email
        await resend.emails.send({
          from: 'Devoura <onboarding@resend.dev>',
          to: recipient.email,
          subject,
          html: message,
          attachments: attachments?.map((file: any) => ({
            filename: file.name,
            content: file.content
          }))
        });

        // Increment counter and update results
        await incrementDailyEmailCount();
        results.success++;

        // Log successful email
        await addDoc(collection(db, 'emailHistory'), {
          recipient,
          status: 'success',
          sentAt: new Date().toISOString(),
          batchId: batchRef.id
        });

      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
        results.failed++;
        results.errors.push({
          recipient: recipient.email,
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        // Log failed email
        await addDoc(collection(db, 'emailHistory'), {
          recipient,
          status: 'failed',
          sentAt: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error',
          batchId: batchRef.id
        });
      }
    }

    // Update batch record with final results
    await updateDoc(doc(db, 'bulkEmailBatches', batchRef.id), {
      status: 'completed',
      stats: {
        total: recipients.length,
        success: results.success,
        failed: results.failed
      }
    });

    // Get final count
    const finalCount = await checkDailyEmailCount();

    return NextResponse.json({
      success: true,
      batchId: batchRef.id,
      results,
      dailyCount: finalCount,
      remainingEmails: DAILY_EMAIL_LIMIT - finalCount
    });

  } catch (error) {
    console.error('Error in bulk email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send bulk emails',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 