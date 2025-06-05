
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, ngoType, subject, text, html } = req.body;

    if (!name || !email || !ngoType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get attachments if pitch deck exists
    const attachments = getPitchDeckAttachment();

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: subject || '🚀 Transform Your NGO\'s Digital Impact - Devoura Partnership',
      attachments
    };

    // Use HTML if provided, otherwise fall back to text
    if (html) {
      mailOptions.html = html;
    } else {
      mailOptions.text = text || 'Professional NGO website solutions from Devoura';
    }

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Email sent successfully',
      attachmentsIncluded: attachments.length > 0,
      format: html ? 'HTML' : 'Text'
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
