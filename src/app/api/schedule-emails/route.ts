import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const { recipients, subject, message, scheduledTime, attachments } = await request.json();

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients provided' },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!scheduledTime) {
      return NextResponse.json(
        { error: 'Scheduled time is required' },
        { status: 400 }
      );
    }

    // Validate scheduled time is in the future
    const scheduledDate = new Date(scheduledTime);
    if (scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      );
    }

    // Create scheduled email batch record
    const batchRef = await addDoc(collection(db, 'scheduledEmails'), {
      recipients,
      subject,
      message,
      scheduledTime: scheduledDate,
      attachments: attachments || [],
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return NextResponse.json({
      message: 'Emails scheduled successfully',
      batchId: batchRef.id
    });
  } catch (error: any) {
    console.error('Error scheduling emails:', error);
    return NextResponse.json(
      { error: 'Failed to schedule emails', details: error.message },
      { status: 500 }
    );
  }
} 