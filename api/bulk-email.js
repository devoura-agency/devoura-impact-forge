
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('Missing email credentials in environment variables');
}

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Function to check if pitch deck exists
const getPitchDeckAttachment = () => {
  try {
    const pitchDeckPath = path.join(process.cwd(), 'public', 'pitch-deck.pdf');
    if (fs.existsSync(pitchDeckPath)) {
      console.log('Pitch deck found at:', pitchDeckPath);
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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, ngoType, subject, text, html } = req.body;

    // Validate required fields
    if (!name || !email || !ngoType) {
      console.error('Missing required fields:', { name: !!name, email: !!email, ngoType: !!ngoType });
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'ngoType'],
        received: { name: !!name, email: !!email, ngoType: !!ngoType }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log(`Preparing to send email to: ${email} (${name}) - NGO Type: ${ngoType}`);

    // Get attachments if pitch deck exists
    const attachments = getPitchDeckAttachment();

    const mailOptions = {
      from: `"Devoura Team" <${EMAIL_USER}>`,
      to: email,
      subject: subject || '🚀 Transform Your NGO\'s Digital Impact - Devoura Partnership',
      attachments
    };

    // Use HTML if provided, otherwise fall back to text
    if (html) {
      mailOptions.html = html;
      console.log('Sending HTML email');
    } else if (text) {
      mailOptions.text = text;
      console.log('Sending text email');
    } else {
      mailOptions.text = 'Professional NGO website solutions from Devoura';
      console.log('Sending default text email');
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ 
      message: 'Email sent successfully',
      messageId: info.messageId,
      attachmentsIncluded: attachments.length > 0,
      format: html ? 'HTML' : 'Text',
      recipient: email,
      ngoType
    });
  } catch (error) {
    console.error('Bulk email error:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
