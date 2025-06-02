import { Button } from '@/components/ui/button';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const websites = [
    {
      name: "EduCare Foundation",
      url: "https://educare-foundation-ngo.vercel.app/",
      image: "/api/placeholder/400/300",
      category: "Education",
      description: "Empowering education for all"
    },
    {
      name: "Wildlife Hope",
      url: "https://wildlife-hope-ngo.vercel.app/",
      image: "/api/placeholder/400/300",
      category: "Wildlife",
      description: "Protecting wildlife habitats"
    },
    {
      name: "Future Bright Girls",
      url: "https://future-bright-girls-ngo.vercel.app/",
      image: "/api/placeholder/400/300",
      category: "Women Empowerment",
      description: "Brightening futures for girls"
    },
    {
      name: "Seva Bharat",
      url: "https://seva-bharat-ngo.vercel.app/",
      image: "/api/placeholder/400/300",
      category: "Community Service",
      description: "Serving communities across India"
    },
    {
      name: "Wildlife Legacy",
      url: "https://wildlife-legacy-ngo.vercel.app/",
      image: "/api/placeholder/400/300",
      category: "Conservation",
      description: "Preserving nature's legacy"
    },
    {
      name: "Jeevan Safar Sangam",
      url: "https://jeevan-safar-sangam-ngo.vercel.app/",
      image: "/api/placeholder/400/300",
      category: "Healthcare",
      description: "Healthcare for everyone"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let frame: number;
    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    function animateScroll() {
      if (!scrollContainer) return;
      scrollAmount += scrollSpeed;
      if (scrollAmount > scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      frame = requestAnimationFrame(animateScroll);
    }
    frame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-scroll effect for top and bottom rows in opposite directions
  useEffect(() => {
    const top = topRowRef.current;
    const bottom = bottomRowRef.current;
    let frame: number;
    let topScroll = 0;
    let bottomScroll = 0;
    const speed = 0.7;
    function animateScroll() {
      if (top) {
        topScroll += speed;
        if (topScroll > top.scrollWidth - top.clientWidth) topScroll = 0;
        top.scrollLeft = topScroll;
      }
      if (bottom) {
        bottomScroll -= speed;
        if (bottomScroll < 0) bottomScroll = bottom.scrollWidth - bottom.clientWidth;
        bottom.scrollLeft = bottomScroll;
      }
      frame = requestAnimationFrame(animateScroll);
    }
    frame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-brand-cream to-white pt-20 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-green mb-6 leading-tight"
            >
              Elevate Your NGO's <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-brand-gold inline-block"
              >Digital Impact</motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Professional websites that drive donations, engage volunteers, and amplify your mission. 
              Built specifically for NGOs who want to make a real difference online.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
            >
              {[
                { value: "50%", label: "Increase in donations" },
                { value: "24/7", label: "AI-powered engagement" },
                { value: "100%", label: "Accessibility compliant" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-brand-cream hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl font-bold text-brand-green mb-1">{stat.value}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg font-semibold"
                >
                  Get Free Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('templates')}
                  variant="outline"
                  size="lg"
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 text-lg"
                >
                  View Templates
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Website Showcase with two tilted, auto-scrolling rows */}
          <div className="relative mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
                See Our Work in Action
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our carefully crafted websites designed specifically for different types of NGOs
              </p>
            </motion.div>

            {/* Top Row: right-tilted, scrolls left-to-right */}
            <div
              ref={topRowRef}
              className="flex gap-10 overflow-x-auto no-scrollbar py-6"
              style={{
                transform: 'rotate(0deg)',
                WebkitOverflowScrolling: 'touch',
                marginLeft: '-20vw',
                marginRight: '-20vw',
                paddingLeft: '20vw',
                paddingRight: '20vw',
              }}
            >
              {[...websites, ...websites].map((site, idx) => (
                <motion.div
                  key={`top-${site.url}-${idx}`}
                  className="flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden"
                  style={{
                    width: 480,
                    height: 300,
                  }}
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="w-full" style={{ height: 270, background: '#e5e7eb' }}>
                    <iframe
                      src={site.url}
                      title={site.name}
                      width="100%"
                      height="100%"
                      style={{
                        width: '480px',
                        height: '270px',
                        border: 0,
                        pointerEvents: 'auto',
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
                      }}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-brand-green">{site.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{site.category}</p>
                    <p className="text-gray-600 text-xs mb-3">{site.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row: left-tilted, scrolls right-to-left */}
            <div
              ref={bottomRowRef}
              className="flex gap-10 overflow-x-auto no-scrollbar py-6 mt-[-40px]"
              style={{
                transform: 'rotate(-0deg)',
                marginTop: '4vw',
                WebkitOverflowScrolling: 'touch',
                marginLeft: '-20vw',
                marginRight: '-20vw',
                paddingLeft: '20vw',
                paddingRight: '20vw',
              }}
            >
              {[...websites.slice().reverse(), ...websites.slice().reverse()].map((site, idx) => (
                <motion.div
                  key={`bottom-${site.url}-${idx}`}
                  className="flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden"
                  style={{
                    width: 480,
                    height: 300,
                  }}
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="w-full" style={{ height: 270, background: '#e5e7eb' }}>
                    <iframe
                      src={site.url}
                      title={site.name}
                      width="100%"
                      height="100%"
                      style={{
                        width: '480px',
                        height: '270px',
                        border: 0,
                        pointerEvents: 'auto',
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
                      }}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-brand-green">{site.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{site.category}</p>
                    <p className="text-gray-600 text-xs mb-3">{site.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection('why-ngos')}
              className="text-brand-green hover:text-brand-green-light transition-colors"
            >
              <ArrowDown size={32} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
