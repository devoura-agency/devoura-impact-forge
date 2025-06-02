
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Why Choose Devoura?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We specialize exclusively in NGO websites, combining technical expertise with deep understanding of your unique challenges.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-brand-green mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6">
                Founded by <strong className="text-brand-green">Salve Surya Raj</strong>, Devoura emerged from a simple realization: 
                NGOs need more than just websites—they need digital platforms that truly amplify their impact.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                We combine cutting-edge web development with AI-powered tools to create websites that don't just look professional—they drive real results for your cause.
              </p>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-brand-green hover:bg-brand-green-light text-white px-6 py-3"
              >
                Learn Our Story
              </Button>
            </div>
            <div className="bg-gradient-to-br from-brand-cream to-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-brand-green mb-2">2+</div>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-green mb-2">50+</div>
                  <p className="text-gray-600">Projects Delivered</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-green mb-2">100%</div>
                  <p className="text-gray-600">NGO Focused</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-green mb-2">24/7</div>
                  <p className="text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-brand-green text-center mb-12">Expert Team</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-brand-cream hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-brand-green mb-2">
                  Lead Developer
                </h4>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  Full-Stack Development & Architecture
                </p>
                <p className="text-gray-700">
                  Expert in modern web technologies, responsive design, and performance optimization for mission-driven organizations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-brand-cream hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-brand-green mb-2">
                  UX/UI Specialist
                </h4>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  Design & User Experience
                </p>
                <p className="text-gray-700">
                  Creates intuitive, accessible interfaces that convert visitors into supporters and volunteers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-brand-cream hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-brand-green mb-2">
                  Growth Strategist
                </h4>
                <p className="text-sm text-brand-gold font-medium mb-4">
                  SEO & Analytics
                </p>
                <p className="text-gray-700">
                  Optimizes websites for maximum visibility and tracks performance to ensure your mission reaches the right audience.
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
