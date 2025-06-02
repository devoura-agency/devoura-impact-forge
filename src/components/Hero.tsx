
import { Button } from '@/components/ui/button';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
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
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-green mb-6 leading-tight">
              Elevate Your NGO's <span className="text-brand-gold">Digital Impact</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional websites that drive donations, engage volunteers, and amplify your mission. 
              Built specifically for NGOs who want to make a real difference online.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-cream">
                <div className="text-2xl font-bold text-brand-green mb-1">50%</div>
                <p className="text-gray-600 text-sm">Increase in donations</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-cream">
                <div className="text-2xl font-bold text-brand-green mb-1">24/7</div>
                <p className="text-gray-600 text-sm">AI-powered engagement</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-cream">
                <div className="text-2xl font-bold text-brand-green mb-1">100%</div>
                <p className="text-gray-600 text-sm">Accessibility compliant</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg font-semibold"
              >
                Get Free Consultation
              </Button>
              <Button 
                onClick={() => scrollToSection('templates')}
                variant="outline"
                size="lg"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 text-lg"
              >
                View Templates
              </Button>
            </div>
          </div>

          {/* Diagonal Scrolling Showcase */}
          <div className="relative mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
                See Our Work in Action
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our carefully crafted websites designed specifically for different types of NGOs
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/* First Row - Left to Right */}
              <div 
                ref={scrollRef}
                className="flex gap-6 mb-6 overflow-hidden"
                style={{ transform: 'rotate(-2deg)' }}
              >
                {[...websites, ...websites].map((site, index) => (
                  <div
                    key={`row1-${index}`}
                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                    onClick={() => window.open(site.url, '_blank')}
                  >
                    <div className="aspect-video bg-gradient-to-br from-brand-green to-brand-green-light rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="text-white text-center z-10">
                        <h3 className="font-semibold text-lg mb-1">{site.name}</h3>
                        <p className="text-sm opacity-90">{site.category}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">{site.description}</p>
                      <div className="mt-3 text-brand-green text-sm font-medium group-hover:underline">
                        View Live Site →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row - Right to Left */}
              <div 
                className="flex gap-6 overflow-hidden"
                style={{ 
                  transform: 'rotate(2deg)',
                  animation: 'slide-in-right 20s linear infinite reverse'
                }}
              >
                {[...websites].reverse().concat([...websites].reverse()).map((site, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                    onClick={() => window.open(site.url, '_blank')}
                  >
                    <div className="aspect-video bg-gradient-to-br from-brand-gold to-yellow-600 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="text-white text-center z-10">
                        <h3 className="font-semibold text-lg mb-1">{site.name}</h3>
                        <p className="text-sm opacity-90">{site.category}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">{site.description}</p>
                      <div className="mt-3 text-brand-green text-sm font-medium group-hover:underline">
                        View Live Site →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => scrollToSection('templates')}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                Explore All Templates
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center animate-bounce">
            <button 
              onClick={() => scrollToSection('why-ngos')}
              className="text-brand-green hover:text-brand-green-light transition-colors"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
