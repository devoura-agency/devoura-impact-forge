import { NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { recipients, subject, message, scheduledFor, attachments } = await req.json();

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

    if (!scheduledFor) {
      return NextResponse.json(
        { error: 'Scheduled time is required' },
        { status: 400 }
      );
    }

    const scheduledTime = new Date(scheduledFor);
    if (scheduledTime < new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      );
    }

    // Create a scheduled email batch record
    const batchRef = await addDoc(collection(db, 'scheduledEmails'), {
      recipients,
      subject,
      message,
      scheduledFor: scheduledTime.toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      attachments: attachments || []
    });

    return NextResponse.json({
      success: true,
      batchId: batchRef.id,
      scheduledFor: scheduledTime.toISOString()
    });
  } catch (error) {
    console.error('Error scheduling emails:', error);
    return NextResponse.json(
      { error: 'Failed to schedule emails' },
      { status: 500 }
    );
  }
} 