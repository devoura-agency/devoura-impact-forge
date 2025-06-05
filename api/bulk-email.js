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

// Email template logic based on ngoType
function getEmailTemplate(name, ngoType) {
  const templates = {
    'education': `
Subject: Transform Educational Lives Through Technology - Your Mission Deserves More

Dear ${name},

Every child deserves quality education, but are outdated systems holding your educational NGO back from reaching more lives?

In today's digital world, educational NGOs that embrace technology see 40% more student engagement and 60% higher donation rates. Yet many incredible organizations like yours struggle with:

✗ Outdated websites that don't reflect your impact
✗ Manual processes that consume precious time
✗ Difficulty showcasing student success stories
✗ Limited reach to potential donors and volunteers

At Devoura, we specialize exclusively in educational NGO digital transformation. We've seen firsthand how the right technology can amplify your mission exponentially.

**What we bring to educational organizations:**
🎓 Student-centered engagement platforms that increase participation
📚 Resource management systems that streamline operations  
💝 Compelling storytelling tools that boost donations by 30%
📊 Real-time impact dashboards that show donors exactly how their money helps

Imagine having a website that doesn't just inform—but inspires action. A platform where potential donors can see exactly how their contribution changes a student's life, where volunteers can easily find ways to help, and where your educational programs reach the students who need them most.

Your mission is too important to be limited by technology barriers.

I've attached our educational NGO success portfolio and would love to show you how we can amplify your impact. Let's discuss how we can help you reach more students, attract more donors, and create lasting educational change.

Best regards,
The Devoura Team

P.S. We're offering a complimentary digital impact assessment for educational NGOs this month. Let's explore your potential together.

Learn more: ${WEBSITE_URL}
`,
    'women-empowerment': `
Subject: Amplify Women's Voices - Your Empowerment Mission Needs the Right Platform

Dear ${name},

Every woman you empower creates a ripple effect that changes families, communities, and generations. But is your current digital presence matching the magnitude of your impact?

Women empowerment NGOs with professional digital platforms see 50% more program applications and 35% higher funding success rates. Yet many powerful organizations struggle with:

✗ Websites that don't capture the strength of your mission
✗ Limited ability to share powerful success stories
✗ Difficulty connecting with women who need your programs
✗ Challenges in showcasing impact to potential funders

At Devoura, we understand that women's empowerment isn't just a cause—it's a movement. And movements need platforms that inspire, engage, and mobilize.

**How we elevate women empowerment organizations:**
💪 Impact storytelling platforms that showcase real transformation
🌟 Community engagement tools that connect women globally
💝 Donation systems that make supporting women's causes effortless
📱 Mobile-optimized platforms reaching women everywhere

Picture this: A website where every visitor immediately understands the life-changing work you do. Where a single mother can easily find your job training program. Where a corporate sponsor sees exactly how their donation creates economic independence for women. Where volunteers can instantly connect with opportunities to make a difference.

Your work changes lives—your digital presence should change minds and open hearts.

We specialize in creating digital experiences that don't just inform about women's empowerment—they inspire action and drive real support.

I've attached examples of how we've helped similar organizations amplify their reach and impact. Let's discuss how we can help you reach more women, attract more supporters, and create even greater change.

Together, we can ensure your powerful mission gets the digital platform it deserves.

Best regards,
The Devoura Team

P.S. We believe so strongly in women's empowerment that we're offering priority scheduling for organizations like yours. Your mission can't wait—neither should your digital transformation.

Discover your potential: ${WEBSITE_URL}
`,
    'wildlife': `
Subject: Save More Wildlife - Your Conservation Mission Needs Digital Innovation

Dear ${name},

Every species you protect and every habitat you preserve matters more than ever. But are outdated digital tools limiting your conservation impact when wildlife needs you most?

Wildlife conservation NGOs with modern digital platforms reach 3x more supporters and secure 45% more funding. Yet many crucial organizations face:

✗ Websites that don't convey the urgency of conservation
✗ Difficulty sharing real-time wildlife updates
✗ Limited ability to connect supporters with conservation actions
✗ Challenges showcasing conservation success stories

At Devoura, we believe that saving wildlife requires both field expertise and digital innovation. We specialize in creating platforms that make conservation compelling and action urgent.

**How we support wildlife conservation missions:**
🐾 Real-time wildlife tracking and monitoring dashboards
🌍 Interactive conservation maps showing immediate impact
💚 Urgent action alert systems for conservation emergencies
📸 Powerful visual storytelling that moves hearts and opens wallets

Imagine a website where visitors can watch your conservation work happen in real-time. Where a nature lover can instantly adopt an endangered animal. Where a concerned citizen can immediately take action to protect a threatened habitat. Where corporate sponsors see exactly how their support saves species from extinction.

Every day delayed is another day wildlife faces threats without your maximum impact.

We understand that conservation is a race against time. That's why we create digital solutions that mobilize supporters instantly and turn concern into conservation action.

I've attached our conservation portfolio showing how we've helped wildlife organizations reach more supporters and secure more funding. Let's discuss how we can help you save more wildlife and create greater conservation impact.

The planet's biodiversity depends on organizations like yours having every possible advantage.

Best regards,
The Devoura Team

P.S. We're offering expedited development for wildlife conservation organizations because we know every moment counts. Let's get your conservation mission the digital power it needs—today.

Start protecting more wildlife: ${WEBSITE_URL}
`,
    'community-service': `
Subject: Strengthen Communities - Your Service Mission Deserves Maximum Impact

Dear ${name},

Strong communities are built by organizations like yours, one service at a time. But are digital limitations preventing you from reaching everyone who needs your help?

Community service organizations with professional digital presence serve 60% more people and attract 40% more volunteers. Yet many dedicated organizations struggle with:

✗ Outdated systems that slow down service delivery
✗ Difficulty connecting with community members who need help
✗ Limited visibility for volunteer opportunities
✗ Challenges showing funders your real community impact

At Devoura, we know that community service is about connection, accessibility, and impact. We create digital solutions that bring communities together and make getting help easier.

**How we amplify community service organizations:**
🏘️ Community resource maps connecting people with services
🤝 Volunteer coordination systems that maximize helping hands
📋 Service request platforms that streamline assistance
💝 Impact visualization showing real community transformation

Envision a digital hub where community members instantly find the help they need. Where volunteers easily discover meaningful ways to serve. Where local businesses see exactly how their support strengthens neighborhoods. Where every service you provide creates visible, shareable impact.

Your community deserves access to every resource and service you offer.

We specialize in creating digital bridges that connect community needs with community resources, making your service more effective and far-reaching.

I've attached examples of how we've helped community organizations expand their reach and deepen their impact. Let's explore how we can help you serve more people and build stronger communities.

Together, we can ensure no community member goes without the support they need.

Best regards,
The Devoura Team

P.S. Strong communities start with strong organizations. We're prioritizing community service NGOs because we believe in the ripple effect of local impact. Let's strengthen your community together.

Build stronger communities: ${WEBSITE_URL}
`,
    'health-and-wellness': `
Subject: Heal More Lives - Your Health Mission Needs Digital Innovation

Dear ${name},

Every life you touch through health and wellness services creates waves of healing that extend to families and communities. But are digital barriers limiting how many people you can help?

Health and wellness NGOs with modern digital platforms reach 70% more patients and secure 50% more medical funding. Yet many vital organizations face challenges:

✗ Systems that slow down patient care and service delivery
✗ Difficulty connecting with people who need health services
✗ Limited ability to share health education and resources
✗ Challenges demonstrating health outcomes to funders

At Devoura, we understand that health is urgent and wellness is essential. We create digital solutions that make healthcare accessible and wellness achievable for everyone.

**How we support health and wellness missions:**
🏥 Patient management systems that streamline care delivery
💊 Health resource libraries accessible to entire communities
📱 Telemedicine integration for remote health support
📊 Health outcome tracking that proves your life-saving impact

Imagine a platform where patients easily access your health services. Where families find crucial health education when they need it most. Where medical volunteers quickly connect with opportunities to heal. Where donors see exactly how their support saves lives and improves health outcomes.

Every person deserves access to the health and wellness services you provide.

We specialize in creating digital health solutions that don't just manage data—they save lives and improve wellness for entire communities.

I've attached our health NGO portfolio showing how we've helped organizations reach more patients and secure more funding. Let's discuss how we can help you heal more lives and create greater health impact.

Your healing mission is too important to be limited by technology barriers.

Best regards,
The Devoura Team

P.S. Health can't wait, and neither should your digital transformation. We're offering priority development for health organizations because every day means more lives you could be reaching.

Start healing more lives: ${WEBSITE_URL}
`,
    'disaster-management': `
Subject: Save More Lives - Crisis Response Needs Instant Digital Solutions

Dear ${name},

When disaster strikes, every second counts. Every life you save and every family you help recover matters immensely. But are outdated systems slowing down your life-saving response?

Disaster management organizations with modern digital command centers respond 50% faster and coordinate 3x more effective relief efforts. Yet many critical organizations struggle with:

✗ Communication systems that fail during emergencies
✗ Slow resource coordination when speed saves lives
✗ Difficulty tracking aid distribution in real-time
✗ Limited ability to show donors immediate crisis impact

At Devoura, we know that disaster response is about speed, coordination, and saving lives. We create emergency-ready digital solutions that perform when it matters most.

**How we power disaster response organizations:**
🚨 Real-time emergency coordination dashboards
📍 Live resource tracking and distribution systems
📱 Mobile-first communication for field teams
🆘 Instant donor alert systems for emergency funding

Picture this: A command center where you instantly coordinate rescue efforts across multiple locations. Where emergency supplies are tracked in real-time from donation to distribution. Where affected families quickly find aid and shelter. Where emergency donors see immediate impact and respond instantly to urgent needs.

When lives are at stake, your response tools must be flawless.

We specialize in creating crisis-ready digital infrastructure that doesn't just work—it works when everything else is failing, when connectivity is poor, and when every second counts.

I've attached our emergency response portfolio showing how we've helped disaster organizations save more lives and coordinate better relief. Time is critical—let's discuss how we can strengthen your disaster response capabilities immediately.

Every life you save matters. Every system enhancement helps you save more.

Best regards,
The Devoura Team

P.S. Disasters don't wait for convenient timing, and neither should your digital preparedness. We're offering emergency priority development because when the next crisis hits, you need to be ready.

Prepare to save more lives: ${WEBSITE_URL}
`,
    'other': `
Subject: Amplify Your Impact - Your NGO Mission Deserves Digital Excellence

Dear ${name},

Your NGO exists to solve important problems and create positive change. But are digital limitations preventing you from reaching your full potential and maximum impact?

NGOs with professional digital presence attract 65% more supporters, secure 45% more funding, and reach 3x more beneficiaries. Yet many incredible organizations struggle with:

✗ Websites that don't reflect the importance of their mission
✗ Outdated systems that waste precious time and resources
✗ Difficulty communicating impact to potential supporters
✗ Limited ability to scale their important work

At Devoura, we believe every NGO mission matters and deserves the best digital tools to succeed. We specialize exclusively in NGO digital transformation because we understand your unique challenges and opportunities.

**How we amplify NGO missions across all sectors:**
🎯 Mission-focused websites that inspire immediate action
💝 Integrated donation systems that increase giving by 30%
🤝 Volunteer management platforms that maximize community support
📊 Impact dashboards that prove your value to funders

Envision having digital tools that work as hard as you do for your cause. A website where visitors instantly understand why your mission matters and how they can help. Systems that automate tedious tasks so you focus on changing lives. Platforms that turn one-time supporters into lifelong advocates.

Your mission is too important to be held back by poor digital infrastructure.

We don't just build websites—we create digital ecosystems that amplify your impact, expand your reach, and ensure your vital work gets the support it deserves.

I've attached our NGO transformation portfolio showing how we've helped organizations like yours increase their impact and achieve their missions more effectively. Let's explore how we can help you reach more people, secure more funding, and create greater change.

Together, we can ensure your important mission achieves its maximum potential.

Best regards,
The Devoura Team

P.S. Great missions deserve great tools. We're offering comprehensive digital assessments for mission-driven organizations because we believe in maximizing impact for good. Your community needs what you offer—let's make sure they can find it.

Amplify your mission: ${WEBSITE_URL}
`
  };
  return templates[ngoType] || templates.other;
}

export default async function handler(req, res) {
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if email credentials are available
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error('Email credentials not configured');
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'EMAIL_USER and EMAIL_PASS environment variables are required'
      });
    }

    const { name, email, ngoType, subject, text, html } = req.body;

    // Validate required fields
    if (!name || !email || !ngoType) {
      console.error('Missing required fields:', { name: !!name, email: !!email, ngoType: !!ngoType });
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'ngoType'],
        received: { name: !!name, email: !!email, ngoType: !!ngoType }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log(`Preparing to send email to: ${email} (${name}) - NGO Type: ${ngoType}`);

    // Get attachments if pitch deck exists
    const attachments = getPitchDeckAttachment();

    const mailOptions = {
      from: `"Devoura Team" <${EMAIL_USER}>`,
      to: email,
      subject: subject || '🚀 Transform Your NGO\'s Digital Impact - Devoura Partnership',
      attachments
    };

    // Use HTML if provided, otherwise fall back to text
    if (html) {
      mailOptions.html = html;
      console.log('Sending HTML email');
    } else if (text) {
      mailOptions.text = text;
      console.log('Sending text email');
    } else {
      mailOptions.text = 'Professional NGO website solutions from Devoura';
      console.log('Sending default text email');
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      message: 'Email sent successfully',
      messageId: info.messageId,
      attachmentsIncluded: attachments.length > 0,
      format: html ? 'HTML' : 'Text',
      recipient: email,
      ngoType
    });
  } catch (error) {
    console.error('Bulk email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
