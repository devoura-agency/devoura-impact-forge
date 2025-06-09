import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const transporter = createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'info.devoura@gmail.com',
        pass: 'I1GMR37nyC2qjJYs',
      }
    });

    // Test email
    const testMailOptions = {
      from: 'info.devoura@gmail.com',
      to: 'info.devoura@gmail.com', // Send to yourself for testing
      subject: 'Test Email from Devoura',
      text: 'This is a test email to verify SMTP connection.',
      html: '<p>This is a test email to verify SMTP connection.</p>'
    };

    const info = await transporter.sendMail(testMailOptions);
    console.log('Test email sent:', info);

    res.status(200).json({ 
      message: 'Test email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      error: 'Failed to send test email', 
      details: error.message
    });
  }
} 