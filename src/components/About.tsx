
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-brand-cream to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-green text-center mb-16">
            Our Story: From One NGO to a Mission
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                I'm <strong className="text-brand-green">Salve Surya Raj</strong>, founder of Devoura. 
                Two years ago, while working on diverse web projects, I met an NGO leader who shared a simple truth: 
                without a strong online presence, their mission was reaching only a fraction of its potential.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Donors couldn't find them. Volunteers couldn't connect. Their impact was limited by an 
                outdated website—or none at all. That conversation lit a spark.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Today, our small but mighty team combines web development expertise with cutting-edge AI 
                and automation to create websites that don't just look good—they make a difference.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-brand-green mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg">
                To ensure every NGO, no matter its size, can share its story, engage donors, 
                and change lives through powerful digital presence.
              </p>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-brand-green text-center mb-12">Meet Our Team</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-brand-green mb-2">
                  Salve Surya Raj
                </h4>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  Lead Web Developer & Creative Director
                </p>
                <p className="text-gray-700 mb-4">
                  With over two years of experience building websites for startups and organizations, 
                  I craft functional, responsive sites that bring NGO missions to life.
                </p>
                <p className="text-sm text-brand-green font-medium">
                  Fun Fact: I love mentoring young developers to create with purpose.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-brand-green mb-2">
                  Digital Experience Specialist
                </h4>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  UI/UX Design & Chatbot Development
                </p>
                <p className="text-gray-700 mb-4">
                  Designs intuitive, accessible interfaces that captivate donors and volunteers. 
                  Using AI-powered tools like chatbots, they ensure your website engages visitors 24/7.
                </p>
                <p className="text-sm text-brand-green font-medium">
                  Fun Fact: Volunteers for local education causes in their spare time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-brand-green mb-2">
                  Web Optimization Specialist
                </h4>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  SEO, Analytics & Automation
                </p>
                <p className="text-gray-700 mb-4">
                  Boosts your website's performance with automation and data-driven insights. 
                  From SEO to analytics dashboards, they help NGOs track and grow their impact.
                </p>
                <p className="text-sm text-brand-green font-medium">
                  Fun Fact: Avid supporter of environmental NGOs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
