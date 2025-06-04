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

// Add website URL constant
const WEBSITE_URL = 'https://devoura.vercel.app';

// Email template logic based on ngoType
function getEmailTemplate(name, ngoType) {
  const templates = {
    'education': `
Dear ${name},

We are excited to connect with you regarding our specialized services for educational NGOs. Our team has extensive experience in creating impactful digital solutions for educational institutions and organizations.

We offer:
- Custom website development for educational NGOs
- Student engagement platforms
- Educational resource management systems
- Donation and fundraising tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with educational NGOs.

Would you be interested in learning more about how we can help your educational NGO make a greater impact?

Best regards,
Devoura Team
`,
    'women-empowerment': `
Dear ${name},

We are reaching out because we specialize in supporting women empowerment NGOs with digital solutions that amplify their impact.

Our services include:
- Custom websites showcasing your empowerment programs
- Community engagement platforms
- Resource sharing systems
- Donation and volunteer management tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with women empowerment NGOs.

Let's discuss how we can help your organization reach more women and create lasting change.

Best regards,
Devoura Team
`,
    'wildlife': `
Dear ${name},

We are passionate about supporting wildlife conservation efforts through technology. Our team has experience working with wildlife NGOs to create impactful digital solutions.

We offer:
- Custom websites for wildlife conservation
- Wildlife tracking and monitoring systems
- Conservation awareness platforms
- Donation and volunteer management tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with wildlife conservation NGOs.

Would you like to explore how we can help your wildlife conservation efforts?

Best regards,
Devoura Team
`,
    'community-service': `
Dear ${name},

We understand the unique challenges faced by community service organizations. Our digital solutions are designed to help you serve your community more effectively.

Our services include:
- Custom websites for community outreach
- Volunteer management systems
- Resource coordination platforms
- Community engagement tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with community service organizations.

Let's discuss how we can support your community service initiatives.

Best regards,
Devoura Team
`,
    'health-and-wellness': `
Dear ${name},

We specialize in creating digital solutions for health and wellness NGOs. Our platforms are designed to help you reach and serve more people effectively.

We offer:
- Custom health-focused websites
- Patient/beneficiary management systems
- Health education platforms
- Donation and resource management tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with health and wellness NGOs.

Would you like to learn more about how we can support your health and wellness initiatives?

Best regards,
Devoura Team
`,
    'disaster-management': `
Dear ${name},

We understand the critical role of technology in disaster management and relief efforts. Our solutions are designed to help you respond quickly and effectively.

Our services include:
- Emergency response websites
- Resource coordination systems
- Volunteer management platforms
- Donation and aid distribution tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with disaster management organizations.

Let's discuss how we can help your disaster management organization be more effective.

Best regards,
Devoura Team
`,
    'other': `
Dear ${name},

We are reaching out because we specialize in creating digital solutions for NGOs across various sectors. Our team has extensive experience in helping organizations like yours make a greater impact.

We offer:
- Custom website development
- Digital engagement platforms
- Resource management systems
- Donation and volunteer tools

I've attached our pitch deck which provides more details about our services and approach. You can also visit our website at ${WEBSITE_URL} to learn more about our work with NGOs.

Would you be interested in learning more about how we can support your organization's mission?

Best regards,
Devoura Team
`
  };
  return templates[ngoType] || templates.other;
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
    const { name, email, ngoType, subject, text } = req.body;

    if (!name || !email || !ngoType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add attachments to the email
    const attachments = [{
      filename: 'Devoura-Pitch-Deck.pdf',
      path: './public/pitch-deck.pdf', // Make sure this path is correct
      contentType: 'application/pdf'
    }];

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: subject || 'Devoura NGO Collaboration',
      text: text || getEmailTemplate(name, ngoType),
      attachments
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Bulk email error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}