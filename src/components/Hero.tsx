
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const websites = [
  {
    title: "EduCare Foundation",
    category: "Education NGO",
    url: "https://educare-foundation-ngo.vercel.app/",
    image: "/placeholder.svg"
  },
  {
    title: "Empowering Women",
    category: "Women's Rights",
    url: "https://empowering-women-ngo.vercel.app/",
    image: "/placeholder.svg"
  },
  {
    title: "Wildlife Hope",
    category: "Wildlife Conservation",
    url: "https://wildlife-hope-ngo.vercel.app/",
    image: "/placeholder.svg"
  },
  {
    title: "Future Bright Girls",
    category: "Girl Child Education",
    url: "https://future-bright-girls-ngo.vercel.app/",
    image: "/placeholder.svg"
  },
  {
    title: "Seva Bharat",
    category: "Community Service",
    url: "https://seva-bharat-ngo.vercel.app/",
    image: "/placeholder.svg"
  },
  {
    title: "Jeevan Safar Sangam",
    category: "Health & Wellness",
    url: "https://jeevan-safar-sangam-ngo.vercel.app/",
    image: "/placeholder.svg"
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWebsiteClick = (website: typeof websites[0]) => {
    navigate(`/website-viewer?url=${encodeURIComponent(website.url)}&name=${encodeURIComponent(website.title)}`);
  };

  const handleStartProject = () => {
    navigate('/wizard');
  };

  const handleExploreWork = () => {
    navigate('/portfolio');
  };

  const handleManualScroll = (e: React.WheelEvent) => {
    setIsManualScroll(true);
    setScrollY(prev => {
      const newY = prev + e.deltaY * 0.5;
      return Math.max(-200, Math.min(200, newY));
    });
    
    // Reset auto-scroll after 3 seconds of no manual scrolling
    setTimeout(() => {
      setIsManualScroll(false);
    }, 3000);
  };

  useEffect(() => {
    if (!isManualScroll) {
      setScrollY(0);
    }
  }, [isManualScroll]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-cream to-white">
      {/* Professional Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4A6741" strokeWidth="1"/>
            </pattern>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#4A6741"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-brand-green/10 rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-brand-gold/10 rotate-45"
          animate={{ y: [0, 20, 0], rotate: [45, 225, 405] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-brand-green/10 rounded-full"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering
              <span className="text-brand-green block">NGOs</span>
              <span className="text-brand-gold">Digitally</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We create powerful, professional websites that help NGOs amplify their impact, 
              reach more supporters, and drive meaningful change in communities worldwide.
            </p>
            
            {/* Key Metrics */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-brand-green mb-4">Our Goal</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <Users className="w-5 h-5 text-brand-green" />
                  <span className="font-semibold text-gray-800">500+ NGOs</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <Globe className="w-5 h-5 text-brand-green" />
                  <span className="font-semibold text-gray-800">50+ Countries</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <Award className="w-5 h-5 text-brand-green" />
                  <span className="font-semibold text-gray-800">99% Success</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={handleStartProject}
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleExploreWork}
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 text-lg"
              >
                View Our Work
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Website Showcase */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green/5 to-brand-gold/5 p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
              
              {/* Scrolling Website Cards */}
              <div 
                className="relative h-full cursor-pointer"
                onWheel={handleManualScroll}
                title="Scroll to control manually or let it auto-scroll"
              >
                <motion.div
                  className="absolute inset-0 flex flex-col gap-4"
                  animate={!isManualScroll ? { y: [0, -100, 0] } : { y: scrollY }}
                  transition={!isManualScroll ? { duration: 15, repeat: Infinity, ease: "linear" } : { duration: 0.1 }}
                >
                  {[...websites, ...websites].map((website, index) => (
                    <motion.div
                      key={index}
                      className="group block cursor-pointer"
                      onClick={() => handleWebsiteClick(website)}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-green-light rounded-lg flex items-center justify-center">
                            <Globe className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">
                              {website.title}
                            </h3>
                            <p className="text-sm text-gray-600">{website.category}</p>
                            <div className="mt-2 text-xs text-brand-green font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to explore →
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Gradient overlays for smooth effect */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
            </div>

            {/* Call to action overlay */}
            <div className="absolute top-4 right-4 bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Click to explore
            </div>
            
            {/* Manual scroll hint */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-brand-green px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              💡 Scroll to control manually
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-brand-green rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-green rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
