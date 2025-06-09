import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Create Brevo SMTP transport
const createBrevoTransport = () => {
  return createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: 'info.devoura@gmail.com',
      pass: 'I1GMR37nyC2qjJYs',
    }
  });
};

// Add website URL constant
const WEBSITE_URL = 'https://devoura.vercel.app';

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
    template = template.replace(/{{name}}/g, name);
    template = template.replace(/{{website_url}}/g, WEBSITE_URL);
    
    return template;
  } catch (error) {
    console.error('Error reading email template:', error);
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, ngoType, subject, senderEmail } = req.body;

    if (!name || !email || !ngoType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get HTML template
    const htmlContent = await getEmailTemplate(name, ngoType);
    if (!htmlContent) {
      return res.status(500).json({ error: 'Failed to load email template' });
    }

    // Get attachments
    const attachments = getPitchDeckAttachment();

    // Create transport
    const transporter = createBrevoTransport();

    // Prepare email
    const mailOptions = {
      from: senderEmail || 'info.devoura@gmail.com',
      to: email,
      subject: subject || 'Devoura NGO Collaboration',
      html: htmlContent,
      attachments
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    res.status(200).json({ 
      message: 'Email sent successfully',
      messageId: info.messageId,
      attachmentsIncluded: attachments.length > 0
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message
    });
  }
}
