import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Simple HTML template for bulk email
function bulkEmailTemplate({ ngoName, category, location }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4A6741;">Hello ${ngoName},</h2>
      <p>
        We are excited to connect with you regarding our latest initiatives for NGOs.<br>
        <strong>Category:</strong> ${category || 'N/A'}<br>
        <strong>Location:</strong> ${location || 'N/A'}<br>
      </p>
      <p>We have some exciting opportunities and resources tailored for NGOs like yours. Please let us know if you have any questions or would like to collaborate!</p>
      <p>Best regards,<br>Devoura Team</p>
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
    const { to, ngoName, category, location, subject, text } = req.body;

    if (!to || !ngoName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject: subject || 'Devoura NGO Collaboration',
      html: bulkEmailTemplate({ ngoName, category, location }),
      text: text || undefined,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Bulk email error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}