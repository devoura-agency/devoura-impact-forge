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

function websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, isAdmin = false) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 50%, #d4af37 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: #4A6741; font-size: 20px; font-weight: bold;">D</span>
            </div>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${isAdmin ? 'New Website Inquiry' : `Welcome to the Devoura Family, ${name}!`}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; font-weight: 300;">
            ${isAdmin ? 'A passionate NGO leader is ready to amplify their impact' : 'Your journey to digital excellence starts here'}
          </p>
        </div>
      </div>

      <!-- Content Section -->
      <div style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h2 style="color: #4A6741; font-size: 24px; margin: 0 0 15px; font-weight: 600;">
            ${isAdmin ? '🌟 A New Partnership Awaits!' : '🎉 Welcome to Our Mission-Driven Community!'}
          </h2>
          <p style="color: #666; font-size: 16px; line-height: 1.8; margin: 0; max-width: 520px; margin: 0 auto;">
            ${isAdmin 
              ? `<strong style="color: #4A6741;">${name}</strong> from <strong style="color: #4A6741;">${org}</strong> has taken the first step towards digital transformation. They're ready to amplify their social impact and reach more hearts worldwide. This is exactly the kind of partnership that makes our work meaningful! 💚`
              : `Dear <strong style="color: #4A6741;">${name}</strong>, your decision to enhance <strong style="color: #4A6741;">${org}</strong>'s digital presence fills us with immense joy! You're not just creating a website – you're building bridges to connect with more lives, share your powerful story, and amplify your impact in ways that will touch countless hearts. We're honored to be part of your mission! 🌟`
            }
          </p>
        </div>

        <!-- Inspirational Quote -->
        <div style="background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f0 100%); border-radius: 15px; padding: 25px; margin: 30px 0; border-left: 5px solid #d4af37; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; opacity: 0.1;"></div>
          <p style="color: #4A6741; font-size: 16px; font-style: italic; margin: 0; text-align: center; line-height: 1.6; position: relative; z-index: 1;">
            "${isAdmin 
              ? 'Every great digital transformation begins with a single inquiry. This could be the start of something extraordinary!' 
              : 'The best way to find yourself is to lose yourself in the service of others. Your digital presence will help you serve even more hearts.'}"
          </p>
          <div style="text-align: center; margin-top: 10px;">
            <span style="color: #d4af37; font-size: 14px; font-weight: 600;">✨ Devoura Philosophy ✨</span>
          </div>
        </div>

        <!-- Details Card -->
        <div style="background: white; border-radius: 15px; padding: 30px; margin: 30px 0; box-shadow: 0 8px 25px rgba(74, 103, 65, 0.08); border: 2px solid #f0f9f7; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; opacity: 0.05;"></div>
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 20px; font-weight: 600; border-bottom: 2px solid #f0f9f7; padding-bottom: 10px; position: relative; z-index: 1;">
            📋 ${isAdmin ? 'Partnership Details' : 'Your Digital Vision Summary'}
          </h3>
          <div style="display: grid; gap: 15px; position: relative; z-index: 1;">
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🎨 Template Choice:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 6px 15px; border-radius: 20px; border: 1px solid #d4af37;">${template}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🎯 Design Vision:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 6px 15px; border-radius: 20px; border: 1px solid #d4af37;">${design}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">📦 Package Selected:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 6px 15px; border-radius: 20px; border: 1px solid #d4af37;">${pkg}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🔧 Maintenance Plan:</span>
              <span style="color: #333; font-size: 14px; background: linear-gradient(135deg, #f0f9f7, #e8f5f0); padding: 6px 15px; border-radius: 20px; border: 1px solid #d4af37;">${maintenance}</span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 100%); border-radius: 15px; padding: 25px; margin: 30px 0; color: white; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
          <h3 style="color: white; font-size: 18px; margin: 0 0 20px; font-weight: 600; position: relative; z-index: 1;">
            👤 ${isAdmin ? 'NGO Leader Contact Details' : 'Your Contact Information'}
          </h3>
          <div style="display: grid; gap: 12px; position: relative; z-index: 1;">
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Name:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 25px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">${name}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Email:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 25px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">${email}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Mobile:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 25px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">${mobile}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">NGO:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 25px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">${org}</span>
            </div>
          </div>
        </div>

        <!-- Action Message -->
        <div style="text-align: center; margin: 35px 0; padding: 30px; background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f0 100%); border-radius: 15px; border-left: 5px solid #4A6741; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; opacity: 0.1;"></div>
          <p style="color: #4A6741; font-size: 16px; margin: 0; line-height: 1.8; font-weight: 500; position: relative; z-index: 1;">
            ${isAdmin
              ? '⚡ <strong>High-Priority Partnership Opportunity:</strong> This dedicated NGO leader is ready to transform their digital presence and amplify their social impact. Please reach out within 2 hours with our personalized approach and portfolio. Let\'s help them touch more lives and create lasting change! 🌍💚'
              : '🌟 <strong>Your Digital Transformation Journey Begins Now:</strong> Our passionate team of digital craftsmen will meticulously analyze your NGO\'s unique mission and create a personalized proposal that reflects your values and amplifies your impact. Expect our expert consultation call within 24 hours, where we\'ll discuss how to bring your vision to life and help you reach more hearts worldwide! 💫'
            }
          </p>
        </div>

        <!-- Impact Statement -->
        <div style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); border-radius: 15px; padding: 25px; margin: 30px 0; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1;"></div>
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 15px; font-weight: 700; position: relative; z-index: 1;">
            🌍 Together, We're Creating Ripples of Change!
          </h3>
          <p style="color: #4A6741; font-size: 14px; margin: 0; line-height: 1.6; font-weight: 500; position: relative; z-index: 1;">
            ${isAdmin 
              ? 'With each NGO we partner with, we\'re not just building websites – we\'re amplifying voices of change, connecting hearts across the globe, and empowering organizations to create lasting social impact. This inquiry represents another opportunity to make the world a better place! 🚀'
              : 'You\'ve just taken the first step in joining a community of changemakers who are committed to making a difference. Together, we\'ll build a digital platform that amplifies your mission, connects you with supporters, and helps you create the positive impact your community needs. Your story will inspire and create meaningful change! ✨'
            }
          </p>
        </div>

        <!-- Signature -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f9f7;">
          <p style="color: #4A6741; font-size: 16px; margin: 0 0 10px; font-weight: 600;">
            With unwavering dedication to your mission,
          </p>
          <p style="color: #666; font-size: 14px; margin: 0; font-weight: 500;">
            The Devoura Team 🚀
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0; font-style: italic;">
            Empowering NGOs to Create Digital Ripples of Change 🌊
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
          🌐 Crafting Digital Stories That Matter | 💚 Dedicated to NGO Success | 🌟 Building Platforms for Positive Impact
        </p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(74, 103, 65, 0.2); position: relative; z-index: 1;">
          <p style="color: #4A6741; margin: 0; font-size: 11px; opacity: 0.7;">
            This email was crafted with love and sent with the highest security standards. Your mission matters to us – simply reply if you need anything! 💌
          </p>
        </div>
      </div>
    </div>
  `;
}

// Contact form endpoint
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
    const { name, email, org, mobile, template, design, pkg, maintenance } = req.body;

    // Validate required fields
    if (!name || !email || !org || !mobile || !template || !design || !pkg || !maintenance) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Save to Firestore
    const wizardSubmissionsRef = collection(db, 'wizard-submissions');
    const docRef = await addDoc(wizardSubmissionsRef, {
      name,
      email,
      org,
      mobile,
      template,
      design,
      pkg,
      maintenance,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    // Send email to admin
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New Website Inquiry',
      html: websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, true),
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: 'Welcome to Devoura - Your Digital Journey Begins!',
      html: websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }),
    });

    res.status(200).json({ 
      message: 'Submission saved and emails sent successfully',
      submissionId: docRef.id 
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ 
      error: 'Failed to process submission',
      details: error.message 
    });
  }
} 