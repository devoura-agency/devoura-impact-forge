import express from 'express';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import cors from 'cors';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const { EMAIL_USER, EMAIL_PASS } = process.env;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqy-_3SgNgrEQZZUsvWGMDgmYiXG3wbmQ",
  authDomain: "devoura-b217f.firebaseapp.com",
  projectId: "devoura-b217f",
  storageBucket: "devoura-b217f.firebasestorage.app",
  messagingSenderId: "1098617752715",
  appId: "1:1098617752715:web:3cbc501b389f1c143cd88e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

function callRequestEmail({ number, time, language, name }, isAdmin = false) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 50%, #d4af37 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: #4A6741; font-size: 20px;">📞</span>
            </div>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${isAdmin ? 'Passionate NGO Leader Awaits Your Call!' : 'Your Consultation Call is Confirmed! 🎉'}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; font-weight: 300;">
            ${isAdmin ? 'A mission-driven conversation awaits' : 'We\'re excited to learn about your mission and help amplify your impact'}
          </p>
        </div>
      </div>

      <!-- Content Section -->
      <div style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h2 style="color: #4A6741; font-size: 24px; margin: 0 0 15px; font-weight: 600;">
            ${isAdmin ? '🌟 Meaningful Conversation Ahead!' : '💫 Thank You for Trusting Us With Your Vision!'}
          </h2>
          <p style="color: #666; font-size: 16px; line-height: 1.8; margin: 0; max-width: 520px; margin: 0 auto;">
            ${isAdmin
              ? `A dedicated changemaker${name ? ' named <strong style="color: #4A6741;">' + name + '</strong>' : ''} is eager to discuss how we can help amplify their NGO's digital presence. This is more than just a consultation call – it's an opportunity to be part of something that creates real social impact. Let's make this conversation count! 🌍💚`
              : `Dear ${name ? '<strong style="color: #4A6741;">' + name + '</strong>' : 'passionate changemaker'}, your request for a consultation call fills our hearts with joy! We're not just building websites – we're crafting digital platforms that will help your NGO reach more hearts, share your powerful mission, and create ripples of positive change across the world. We can't wait to learn about your vision and discuss how we can bring it to life! ✨`
            }
          </p>
        </div>

        <!-- Inspirational Quote -->
        <div style="background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f0 100%); border-radius: 15px; padding: 25px; margin: 30px 0; border-left: 5px solid #d4af37; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; opacity: 0.1;"></div>
          <p style="color: #4A6741; font-size: 16px; font-style: italic; margin: 0; text-align: center; line-height: 1.6; position: relative; z-index: 1;">
            "${isAdmin 
              ? 'Every meaningful conversation has the power to spark extraordinary change. This call could be the beginning of a beautiful partnership!' 
              : 'The most powerful movements start with a single conversation. Your call with us is the first step towards amplifying your impact.'}"
          </p>
          <div style="text-align: center; margin-top: 10px;">
            <span style="color: #d4af37; font-size: 14px; font-weight: 600;">✨ Words of Inspiration ✨</span>
          </div>
        </div>

        <!-- Call Details Card -->
        <div style="background: white; border-radius: 15px; padding: 30px; margin: 30px 0; box-shadow: 0 8px 25px rgba(74, 103, 65, 0.08); border: 2px solid #f0f9f7; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; opacity: 0.05;"></div>
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 20px; font-weight: 600; border-bottom: 2px solid #f0f9f7; padding-bottom: 10px; position: relative; z-index: 1;">
            📞 ${isAdmin ? 'Consultation Call Information' : 'Your Scheduled Call Details'}
          </h3>
          <div style="display: grid; gap: 15px; position: relative; z-index: 1;">
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">📱 Contact Number:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 8px 18px; border-radius: 25px; font-family: monospace; border: 1px solid #d4af37;">${number}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🕐 Preferred Time:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 8px 18px; border-radius: 25px; border: 1px solid #d4af37;">${time}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🗣️ Language:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 8px 18px; border-radius: 25px; border: 1px solid #d4af37;">${language}</span>
            </div>
          </div>
        </div>

        <!-- Action Message -->
        <div style="text-align: center; margin: 35px 0; padding: 30px; background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f0 100%); border-radius: 15px; border-left: 5px solid #4A6741; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; opacity: 0.1;"></div>
          <p style="color: #4A6741; font-size: 16px; margin: 0; line-height: 1.8; font-weight: 500; position: relative; z-index: 1;">
            ${isAdmin
              ? '⚡ <strong>Mission-Critical Call Ahead:</strong> This changemaker is ready to discuss their vision and explore how we can amplify their NGO\'s digital impact. Please call within their preferred time window with our portfolio ready, pricing information prepared, and most importantly – your passion for social impact! Let\'s help them reach more hearts and create lasting change! 🌍💚'
              : '🌟 <strong>Get Ready for an Inspiring Conversation:</strong> Our consultation call will be a collaborative journey where we\'ll explore your NGO\'s unique mission, understand your current challenges, and discuss innovative digital solutions that can amplify your impact. Please have your vision, goals, and any specific requirements ready – we want to make every minute count towards building something extraordinary together! 💫'
            }
          </p>
        </div>

        <!-- Impact Statement -->
        <div style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); border-radius: 15px; padding: 25px; margin: 30px 0; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 15px; font-weight: 700; position: relative; z-index: 1;">
            💫 This Call Could Change Everything!
          </h3>
          <p style="color: #4A6741; font-size: 14px; margin: 0; line-height: 1.6; font-weight: 500; position: relative; z-index: 1;">
            ${isAdmin 
              ? 'Every call we make has the potential to create ripples of positive change. This conversation could be the catalyst that helps an NGO reach thousands more lives, amplify their mission, and create lasting social impact. Let\'s make it count! 🚀'
              : 'This call marks the beginning of your digital transformation journey. Through our conversation, we\'ll uncover opportunities to amplify your mission, reach more supporters, and create a digital presence that truly reflects the heart of your NGO. Together, we\'ll build something that inspires and drives real change! ✨'
            }
          </p>
        </div>

        <!-- Signature -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f9f7;">
          <p style="color: #4A6741; font-size: 16px; margin: 0 0 10px; font-weight: 600;">
            Looking forward to our meaningful conversation,
          </p>
          <p style="color: #666; font-size: 14px; margin: 0; font-weight: 500;">
            The Devoura Team 📞
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
          📞 Meaningful Consultations | 💼 Trusted Digital Partner | 🌍 NGO-Focused Solutions | 💚 Dedicated to Your Success
        </p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(74, 103, 65, 0.2); position: relative; z-index: 1;">
          <p style="color: #4A6741; margin: 0; font-size: 11px; opacity: 0.7;">
            This email was sent with care and the highest security standards. Need to reschedule? Simply reply – we're here to accommodate your mission! 💌
          </p>
        </div>
      </div>
    </div>
  `;
}

// Call request endpoint
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { number, time, language, name, email } = req.body;

    // Validate required fields
    if (!number || !time || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Save to Firestore
    const callRequestsRef = collection(db, 'request-call');
    const docRef = await addDoc(callRequestsRef, {
      number,
      time,
      language,
      name: name || '',
      email: email || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    // Send email to admin
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New Call Request',
      html: callRequestEmail({ number, time, language, name }, true),
    });

    // Send confirmation email to user if email is provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'Your Consultation Call is Confirmed!',
        html: callRequestEmail({ number, time, language, name }),
      });
    }

    res.status(200).json({ 
      message: 'Request saved and emails sent successfully',
      requestId: docRef.id 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
} 