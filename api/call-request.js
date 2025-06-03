import express from 'express';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Call request endpoint
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { number, time, language, name, email } = req.body;
    
    // Send email to admin
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New Call Request',
      html: `
        <h1>New Call Request</h1>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Language:</strong> ${language}</p>
      `,
    });

    // Send confirmation email to user if email is provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'Your Consultation Call is Confirmed!',
        html: `
          <h1>Your Consultation Call is Confirmed!</h1>
          <p>Dear ${name || 'Valued Client'},</p>
          <p>We have received your call request and will contact you at your preferred time.</p>
          <p><strong>Call Details:</strong></p>
          <p>Phone: ${number}</p>
          <p>Time: ${time}</p>
          <p>Language: ${language}</p>
          <p>We look forward to speaking with you!</p>
        `,
      });
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
} 