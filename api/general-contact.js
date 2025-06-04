import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

function generalContactEmail({ name, email, organization, message }) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #f8fffe; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      <div style="background: linear-gradient(135deg, #4A6741 0%, #d4af37 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">New General Contact Submission</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #4A6741; font-size: 22px; margin-bottom: 10px;">Contact Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <h3 style="color: #4A6741; font-size: 18px; margin-top: 20px;">Message</h3>
        <p style="background: #f0f9f7; border-radius: 10px; padding: 15px;">${message}</p>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, organization, message } = req.body;
    if (!name || !email || !organization || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to Firestore
    const contactsRef = collection(db, 'general-contacts');
    const docRef = await addDoc(contactsRef, {
      name,
      email,
      organization,
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });

    // Send email to admin
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New General Contact Submission',
      html: generalContactEmail({ name, email, organization, message }),
    });

    res.status(200).json({ 
      message: 'Emails sent successfully',
      contactId: docRef.id 
    });
  } catch (error) {
    console.error('Error processing general contact:', error);
    res.status(500).json({ 
      error: 'Failed to process general contact',
      details: error.message 
    });
  }
} 