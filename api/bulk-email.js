import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

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
    console.log('Received request body:', req.body);
    const { name, email, ngoType, subject, senderEmail } = req.body;

    if (!name || !email || !ngoType) {
      console.error('Missing required fields:', { name, email, ngoType });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get HTML template
    const htmlContent = await getEmailTemplate(name, ngoType);
    if (!htmlContent) {
      console.error('Failed to load email template for ngoType:', ngoType);
      return res.status(500).json({ error: 'Failed to load email template' });
    }

    // Get attachments
    const attachments = getPitchDeckAttachment();

    // Prepare email data for Brevo API
    const emailData = {
      sender: {
        name: 'Devoura',
        email: senderEmail || 'info.devoura@gmail.com'
      },
      to: [{
        email: email,
        name: name
      }],
      subject: subject || 'Devoura NGO Collaboration',
      htmlContent: htmlContent,
      headers: {
        'charset': 'utf-8'
      }
    };

    console.log('Sending email with data:', {
      to: emailData.to,
      subject: emailData.subject,
      sender: emailData.sender
    });

    // Send email using Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': 'I1GMR37nyC2qjJYs'
      },
      body: JSON.stringify(emailData)
    });

    const responseData = await response.json();
    console.log('Brevo API response:', responseData);

    if (!response.ok) {
      console.error('Brevo API error:', responseData);
      throw new Error(responseData.message || 'Failed to send email');
    }

    res.status(200).json({ 
      message: 'Email sent successfully',
      messageId: responseData.messageId,
      attachmentsIncluded: attachments.length > 0
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
