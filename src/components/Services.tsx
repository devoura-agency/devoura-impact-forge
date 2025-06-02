
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Bot, Eye, BarChart, Wrench } from 'lucide-react';

const Services = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Monitor,
      title: "Website Design & Development",
      description: "Responsive, stunning websites built to inspire action, with integrated donation platforms."
    },
    {
      icon: Bot,
      title: "AI-Powered Engagement",
      description: "Chatbots and personalized content to keep donors and volunteers connected 24/7."
    },
    {
      icon: Eye,
      title: "Accessibility & Inclusion",
      description: "WCAG-compliant designs to ensure everyone can access your mission."
    },
    {
      icon: BarChart,
      title: "SEO & Analytics",
      description: "Boost visibility and track impact with AI-driven insights and custom dashboards."
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Ongoing updates to keep your site fast, secure, and effective."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Websites That Empower NGOs
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Inspired by our mission to elevate NGOs, we offer tailored services to meet your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="bg-brand-cream hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-brand-green">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-3"
              >
                Explore Our Packages
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3"
              >
                Contact for Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
