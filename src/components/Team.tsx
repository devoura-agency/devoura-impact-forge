import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Instagram, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Surya Raj Salve',
      role: 'Founder & Lead Developer',
      description: 'With over 2 years of experience in web development, Surya specializes in creating impactful websites for NGOs. He combines technical expertise with a passion for social good.',
      funFact: 'Loves mentoring young developers to create with purpose',
      image: '/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png',
      linkedin: '#',
      instagram: '#',
      email: 'surya@devoura.com'
    },
    {
      name: 'Vishnu Margam',
      role: 'Digital Experience Specialist',
      description: 'Vishnu designs intuitive, accessible interfaces that captivate donors and volunteers. Using AI-powered tools, he ensures websites engage visitors 24/7.',
      funFact: 'Volunteers for local education causes in spare time',
      image: '/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png',
      linkedin: '#',
      instagram: '#',
      email: 'vishnu@devoura.com'
    },
    {
      name: 'Sanjay Amaravadi',
      role: 'Web Optimization Specialist',
      description: 'Sanjay boosts website performance with automation and data-driven insights. From SEO to analytics dashboards, he helps NGOs track and grow their impact.',
      funFact: 'Avid supporter of environmental NGOs',
      image: '/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png',
      linkedin: '#',
      instagram: '#',
      email: 'sanjay@devoura.com'
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-brand-cream to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our passionate team combines years of web development expertise with innovative AI tools 
              to craft websites that drive donations, inspire volunteers, and amplify your impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-shadow text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 bg-brand-green rounded-full flex items-center justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <CardTitle className="text-xl text-brand-green">{member.name}</CardTitle>
                  <p className="text-brand-gold font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{member.description}</p>
                  <div className="bg-brand-cream p-3 rounded-lg mb-4">
                    <p className="text-sm text-brand-green font-medium">Fun Fact:</p>
                    <p className="text-sm text-gray-600">{member.funFact}</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <a 
                      href={member.linkedin} 
                      className="text-brand-green hover:text-brand-green-light transition-colors"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.instagram} 
                      className="text-brand-green hover:text-brand-green-light transition-colors"
                      title="Follow on Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-brand-green hover:text-brand-green-light transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
