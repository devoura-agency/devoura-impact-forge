import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Hero = () => {
  const navigate = useNavigate();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [caseStudies, setCaseStudies] = useState<{ name: string; url: string; category: string }[]>([]);

  useEffect(() => {
    // Fetch case studies from Firestore
    const fetchCaseStudies = async () => {
      const q = query(collection(db, 'websites'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({
        name: doc.data().category,
        url: doc.data().link,
        category: doc.data().category
      }));
      setCaseStudies(data);
    };
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    if (caseStudies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentCaseIndex((prev) => (prev + 1) % caseStudies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [caseStudies]);

  const handleCaseStudyClick = () => {
    if (!caseStudies.length) return;
    const currentCase = caseStudies[currentCaseIndex];
    navigate(`/website-viewer?url=${encodeURIComponent(currentCase.url)}&name=${encodeURIComponent(currentCase.name)}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!caseStudies.length) {
    return (
      <section className="pt-32 pb-20 bg-gradient-to-br from-brand-cream via-white to-brand-gold/10 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center py-24">
            <div className="text-2xl text-brand-green font-semibold mb-4">Loading case studies...</div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-brand-cream via-white to-brand-gold/10 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 to-transparent"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-medium"
                >
                  ✨ Empowering NGOs Digitally
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                >
                  Your Mission
                  <span className="text-brand-green block">Deserves a</span>
                  <span className="text-brand-gold">Digital Voice</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-700 leading-relaxed max-w-2xl"
                >
                  We create powerful, professional websites that help NGOs amplify their impact, reach more supporters, and drive meaningful change in communities worldwide.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  onClick={() => navigate('/wizard')}
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => navigate('/portfolio')}
                  variant="outline" 
                  size="lg"
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 rounded-full transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  View Case Studies
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">Our Goal</div>
                  <div className="text-sm text-gray-600">Aspiring to serve</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">500+</div>
                  <div className="text-sm text-gray-600">NGOs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">50+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">99%</div>
                  <div className="text-sm text-gray-600">Success</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Interactive Case Study Preview */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="relative bg-white rounded-2xl shadow-2xl p-6 border border-brand-cream cursor-pointer hover:shadow-3xl transition-shadow"
                onClick={handleCaseStudyClick}
              >
                {/* Monitor-style header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-100 h-6 rounded ml-4 flex items-center px-3 text-sm text-gray-600">
                    {caseStudies[currentCaseIndex].name}
                  </div>
                </div>
                
                {/* Live website iframe */}
                <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                  <iframe
                    src={caseStudies[currentCaseIndex].url}
                    className="w-full h-full border-0 transform scale-75 origin-top-left pointer-events-none"
                    style={{ 
                      width: '133.33%', 
                      height: '133.33%',
                    }}
                    title={caseStudies[currentCaseIndex].name}
                  />
                  {/* Click overlay */}
                  <div className="absolute inset-0 bg-transparent hover:bg-brand-green/10 transition-colors flex items-center justify-center">
                    <div className="bg-brand-green/80 text-white px-4 py-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                      View Case Study
                    </div>
                  </div>
                </div>

                {/* Case Study indicator dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {caseStudies.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentCaseIndex ? 'bg-brand-green' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-brand-green text-white p-3 rounded-full shadow-lg"
                >
                  ❤️
                </motion.div>
                
                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-brand-gold text-white p-3 rounded-full shadow-lg"
                >
                  🌟
                </motion.div>
              </div>

              {/* Additional floating stats */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-10 -left-10 bg-white rounded-lg shadow-lg p-4 border border-brand-cream"
              >
                <div className="text-xs text-gray-600">Donations Increased</div>
                <div className="text-lg font-bold text-brand-green">+156%</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-10 -right-10 bg-white rounded-lg shadow-lg p-4 border border-brand-cream"
              >
                <div className="text-xs text-gray-600">Volunteer Sign-ups</div>
                <div className="text-lg font-bold text-brand-green">+89%</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              <span className="text-brand-green font-medium">Ready to amplify your impact?</span> 
              <br />Join hundreds of NGOs worldwide who trust us to tell their story online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <span className="text-sm text-gray-500">👇 No hassle, just results</span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>✅ Quick Setup</span>
                <span>✅ Professional Design</span>
                <span>✅ Ongoing Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
