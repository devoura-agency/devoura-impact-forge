import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Enhanced HTML email template with better design and brand colors
function websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, isAdmin = false) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 50%, #d4af37 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"pattern\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23pattern)\"/></svg>'); opacity: 0.3;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: #4A6741; font-size: 20px; font-weight: bold;">D</span>
            </div>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${isAdmin ? 'New Website Inquiry' : `Welcome to Devoura, ${name}!`}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; font-weight: 300;">
            ${isAdmin ? 'A new lead awaits your attention' : 'Your digital transformation journey begins now'}
          </p>
        </div>
      </div>

      <!-- Content Section -->
      <div style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h2 style="color: #4A6741; font-size: 24px; margin: 0 0 15px; font-weight: 600;">
            ${isAdmin ? '🚀 New Opportunity Incoming!' : '🎉 Thank You for Choosing Us!'}
          </h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0; max-width: 500px; margin: 0 auto;">
            ${isAdmin 
              ? `A potential client <strong style="color: #4A6741;">${name}</strong> from <strong style="color: #4A6741;">${org}</strong> is interested in our services. Here are the complete details:`
              : `We're thrilled to help <strong style="color: #4A6741;">${org}</strong> create a powerful digital presence. Our team has received your request and will reach out within 24 hours with a personalized proposal.`
            }
          </p>
        </div>

        <!-- Details Card -->
        <div style="background: white; border-radius: 15px; padding: 30px; margin: 30px 0; box-shadow: 0 8px 25px rgba(74, 103, 65, 0.08); border: 2px solid #f0f9f7;">
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 20px; font-weight: 600; border-bottom: 2px solid #f0f9f7; padding-bottom: 10px;">
            📋 Project Details
          </h3>
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🎨 Template:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 4px 12px; border-radius: 20px;">${template}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🎯 Design Style:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 4px 12px; border-radius: 20px;">${design}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">📦 Package:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 4px 12px; border-radius: 20px;">${pkg}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🔧 Maintenance:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 4px 12px; border-radius: 20px;">${maintenance}</span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 100%); border-radius: 15px; padding: 25px; margin: 30px 0; color: white;">
          <h3 style="color: white; font-size: 18px; margin: 0 0 20px; font-weight: 600;">
            👤 Contact Information
          </h3>
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Name:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 15px; border-radius: 25px; backdrop-filter: blur(10px);">${name}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Email:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 15px; border-radius: 25px; backdrop-filter: blur(10px);">${email}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Mobile:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 15px; border-radius: 25px; backdrop-filter: blur(10px);">${mobile}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-weight: 600; width: 100px; opacity: 0.9;">Organization:</span>
              <span style="background: rgba(255,255,255,0.1); padding: 6px 15px; border-radius: 25px; backdrop-filter: blur(10px);">${org}</span>
            </div>
          </div>
        </div>

        <!-- Action Message -->
        <div style="text-align: center; margin: 35px 0; padding: 25px; background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f0 100%); border-radius: 15px; border-left: 5px solid #4A6741;">
          <p style="color: #4A6741; font-size: 16px; margin: 0; line-height: 1.6; font-weight: 500;">
            ${isAdmin
              ? '⚡ <strong>Action Required:</strong> Please follow up with this qualified lead within 2 hours for optimal conversion. This inquiry shows genuine interest in our premium services.'
              : '🌟 <strong>What\'s Next?</strong> Our expert team will analyze your requirements and prepare a customized proposal. Expect a detailed consultation call within 24 hours to discuss your vision and next steps.'
            }
          </p>
        </div>

        <!-- Signature -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f9f7;">
          <p style="color: #4A6741; font-size: 16px; margin: 0 0 10px; font-weight: 600;">
            With dedication & expertise,
          </p>
          <p style="color: #666; font-size: 14px; margin: 0; font-weight: 500;">
            The Devoura Team 🚀
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0; font-style: italic;">
            Empowering NGOs through Digital Excellence
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); padding: 25px 30px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
          <div style="width: 35px; height: 35px; background: rgba(74, 103, 65, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: #4A6741; font-size: 16px; font-weight: bold;">D</span>
          </div>
          <span style="color: #4A6741; font-size: 18px; font-weight: 700;">Devoura</span>
        </div>
        <p style="color: #4A6741; margin: 0; font-size: 13px; font-weight: 500; opacity: 0.8;">
          🌐 Building Digital Bridges for Social Impact | 💚 Trusted by 500+ NGOs Worldwide
        </p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(74, 103, 65, 0.2);">
          <p style="color: #4A6741; margin: 0; font-size: 11px; opacity: 0.7;">
            This email was sent with care from our secure servers. If you have any questions, simply reply to this email.
          </p>
        </div>
      </div>
    </div>
  `;
}

function callRequestEmail({ number, time, language, name }, isAdmin = false) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #4A6741 0%, #5d7c53 50%, #d4af37 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"pattern\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23pattern)\"/></svg>'); opacity: 0.3;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: #4A6741; font-size: 20px;">📞</span>
            </div>
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ${isAdmin ? 'New Call Request' : 'Call Request Confirmed!'}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; font-weight: 300;">
            ${isAdmin ? 'A consultation call has been requested' : 'We\'ll call you at your preferred time'}
          </p>
        </div>
      </div>

      <!-- Content Section -->
      <div style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h2 style="color: #4A6741; font-size: 24px; margin: 0 0 15px; font-weight: 600;">
            ${isAdmin ? '📱 Consultation Call Request' : '✅ Your Call is Scheduled!'}
          </h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0; max-width: 500px; margin: 0 auto;">
            ${isAdmin
              ? `A new consultation call has been requested${name ? ' by <strong style="color: #4A6741;">' + name + '</strong>' : ''}. Please prioritize this follow-up for maximum impact.`
              : 'Thank you for requesting a consultation call! Our expert team will contact you at your preferred time to discuss how we can help your NGO create a powerful digital presence.'
            }
          </p>
        </div>

        <!-- Call Details Card -->
        <div style="background: white; border-radius: 15px; padding: 30px; margin: 30px 0; box-shadow: 0 8px 25px rgba(74, 103, 65, 0.08); border: 2px solid #f0f9f7;">
          <h3 style="color: #4A6741; font-size: 18px; margin: 0 0 20px; font-weight: 600; border-bottom: 2px solid #f0f9f7; padding-bottom: 10px;">
            📞 Call Details
          </h3>
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">📱 Phone Number:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 6px 15px; border-radius: 25px; font-family: monospace;">${number}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f5f5f5;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🕐 Preferred Time:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 6px 15px; border-radius: 25px;">${time}</span>
            </div>
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <span style="color: #4A6741; font-weight: 600; width: 140px; font-size: 14px;">🗣️ Language:</span>
              <span style="color: #333; font-size: 14px; background: #f0f9f7; padding: 6px 15px; border-radius: 25px;">${language}</span>
            </div>
          </div>
        </div>

        <!-- Action Message -->
        <div style="text-align: center; margin: 35px 0; padding: 25px; background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f0 100%); border-radius: 15px; border-left: 5px solid #4A6741;">
          <p style="color: #4A6741; font-size: 16px; margin: 0; line-height: 1.6; font-weight: 500;">
            ${isAdmin
              ? '⚡ <strong>Priority Action:</strong> Please call this prospect within their preferred time window. Prepare our portfolio and pricing information for a productive conversation.'
              : '🌟 <strong>What to Expect:</strong> Our consultation call will cover your NGO\'s goals, current challenges, and how our digital solutions can amplify your impact. Please have your requirements ready for a productive discussion.'
            }
          </p>
        </div>

        <!-- Signature -->
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f9f7;">
          <p style="color: #4A6741; font-size: 16px; margin: 0 0 10px; font-weight: 600;">
            Looking forward to our conversation,
          </p>
          <p style="color: #666; font-size: 14px; margin: 0; font-weight: 500;">
            The Devoura Team 📞
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0; font-style: italic;">
            Your Digital Transformation Partners
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); padding: 25px 30px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
          <div style="width: 35px; height: 35px; background: rgba(74, 103, 65, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: #4A6741; font-size: 16px; font-weight: bold;">D</span>
          </div>
          <span style="color: #4A6741; font-size: 18px; font-weight: 700;">Devoura</span>
        </div>
        <p style="color: #4A6741; margin: 0; font-size: 13px; font-weight: 500; opacity: 0.8;">
          📞 Professional Consultations | 💼 Trusted Digital Partner | 🌍 Global NGO Network
        </p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(74, 103, 65, 0.2);">
          <p style="color: #4A6741; margin: 0; font-size: 11px; opacity: 0.7;">
            This email was sent securely. If you need to reschedule, simply reply to this email.
          </p>
        </div>
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
