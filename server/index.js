import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Helper: HTML email template
function websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, isAdmin = false) {
  return `
    <div style="font-family: Poppins, Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; background:#f9fafb;">
      <div style="background:linear-gradient(90deg,#1a7f5a 60%,#f7c873 100%); padding:28px 24px 18px 24px; text-align:center;">
        <img src="https://devoura.vercel.app/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" alt="Devoura Logo" style="height:60px; margin-bottom:12px;" />
        <h2 style="color:#fff; margin:0; font-size:2rem;">${isAdmin ? 'New Website Inquiry Received' : 'Thank you for reaching out, ' + name + '!'}</h2>
      </div>
      <div style="padding:28px 24px 18px 24px; background:#fff;">
        <p style="font-size:17px; color:#1a7f5a; margin-bottom:12px;">
          ${
            isAdmin
              ? `A new website inquiry was submitted by <b>${name}</b>. Here are the details:`
              : `We're excited to help your NGO shine online! Here's a summary of your submission. Our team will reach out soon with next steps.`
          }
        </p>
        <ul style="font-size:15px; color:#333; line-height:1.7; background:#f9fafb; border-radius:8px; padding:18px 20px; border:1px solid #e5e7eb;">
          <li><b>Template:</b> ${template}</li>
          <li><b>Design:</b> ${design}</li>
          <li><b>Package:</b> ${pkg}</li>
          <li><b>Maintenance:</b> ${maintenance}</li>
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Mobile:</b> ${mobile}</li>
          <li><b>Organization:</b> ${org}</li>
        </ul>
        <p style="font-size:15px; color:#222; margin-top:18px;">
          ${
            isAdmin
              ? 'Please follow up with this lead promptly and with care.'
              : "If you have any questions or want to share more about your mission, just reply to this email. We're here to help!"
          }
        </p>
        <p style="font-size:15px; color:#1a7f5a; margin-top:18px;">
          With kindness,<br/>
          The Devoura Team
        </p>
      </div>
      <div style="background:#f7c873; text-align:center; padding:16px; color:#1a7f5a; font-size:13px;">
        <span>Devoura | Empowering NGOs Online</span>
      </div>
    </div>
  `;
}function callRequestEmail({ number, time, language, name }, isAdmin = false) {
  return `
    <div style="font-family: Poppins, Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; background:#f9fafb;">
      <div style="background:linear-gradient(90deg,#1a7f5a 60%,#f7c873 100%); padding:28px 24px 18px 24px; text-align:center;">
        <img src="https://devoura.vercel.app/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" alt="Devoura Logo" style="height:60px; margin-bottom:12px;" />
        <h2 style="color:#fff; margin:0; font-size:2rem;">${isAdmin ? 'New Call Request Received' : 'Thank you for requesting a call!'}</h2>
      </div>
      <div style="padding:28px 24px 18px 24px; background:#fff;">
        <p style="font-size:17px; color:#1a7f5a; margin-bottom:12px;">
          ${isAdmin
            ? `A new call request was submitted${name ? ' by <b>' + name + '</b>' : ''}. Here are the details:`
            : `We appreciate your interest in connecting with us. Here's a summary of your request. Our team will call you at your preferred time.`}
        </p>
        <ul style="font-size:15px; color:#333; line-height:1.7; background:#f9fafb; border-radius:8px; padding:18px 20px; border:1px solid #e5e7eb;">
          <li><b>Phone Number:</b> ${number}</li>
          <li><b>Preferred Time:</b> ${time}</li>
          <li><b>Language:</b> ${language}</li>
        </ul>
        <p style="font-size:15px; color:#222; margin-top:18px;">
          ${isAdmin
            ? 'Please follow up with this call request promptly and with care.'
            : 'If you need to update your request, just reply to this email. We look forward to speaking with you!'}
        </p>
        <p style="font-size:15px; color:#1a7f5a; margin-top:18px;">
          With kindness,<br/>
          The Devoura Team
        </p>
      </div>
      <div style="background:#f7c873; text-align:center; padding:16px; color:#1a7f5a; font-size:13px;">
        <span>Devoura | Empowering NGOs Online</span>
      </div>
    </div>
  `;
}

// Wizard form submission endpoint
app.post('/api/wizard', async (req, res) => {
  const { name, email, org, mobile, template, design, package: pkg, maintenance } = req.body;
  try {
    // Email to owner (admin)
    await transporter.sendMail({
      from: EMAIL_USER,
      to: 'devoura.agency@gmail.com',
      subject: `New Website Inquiry from ${name}`,
      html: websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, true),
    });
    // Email to user
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: `Thank you, ${name}! We have received your website inquiry`,
      html: websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, false),
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Request a Call endpoint
app.post('/api/request-call', async (req, res) => {
  const { number, time, language, name = '', email = '' } = req.body;
  try {
    // Email to owner (admin)
    await transporter.sendMail({
      from: EMAIL_USER,
      to: 'devoura.agency@gmail.com',
      subject: `New Call Request${name ? ' from ' + name : ''}`,
      html: callRequestEmail({ number, time, language, name }, true),
    });
    // Email to user (if email provided)
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: `Thank you${name ? ', ' + name : ''}! We have received your call request`,
        html: callRequestEmail({ number, time, language, name }, false),
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 