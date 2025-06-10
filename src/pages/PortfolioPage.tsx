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
  description: string;
  createdAt: string;
}

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

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
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(websitesData.map(website => website.category)));
        setCategories(uniqueCategories);
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
    : websites.filter(website => website.category === filter);

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
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
                xplore our portfolio of custom websites, built to demonstrate our capabilities. Use these projects as inspiration for the unique digital experience we can create for your NGO.
              </motion.p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
                className={filter === 'all' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
              >
                All Case Studies
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setFilter(category)}
                  variant={filter === category ? 'default' : 'outline'}
                  className={filter === category ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
                >
                  {formatCategory(category)}
                </Button>
              ))}
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
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-brand-green mb-2">
                        {formatCategory(website.category)}
                      </h3>
                      {website.description && (
                        <p className="text-gray-600 mb-4">
                          {website.description}
                        </p>
                      )}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleViewWebsite(website)}
                          className="flex-1 bg-brand-green hover:bg-brand-green-light text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Case Study
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
                Let's work together to create a digital presence that amplifies your impact and tells your unique story.
              </p>
              <Button 
                onClick={() => navigate('/wizard')}
                size="lg"
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4"
              >
                Start Your Project
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
