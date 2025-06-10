import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Users, Heart, GraduationCap, Leaf, Shield, Building, Accessibility, Clock, Droplet, Baby, Utensils, Palette } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TemplatesProps {
  showPageMode?: boolean;
}

const Templates = ({ showPageMode = false }: TemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: 'education',
      title: 'Education NGOs',
      description: 'Empowering communities through education and learning',
      icon: GraduationCap,
      color: 'bg-blue-500',
      stats: {
        engagement: '+40%',
        donations: '+60%',
        impact: '2x'
      }
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      description: 'Supporting and empowering women across communities',
      icon: Heart,
      color: 'bg-pink-500',
      stats: {
        engagement: '+45%',
        donations: '+55%',
        impact: '2.5x'
      }
    },
    {
      id: 'wildlife',
      title: 'Wildlife Conservation',
      description: 'Protecting wildlife and natural habitats',
      icon: Leaf,
      color: 'bg-green-500',
      stats: {
        engagement: '+50%',
        donations: '+65%',
        impact: '3x'
      }
    },
    {
      id: 'community-service',
      title: 'Community Service',
      description: 'Building stronger communities through social initiatives',
      icon: Users,
      color: 'bg-purple-500',
      stats: {
        engagement: '+55%',
        donations: '+70%',
        impact: '2.8x'
      }
    },
    {
      id: 'health-and-wellness',
      title: 'Health & Wellness',
      description: 'Providing medical care and health awareness',
      icon: Shield,
      color: 'bg-red-500',
      stats: {
        engagement: '+60%',
        donations: '+75%',
        impact: '3.2x'
      }
    },
    {
      id: 'disaster-management',
      title: 'Disaster Management',
      description: 'Emergency response and disaster management',
      icon: Building,
      color: 'bg-orange-500',
      stats: {
        engagement: '+65%',
        donations: '+80%',
        impact: '3.5x'
      }
    },
    {
      id: 'disability-support',
      title: 'Disability Support',
      description: 'Empowering and supporting people with disabilities',
      icon: Accessibility,
      color: 'bg-indigo-500',
      stats: {
        engagement: '+45%',
        donations: '+60%',
        impact: '2.3x'
      }
    },
    {
      id: 'elderly-care',
      title: 'Elderly Care',
      description: 'Caring for and supporting senior citizens',
      icon: Clock,
      color: 'bg-amber-500',
      stats: {
        engagement: '+50%',
        donations: '+65%',
        impact: '2.6x'
      }
    },
    {
      id: 'environmental-water',
      title: 'Environment & Water',
      description: 'Environmental conservation and water resource management',
      icon: Droplet,
      color: 'bg-cyan-500',
      stats: {
        engagement: '+55%',
        donations: '+70%',
        impact: '2.9x'
      }
    },
    {
      id: 'child-welfare',
      title: 'Child Welfare',
      description: 'Protecting children\'s rights and welfare',
      icon: Baby,
      color: 'bg-yellow-500',
      stats: {
        engagement: '+60%',
        donations: '+75%',
        impact: '3.1x'
      }
    },
    {
      id: 'food-security',
      title: 'Food Security',
      description: 'Fighting hunger and ensuring food security',
      icon: Utensils,
      color: 'bg-emerald-500',
      stats: {
        engagement: '+65%',
        donations: '+80%',
        impact: '3.3x'
      }
    },
    {
      id: 'request-custom',
      title: 'Request Custom Solution',
      description: 'Need something unique? We\'ll create a custom design just for your NGO',
      icon: Palette,
      color: 'bg-gradient-to-br from-brand-green to-brand-gold',
      stats: {
        engagement: 'Custom',
        donations: 'Custom',
        impact: 'Custom'
      }
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
                Explore Our NGO Categories
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Discover how we've helped NGOs across different sectors amplify their impact through custom digital solutions.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-brand-green mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-brand-green font-semibold">{category.stats.engagement}</div>
                          <div className="text-gray-500 text-xs">Engagement</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-brand-green font-semibold">{category.stats.donations}</div>
                          <div className="text-gray-500 text-xs">Donations</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-brand-green font-semibold">{category.stats.impact}</div>
                          <div className="text-gray-500 text-xs">Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => navigate(`/portfolio?category=${category.id}`)}
                      variant="outline"
                      className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                    >
                      View Case Studies
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <div className="bg-brand-green p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Amplify Your Impact?</h3>
              <p className="text-lg mb-6">
                Let's create a custom digital solution that perfectly aligns with your NGO's mission and goals.
              </p>
              <Button 
                onClick={() => navigate('/wizard')}
                variant="outline"
                className="border-white text-brand-green hover:bg-white hover:text-brand-green"
              >
                Start Your Project
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
