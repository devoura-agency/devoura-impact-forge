import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const resend = new Resend(process.env.RESEND_API_KEY);

// Add website URL constant
const WEBSITE_URL = 'https://devoura.vercel.app';

// Function to get HTML template based on NGO type
const getEmailTemplate = async (name: string, ngoType: string) => {
  try {
    // Map ngoType to template filename
    const templateMap: Record<string, string> = {
      'education': 'education-template.html',
      'women-empowerment': 'women-empowerment-template.html',
      'wildlife': 'wildlife-template.html',
      'community-service': 'community-service-template.html',
      'health-and-wellness': 'health-wellness-template.html',
      'disaster-management': 'disaster-management-template.html',
      'other': 'general-template.html'
    };

    const templateFile = templateMap[ngoType] || 'general-template.html';
    const response = await fetch(`${WEBSITE_URL}/email-templates/${templateFile}`);
    
    if (!response.ok) {
      console.warn(`Template not found: ${templateFile}`);
      return null;
    }

    let template = await response.text();
    
    // Replace placeholders in the template
    template = template.replace(/{{name}}/g, name);
    template = template.replace(/{{website_url}}/g, WEBSITE_URL);
    
    return template;
  } catch (error) {
    console.error('Error reading email template:', error);
    return null;
  }
};

export async function POST(request: Request) {
  try {
    const { name, email, ngoType, subject } = await request.json();

    if (!name || !email || !ngoType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get HTML template
    const htmlContent = await getEmailTemplate(name, ngoType);
    if (!htmlContent) {
      return NextResponse.json(
        { error: 'Failed to load email template' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Devoura <noreply@devoura.vercel.app>',
      to: email,
      subject: subject || 'Devoura NGO Collaboration',
      html: htmlContent,
    });

    if (error) {
      throw error;
    }

    // Log successful email in Firestore
    await addDoc(collection(db, 'emailHistory'), {
      recipient: email,
      name,
      ngoType,
      subject,
      status: 'sent',
      sentAt: serverTimestamp(),
      messageId: data?.id
    });

    return NextResponse.json({ 
      message: 'Email sent successfully',
      messageId: data?.id
    });
  } catch (error: any) {
    console.error('Bulk email error:', error);

    // Log error in Firestore
    try {
      await addDoc(collection(db, 'emailErrors'), {
        recipient: email,
        error: error.message,
        timestamp: serverTimestamp(),
        details: error
      });
    } catch (firestoreError) {
      console.error('Failed to log error to Firestore:', firestoreError);
    }

    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message
    }, { status: 500 });
  }
} 