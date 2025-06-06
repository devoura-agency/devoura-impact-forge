import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { collection, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

dotenv.config();

const resend = new Resend('re_VBs5CUoX_PfsWFD7bacaPhYVaoLoaLxu6');
const DAILY_EMAIL_LIMIT = 100;

// Add website URL constant
const WEBSITE_URL = 'https://devoura.vercel.app';

// Function to check daily email count
const checkDailyEmailCount = async () => {
  const today = new Date().toISOString().split('T')[0];
  const counterRef = doc(db, 'emailCounters', today);
  const counterDoc = await getDoc(counterRef);
  
  if (!counterDoc.exists()) {
    // Initialize counter for today
    await setDoc(counterRef, { count: 0 });
    return 0;
  }
  
  return counterDoc.data().count;
};

// Function to increment daily email count
const incrementDailyEmailCount = async () => {
  const today = new Date().toISOString().split('T')[0];
  const counterRef = doc(db, 'emailCounters', today);
  await setDoc(counterRef, { count: increment(1) }, { merge: true });
};

// Function to check if pitch deck exists
const getPitchDeckAttachment = () => {
  try {
    const pitchDeckPath = path.join(process.cwd(), 'public', 'pitch-deck.pdf');
    if (fs.existsSync(pitchDeckPath)) {
      return [{
        filename: 'Devoura-Pitch-Deck.pdf',
        path: pitchDeckPath,
        contentType: 'application/pdf'
      }];
    }
    console.warn('Pitch deck PDF not found at:', pitchDeckPath);
    return [];
  } catch (error) {
    console.error('Error checking pitch deck:', error);
    return [];
  }
};

// Function to get HTML template based on NGO type
const getEmailTemplate = async (name, ngoType) => {
  try {
    // Map ngoType to template filename
    const templateMap = {
      'education': 'education-template.html',
      'women-empowerment': 'women-empowerment-template.html',
      'wildlife': 'wildlife-template.html',
      'community-service': 'community-service-template.html',
      'health-and-wellness': 'health-wellness-template.html',
      'disaster-management': 'disaster-management-template.html',
      'other': 'general-template.html'
    };

    const templateFile = templateMap[ngoType] || 'general-template.html';
    const templatePath = path.join(process.cwd(), 'public', 'email-templates', templateFile);
    
    if (!fs.existsSync(templatePath)) {
      console.warn(`Template not found: ${templatePath}`);
      return null;
    }

    let template = await fs.promises.readFile(templatePath, 'utf8');
    
    // Replace placeholders in the template
    template = template.replace(/{{name}}/g, name);
    template = template.replace(/{{website_url}}/g, WEBSITE_URL);
    
    return template;
  } catch (error) {
    console.error('Error reading email template:', error);
    return null;
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check daily email limit
    const currentCount = await checkDailyEmailCount();
    if (currentCount >= DAILY_EMAIL_LIMIT) {
      return res.status(429).json({ 
        error: 'Daily email limit reached',
        details: `You have reached the daily limit of ${DAILY_EMAIL_LIMIT} emails. Please try again tomorrow.`
      });
    }

    const { name, email, ngoType, subject } = req.body;

    // Validate input
    if (!name || !email || !ngoType) {
      console.error('Missing required fields:', { name, email, ngoType });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get HTML template
    const htmlContent = await getEmailTemplate(name, ngoType);
    if (!htmlContent) {
      console.error('Failed to load email template for ngoType:', ngoType);
      return res.status(500).json({ error: 'Failed to load email template' });
    }

    // Get attachments if pitch deck exists
    const attachments = getPitchDeckAttachment();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Devoura <onboarding@resend.dev>',
      to: email,
      subject: subject || 'Devoura NGO Collaboration',
      html: htmlContent,
      attachments: attachments.map(att => ({
        filename: att.filename,
        content: fs.readFileSync(att.path)
      }))
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: error.message
      });
    }

    // Increment daily email count
    await incrementDailyEmailCount();

    // Get updated count
    const newCount = await checkDailyEmailCount();

    res.status(200).json({ 
      message: 'Email sent successfully',
      attachmentsIncluded: attachments.length > 0,
      id: data.id,
      dailyCount: newCount,
      remainingEmails: DAILY_EMAIL_LIMIT - newCount
    });
  } catch (error) {
    console.error('Bulk email error:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message
    });
  }
}
