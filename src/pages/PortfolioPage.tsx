import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Website {
  id: string;
  category: string;
  link: string;
  tag: string;
  createdAt: string;
}

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const q = query(collection(db, 'websites'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const websitesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Website[];
        setWebsites(websitesData);
      } catch (error) {
        console.error('Error fetching websites:', error);
      }
    };

    fetchWebsites();
  }, []);

  const handleViewWebsite = (website: Website) => {
    navigate(`/website-viewer?url=${encodeURIComponent(website.link)}&name=${encodeURIComponent(website.category)}`);
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

  const formatCategory = (category: string) => {
    // Convert kebab-case to Title Case and add NGO
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + ' NGO';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Go To Home Button */}
            <div className="mb-6">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Go To Home
              </Button>
            </div>

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
                      {/* Live iframe preview */}
                      <div className="h-48 relative overflow-hidden bg-gray-100">
                        <iframe
                          src={website.link}
                          title={website.category}
                          className="w-full h-full border-0 transform scale-50 origin-top-left pointer-events-none"
                          style={{ 
                            width: '200%', 
                            height: '200%',
                            pointerEvents: 'none'
                          }}
                          loading="lazy"
                        />
                        {/* Overlay for click protection */}
                        <div className="absolute inset-0 bg-transparent"></div>
                      </div>
                      <Badge className={`absolute top-4 right-4 ${getTagColor(website.tag)}`}>
                        {website.tag}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-brand-green mb-2">
                        {formatCategory(website.category)}
                      </h3>
                      
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
