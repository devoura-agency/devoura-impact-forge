
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Website {
  id: string;
  title: string;
  category: string;
  url: string;
  tag: string;
  description: string;
}

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: '1',
      title: "EduCare Foundation",
      category: "Education NGO",
      url: "https://educare-foundation-ngo.vercel.app/",
      tag: 'starter',
      description: "Empowering education for underprivileged children"
    },
    {
      id: '2', 
      title: "Empowering Women",
      category: "Women's Rights",
      url: "https://empowering-women-ngo.vercel.app/",
      tag: 'starter',
      description: "Supporting women's empowerment and equality"
    },
    {
      id: '3',
      title: "Wildlife Hope",
      category: "Wildlife Conservation", 
      url: "https://wildlife-hope-ngo.vercel.app/",
      tag: 'starter',
      description: "Protecting endangered species and their habitats"
    },
    {
      id: '4',
      title: "Future Bright Girls",
      category: "Girl Child Education",
      url: "https://future-bright-girls-ngo.vercel.app/",
      tag: 'starter',
      description: "Ensuring quality education for every girl child"
    },
    {
      id: '5',
      title: "Seva Bharat",
      category: "Community Service",
      url: "https://seva-bharat-ngo.vercel.app/",
      tag: 'starter',
      description: "Serving communities through various social initiatives"
    },
    {
      id: '6',
      title: "Jeevan Safar Sangam",
      category: "Health & Wellness",
      url: "https://jeevan-safar-sangam-ngo.vercel.app/",
      tag: 'starter',
      description: "Promoting health and wellness in rural communities"
    }
  ]);

  const [filter, setFilter] = useState('all');

  const handleViewWebsite = (website: Website) => {
    navigate(`/website-viewer?url=${encodeURIComponent(website.url)}&name=${encodeURIComponent(website.title)}`);
  };

  const filteredWebsites = filter === 'all' 
    ? websites 
    : websites.filter(website => website.tag === filter);

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'starter': return 'bg-green-100 text-green-800';
      case 'pro': return 'bg-blue-100 text-blue-800';
      case 'impact pack': return 'bg-yellow-100 text-yellow-800';
      case 'superpack': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-brand-green mb-6"
              >
                Our Portfolio
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 max-w-3xl mx-auto"
              >
                Explore our collection of beautiful, functional websites designed specifically for NGOs. 
                Each template is crafted to help organizations amplify their impact and reach more supporters.
              </motion.p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
                className={filter === 'all' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
              >
                All Templates
              </Button>
              <Button
                onClick={() => setFilter('starter')}
                variant={filter === 'starter' ? 'default' : 'outline'}
                className={filter === 'starter' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
              >
                Starter
              </Button>
              <Button
                onClick={() => setFilter('pro')}
                variant={filter === 'pro' ? 'default' : 'outline'}
                className={filter === 'pro' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
              >
                Pro
              </Button>
              <Button
                onClick={() => setFilter('impact pack')}
                variant={filter === 'impact pack' ? 'default' : 'outline'}
                className={filter === 'impact pack' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
              >
                Impact Pack
              </Button>
              <Button
                onClick={() => setFilter('superpack')}
                variant={filter === 'superpack' ? 'default' : 'outline'}
                className={filter === 'superpack' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
              >
                Super Pack
              </Button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWebsites.map((website, index) => (
                <motion.div
                  key={website.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-brand-green/10 to-brand-gold/10 flex items-center justify-center">
                        <Globe className="w-16 h-16 text-brand-green" />
                      </div>
                      <Badge className={`absolute top-4 right-4 ${getTagColor(website.tag)}`}>
                        {website.tag}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-brand-green mb-2">
                        {website.title}
                      </h3>
                      <p className="text-sm text-brand-green/70 mb-2">
                        {website.category}
                      </p>
                      <p className="text-gray-600 mb-4 text-sm">
                        {website.description}
                      </p>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleViewWebsite(website)}
                          className="flex-1 bg-brand-green hover:bg-brand-green-light text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Site
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16 bg-white p-12 rounded-xl shadow-lg"
            >
              <h3 className="text-3xl font-bold text-brand-green mb-6">
                Ready to Create Your NGO's Website?
              </h3>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Choose a template that resonates with your mission and let's customize it to tell your unique story.
              </p>
              <Button 
                onClick={() => navigate('/wizard')}
                size="lg"
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4"
              >
                Start Building Your Website
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
