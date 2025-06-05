
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram, Heart, Users, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us Directly",
      description: "Prefer email? Drop us a line and we'll get back to you within 24 hours.",
      action: "Send Email",
      href: "mailto:devoura.agency@gmail.com",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      icon: Linkedin,
      title: "Connect on LinkedIn",
      description: "Connect with us for professional updates and insights.",
      action: "LinkedIn",
      href: "#",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      icon: Instagram,
      title: "Follow on Instagram",
      description: "See our latest projects and stories on Instagram.",
      action: "Instagram",
      href: "#",
      color: "bg-pink-50 hover:bg-pink-100 border-pink-200"
    }
  ];

  const features = [
    {
      icon: Heart,
      text: "Specialized in NGO websites"
    },
    {
      icon: Zap,
      text: "AI-powered engagement tools"
    },
    {
      icon: Shield,
      text: "Proven donation increase results"
    },
    {
      icon: Users,
      text: "Ongoing support & maintenance"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Let's Elevate Your Mission
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to transform your NGO's digital presence? Get in touch and let's discuss how we can amplify your impact.
            </p>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-brand-green to-brand-green-light p-8 rounded-2xl text-white mb-8">
              <h3 className="text-3xl font-bold mb-4">Start Your Digital Journey Today</h3>
              <p className="text-xl mb-6">
                Book a free consultation and discover how a professional website can transform your NGO's impact.
              </p>
              <Button 
                onClick={() => navigate('/request-call')}
                size="lg"
                className="bg-white text-brand-green hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Schedule Free Consultation
              </Button>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`${method.color} transition-all duration-300 hover:shadow-lg h-full`}>
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <method.icon className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{method.description}</p>
                  </div>
                  <Button 
                    onClick={() => window.open(method.href, '_blank')}
                    variant="outline"
                    className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white w-full"
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Devoura */}
          <div className="bg-brand-cream p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-brand-green text-center mb-8">
              Why Choose Devoura?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Contact Info */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-brand-green" />
                <span className="text-gray-700">Response within 24 hours</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-brand-green" />
                <span className="text-gray-700">Free consultation call</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-5 h-5 text-brand-green" />
                <span className="text-gray-700">Global remote service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
