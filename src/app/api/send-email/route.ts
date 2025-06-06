import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateEmailTemplate({ name, ngoType, subject }: { name: string; ngoType: string; subject: string }) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 50%, #d4af37 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: #4A6741; font-size: 20px;">📧</span>
            </div>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${subject || 'Devoura NGO Collaboration'}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; font-weight: 300;">
            Empowering NGOs through digital transformation
          </p>
        </div>
      </div>

      <!-- Content Section -->
      <div style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h2 style="color: #4A6741; font-size: 24px; margin: 0 0 15px; font-weight: 600;">
            💫 Thank You for Your Interest in Devoura!
          </h2>
          <p style="color: #666; font-size: 16px; line-height: 1.8; margin: 0; max-width: 520px; margin: 0 auto;">
            Dear <strong style="color: #4A6741;">${name}</strong>, thank you for your interest in our NGO-focused digital solutions. We're excited to help amplify your impact in the ${ngoType} sector through innovative digital strategies.
          </p>
        </div>

        <!-- Impact Statement -->
        <div style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); border-radius: 15px; padding: 25px; margin: 30px 0; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 15px; font-weight: 700; position: relative; z-index: 1;">
            💫 Together, We Can Create Lasting Change!
          </h3>
          <p style="color: #4A6741; font-size: 14px; margin: 0; line-height: 1.6; font-weight: 500; position: relative; z-index: 1;">
            Our team is dedicated to helping NGOs like yours reach more supporters, streamline operations, and maximize impact through digital innovation. We look forward to discussing how we can support your mission!
          </p>
        </div>

        <!-- Signature -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f9f7;">
          <p style="color: #4A6741; font-size: 16px; margin: 0 0 10px; font-weight: 600;">
            Best regards,
          </p>
          <p style="color: #666; font-size: 14px; margin: 0; font-weight: 500;">
            The Devoura Team 📧
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0; font-style: italic;">
            Your Digital Transformation Partners & Social Impact Amplifiers 🌟
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); padding: 25px 30px; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px; position: relative; z-index: 1;">
          <div style="width: 35px; height: 35px; background: rgba(74, 103, 65, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: #4A6741; font-size: 16px; font-weight: bold;">D</span>
          </div>
          <span style="color: #4A6741; font-size: 18px; font-weight: 700;">Devoura</span>
        </div>
        <p style="color: #4A6741; margin: 0; font-size: 13px; font-weight: 500; opacity: 0.8; position: relative; z-index: 1;">
          🌟 Digital Solutions | 💼 NGO Focus | 🌍 Social Impact | 💚 Your Success Partner
        </p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const { name, email, ngoType, subject } = await request.json();

    // Validate required fields
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

    // Generate email template
    const htmlContent = generateEmailTemplate({ name, ngoType, subject });

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
    console.error('Email sending error:', error);

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