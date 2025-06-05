
import { NGOType } from '../types';

const WEBSITE_URL = 'https://devoura.vercel.app';

export const getHTMLEmailTemplate = (name: string, ngoType: NGOType) => {
  const templates = {
    'education': getEducationHTMLTemplate(name),
    'women-empowerment': getWomenEmpowermentHTMLTemplate(name),
    'wildlife': getWildlifeHTMLTemplate(name),
    'community-service': getCommunityServiceHTMLTemplate(name),
    'health-and-wellness': getHealthWellnessHTMLTemplate(name),
    'disaster-management': getDisasterManagementHTMLTemplate(name),
    'other': getGeneralHTMLTemplate(name)
  };

  return templates[ngoType] || templates.other;
};

const getCommonHTMLHeader = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devoura - Empowering NGOs Through Technology</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px; text-align: center; }
        .logo { max-width: 180px; height: auto; margin-bottom: 20px; }
        .header-text { color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #374151; margin-bottom: 25px; font-weight: 600; }
        .main-text { font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 20px; }
        .highlight { background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 25px 0; }
        .benefits { background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .benefit-item { display: flex; align-items: flex-start; margin-bottom: 12px; }
        .benefit-icon { color: #16a34a; font-weight: bold; margin-right: 10px; }
        .cta-container { text-align: center; margin: 40px 0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .secondary-cta { background: #ffffff; color: #16a34a; border: 2px solid #16a34a; }
        .stats { background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center; }
        .stat-number { font-size: 24px; font-weight: bold; color: #1e40af; }
        .footer { background-color: #f3f4f6; padding: 30px; text-align: center; font-size: 14px; color: #6b7280; }
        .signature { margin-top: 30px; font-style: italic; color: #374151; }
        .experience-badge { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #ffffff; padding: 12px 20px; border-radius: 25px; display: inline-block; font-weight: bold; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://devoura.vercel.app/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" alt="Devoura Logo" class="logo">
            <h1 class="header-text">Empowering NGOs Through Technology</h1>
        </div>
        <div class="content">
`;

const getCommonHTMLFooter = () => `
            <div class="experience-badge">
                ✨ 2+ Years of NGO Digital Excellence
            </div>
            
            <div class="main-text">
                <strong>You are a changemaker.</strong> Your mission transforms lives every single day. With over 2 years of specialized experience in NGO digital solutions, we have a proven vision: to make every NGO powerful online. 
            </div>
            
            <div class="highlight">
                <strong>Your impact deserves the best digital platform.</strong> Join the community of changemakers who have amplified their mission with Devoura. You have the power to change the world – let us give you the digital tools to do it even better.
            </div>

            <div class="cta-container">
                <a href="${WEBSITE_URL}/wizard" class="cta-button">🚀 Start Your Digital Journey</a>
                <a href="${WEBSITE_URL}" class="cta-button secondary-cta">🌟 Explore Our Impact</a>
            </div>

            <div class="signature">
                Together, we're building a stronger world,<br>
                <strong>The Devoura Team</strong><br>
                <em>Where NGO visions become digital reality</em>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Ready to amplify your impact?</strong></p>
            <p>Visit us at <a href="${WEBSITE_URL}" style="color: #16a34a;">${WEBSITE_URL}</a></p>
            <p>Start your website journey: <a href="${WEBSITE_URL}/wizard" style="color: #16a34a;">${WEBSITE_URL}/wizard</a></p>
            <p style="margin-top: 20px; font-size: 12px;">This email was sent because we believe in your mission and want to help you succeed online.</p>
        </div>
    </div>
</body>
</html>
`;

const getEducationHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                Every child deserves quality education, but is your digital presence limiting the lives you could touch? 
            </div>
            
            <div class="stats">
                <div class="stat-number">40%</div>
                <div>More student engagement with proper digital platforms</div>
                <div class="stat-number" style="margin-top: 15px;">60%</div>
                <div>Higher donation rates for tech-enabled educational NGOs</div>
            </div>
            
            <div class="main-text">
                Educational NGOs with the right digital foundation don't just teach – they inspire, engage, and create lasting change. Yet many incredible organizations struggle with outdated websites that don't reflect their transformative impact.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">🎓</span>
                    <span>Student-centered engagement platforms that increase participation</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📚</span>
                    <span>Resource management systems that streamline operations</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💝</span>
                    <span>Compelling storytelling tools that boost donations by 30%</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📊</span>
                    <span>Real-time impact dashboards showing donors exactly how their money helps</span>
                </div>
            </div>
            
            <div class="main-text">
                Imagine having a website that doesn't just inform—but inspires action. A platform where potential donors see exactly how their contribution changes a student's life, where volunteers easily find ways to help, and where your educational programs reach the students who need them most.
            </div>
${getCommonHTMLFooter()}
`;

const getWomenEmpowermentHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                Every woman you empower creates a ripple effect that changes families, communities, and generations. Is your current digital presence matching the magnitude of your impact?
            </div>
            
            <div class="stats">
                <div class="stat-number">50%</div>
                <div>More program applications with professional digital platforms</div>
                <div class="stat-number" style="margin-top: 15px;">35%</div>
                <div>Higher funding success rates for women empowerment NGOs</div>
            </div>
            
            <div class="main-text">
                Women's empowerment isn't just a cause—it's a movement. And movements need platforms that inspire, engage, and mobilize supporters worldwide.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">💪</span>
                    <span>Impact storytelling platforms that showcase real transformation</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🌟</span>
                    <span>Community engagement tools that connect women globally</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💝</span>
                    <span>Donation systems that make supporting women's causes effortless</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📱</span>
                    <span>Mobile-optimized platforms reaching women everywhere</span>
                </div>
            </div>
            
            <div class="main-text">
                Picture a website where every visitor immediately understands the life-changing work you do. Where a single mother easily finds your job training program. Where corporate sponsors see exactly how their donation creates economic independence for women.
            </div>
${getCommonHTMLFooter()}
`;

const getWildlifeHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                Every species you protect and every habitat you preserve matters more than ever. Are outdated digital tools limiting your conservation impact when wildlife needs you most?
            </div>
            
            <div class="stats">
                <div class="stat-number">3X</div>
                <div>More supporters reached with modern digital platforms</div>
                <div class="stat-number" style="margin-top: 15px;">45%</div>
                <div>More funding secured by digitally-enabled conservation NGOs</div>
            </div>
            
            <div class="main-text">
                Saving wildlife requires both field expertise and digital innovation. Every day delayed is another day wildlife faces threats without your maximum impact.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">🐾</span>
                    <span>Real-time wildlife tracking and monitoring dashboards</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🌍</span>
                    <span>Interactive conservation maps showing immediate impact</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💚</span>
                    <span>Urgent action alert systems for conservation emergencies</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📸</span>
                    <span>Powerful visual storytelling that moves hearts and opens wallets</span>
                </div>
            </div>
            
            <div class="main-text">
                Imagine a website where visitors watch your conservation work happen in real-time. Where nature lovers instantly adopt endangered animals. Where concerned citizens immediately take action to protect threatened habitats.
            </div>
${getCommonHTMLFooter()}
`;

const getCommunityServiceHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                Strong communities are built by organizations like yours, one service at a time. Are digital limitations preventing you from reaching everyone who needs your help?
            </div>
            
            <div class="stats">
                <div class="stat-number">60%</div>
                <div>More people served with professional digital presence</div>
                <div class="stat-number" style="margin-top: 15px;">40%</div>
                <div>More volunteers attracted to digitally-enabled organizations</div>
            </div>
            
            <div class="main-text">
                Community service is about connection, accessibility, and impact. We create digital solutions that bring communities together and make getting help easier.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">🏘️</span>
                    <span>Community resource maps connecting people with services</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🤝</span>
                    <span>Volunteer coordination systems that maximize helping hands</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📋</span>
                    <span>Service request platforms that streamline assistance</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💝</span>
                    <span>Impact visualization showing real community transformation</span>
                </div>
            </div>
            
            <div class="main-text">
                Envision a digital hub where community members instantly find the help they need. Where volunteers easily discover meaningful ways to serve. Where every service you provide creates visible, shareable impact.
            </div>
${getCommonHTMLFooter()}
`;

const getHealthWellnessHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                Every life you touch through health and wellness services creates waves of healing that extend to families and communities. Are digital barriers limiting how many people you can help?
            </div>
            
            <div class="stats">
                <div class="stat-number">70%</div>
                <div>More patients reached with modern digital platforms</div>
                <div class="stat-number" style="margin-top: 15px;">50%</div>
                <div>More medical funding secured by health NGOs</div>
            </div>
            
            <div class="main-text">
                Health is urgent and wellness is essential. We create digital solutions that make healthcare accessible and wellness achievable for everyone.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">🏥</span>
                    <span>Patient management systems that streamline care delivery</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💊</span>
                    <span>Health resource libraries accessible to entire communities</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📱</span>
                    <span>Telemedicine integration for remote health support</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📊</span>
                    <span>Health outcome tracking that proves your life-saving impact</span>
                </div>
            </div>
            
            <div class="main-text">
                Imagine a platform where patients easily access your health services. Where families find crucial health education when they need it most. Where donors see exactly how their support saves lives and improves health outcomes.
            </div>
${getCommonHTMLFooter()}
`;

const getDisasterManagementHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                When disaster strikes, every second counts. Every life you save and every family you help recover matters immensely. Are outdated systems slowing down your life-saving response?
            </div>
            
            <div class="stats">
                <div class="stat-number">50%</div>
                <div>Faster response with modern digital command centers</div>
                <div class="stat-number" style="margin-top: 15px;">3X</div>
                <div>More effective relief coordination</div>
            </div>
            
            <div class="main-text">
                Disaster response is about speed, coordination, and saving lives. We create emergency-ready digital solutions that perform when it matters most.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">🚨</span>
                    <span>Real-time emergency coordination dashboards</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📍</span>
                    <span>Live resource tracking and distribution systems</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📱</span>
                    <span>Mobile-first communication for field teams</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🆘</span>
                    <span>Instant donor alert systems for emergency funding</span>
                </div>
            </div>
            
            <div class="main-text">
                Picture a command center where you instantly coordinate rescue efforts across multiple locations. Where emergency supplies are tracked in real-time from donation to distribution. When lives are at stake, your response tools must be flawless.
            </div>
${getCommonHTMLFooter()}
`;

const getGeneralHTMLTemplate = (name: string) => `
${getCommonHTMLHeader()}
            <div class="greeting">Dear ${name},</div>
            
            <div class="main-text">
                Your NGO exists to solve important problems and create positive change. Are digital limitations preventing you from reaching your full potential and maximum impact?
            </div>
            
            <div class="stats">
                <div class="stat-number">65%</div>
                <div>More supporters attracted with professional digital presence</div>
                <div class="stat-number" style="margin-top: 15px;">45%</div>
                <div>More funding secured by digitally-enabled NGOs</div>
                <div class="stat-number" style="margin-top: 15px;">3X</div>
                <div>More beneficiaries reached</div>
            </div>
            
            <div class="main-text">
                Every NGO mission matters and deserves the best digital tools to succeed. We specialize exclusively in NGO digital transformation because we understand your unique challenges and opportunities.
            </div>
            
            <div class="benefits">
                <div class="benefit-item">
                    <span class="benefit-icon">🎯</span>
                    <span>Mission-focused websites that inspire immediate action</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">💝</span>
                    <span>Integrated donation systems that increase giving by 30%</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">🤝</span>
                    <span>Volunteer management platforms that maximize community support</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">📊</span>
                    <span>Impact dashboards that prove your value to funders</span>
                </div>
            </div>
            
            <div class="main-text">
                Envision having digital tools that work as hard as you do for your cause. A website where visitors instantly understand why your mission matters and how they can help. Your mission is too important to be held back by poor digital infrastructure.
            </div>
${getCommonHTMLFooter()}
`;
