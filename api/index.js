import express from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Import email templates
import { websiteInquiryEmail, callRequestEmail } from '../server/email-templates.js';

// Contact form endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, org, mobile, template, design, pkg, maintenance } = req.body;
    
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

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

// Call request endpoint
app.post('/call-request', async (req, res) => {
  try {
    const { number, time, language, name, email } = req.body;
    
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

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

// Export the Express API
export default app; 