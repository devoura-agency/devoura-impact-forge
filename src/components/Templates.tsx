import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Users, Heart, GraduationCap, Leaf, Shield, Building } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TemplatesProps {
  showPageMode?: boolean;
}

const Templates = ({ showPageMode = false }: TemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const templates = [
    {
      id: 'education',
      title: 'Education NGOs',
      description: 'Empowering communities through education and learning',
      icon: GraduationCap,
      color: 'bg-blue-500',
      examples: [
        { name: 'EduCare Foundation', url: 'https://educare-foundation-ngo.vercel.app/' },
        { name: 'Future Bright Girls', url: 'https://future-bright-girls-ngo.vercel.app/' },
        { name: 'Education NGO', url: 'https://edu-ngo.vercel.app/' }
      ]
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      description: 'Supporting and empowering women across communities',
      icon: Heart,
      color: 'bg-pink-500',
      examples: [
        { name: 'Empowering Women NGO', url: 'https://empowering-women-ngo.vercel.app/' }
      ]
    },
    {
      id: 'wildlife',
      title: 'Wildlife Conservation',
      description: 'Protecting wildlife and natural habitats',
      icon: Leaf,
      color: 'bg-green-500',
      examples: [
        { name: 'Wildlife Hope', url: 'https://wildlife-hope-ngo.vercel.app/' },
        { name: 'Wildlife Legacy', url: 'https://wildlife-legacy-ngo.vercel.app/' }
      ]
    },
    {
      id: 'social-welfare',
      title: 'Social Welfare',
      description: 'Building stronger communities through social initiatives',
      icon: Users,
      color: 'bg-purple-500',
      examples: [
        { name: 'Seva Bharat', url: 'https://seva-bharat-ngo.vercel.app/' },
        { name: 'Jeevan Safar Sangam', url: 'https://jeevan-safar-sangam-ngo.vercel.app/' }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'Providing medical care and health awareness',
      icon: Shield,
      color: 'bg-red-500',
      examples: []
    },
    {
      id: 'disaster-relief',
      title: 'Disaster Relief',
      description: 'Emergency response and disaster management',
      icon: Building,
      color: 'bg-orange-500',
      examples: []
    }
  ];

  const pricingPlans = {
    basic: {
      title: 'Basic Frontend Website',
      details: ['Static pages (Home, About, Projects, Contact)', 'Responsive Design'],
      price: '₹3,000 – ₹5,000',
      deliveryTime: '3 – 5 Days'
    },
    contact: {
      title: 'Frontend + Contact/Volunteer Form',
      details: ['Same as above + functional form with email integration'],
      price: '₹5,000 – ₹7,500',
      deliveryTime: '4 – 6 Days'
    },
    backend: {
      title: 'Frontend + Backend (with Payment Integration)',
      details: ['Dynamic website', 'Admin panel', 'Donation/payment gateway'],
      price: '₹10,000 – ₹15,000',
      deliveryTime: '7 – 10 Days'
    },
    complete: {
      title: 'Complete Dynamic Website (Full Backend Support)',
      details: ['Fully manageable website (CMS)', 'login/signup', 'uploads', 'admin dashboard'],
      price: '₹15,000 – ₹25,000+',
      deliveryTime: '10 – 15 Days'
    }
  };

  const maintenancePlans = {
    quarterly: {
      title: 'Quarterly',
      details: ['1 backup/month', '2 small changes/month', 'uptime checks'],
      price: '₹1,000 – ₹2,000'
    },
    halfYearly: {
      title: 'Half-Yearly',
      details: ['2 backups/month', '3 changes/month', 'performance optimization'],
      price: '₹2,000 – ₹3,500'
    },
    yearly: {
      title: 'Yearly',
      details: ['24/7 support', 'regular updates', 'security patches', 'free hosting*'],
      price: '₹4,000 – ₹6,000'
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTemplatePreview = (template: typeof templates[0]) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedCategory(null)}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-brand-green">{template.title}</h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {template.examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="aspect-video relative">
                    <iframe
                      src={example.url}
                      className="w-full h-full border-0"
                      title={example.name}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{example.name}</h4>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-brand-green hover:bg-brand-green hover:text-white"
                        onClick={() => window.open(example.url, '_blank')}
                      >
                        View Live Site
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green-light text-white"
                        onClick={() => navigate('/pricing')}
                      >
                        Select This Template
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                onClick={() => navigate('/pricing')}
              >
                Request Custom Website
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="templates" className={showPageMode ? "py-8" : "py-20 bg-white"}>
      <div className={showPageMode ? "w-full" : "container mx-auto px-4"}>
        <div className={showPageMode ? "max-w-7xl mx-auto" : "max-w-6xl mx-auto"}>
          {!showPageMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
                Websites That Empower NGOs
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Explore our professionally designed templates tailored for different NGO types. 
                Each template is optimized for donations, volunteer engagement, and impact storytelling.
              </p>
            </motion.div>
          )}

          <motion.div
            className={showPageMode ? "grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {templates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <motion.div
                  key={template.id}
                  variants={showPageMode ? {
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring' } }
                  } : {}}
                  whileHover={showPageMode ? { scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' } : {}}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-green">
                    <CardHeader className="text-center">
                      <motion.div
                        whileHover={showPageMode ? { scale: 1.1 } : {}}
                        className={`w-16 h-16 ${template.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl text-brand-green">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 mb-6">{template.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-5 text-xl font-bold rounded-xl shadow-lg"
                onClick={() => navigate('/pricing')}
              >
                Explore Our Packages
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-10 py-5 text-xl font-bold rounded-xl"
                onClick={() => scrollToSection('contact')}
              >
                Contact for Custom Quote
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <div className="bg-brand-green p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Your NGO's Story</h3>
              <p className="text-lg mb-6">
                Every NGO has a unique story of impact and change. Let us help you tell yours in the most compelling way possible.
              </p>
              <Button 
                onClick={() => navigate('/wizard')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                Get Started Today
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCategory && renderTemplatePreview(templates.find(t => t.id === selectedCategory)!)}
      </AnimatePresence>
    </section>
  );
};

export default Templates;
