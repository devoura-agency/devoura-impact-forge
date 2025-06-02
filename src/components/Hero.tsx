
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream to-white pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-green mb-8 leading-tight">
            A Story of <span className="text-brand-gold">Impact</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            <p className="mb-6">
              It all started with a single conversation. We met an NGO struggling to share their mission with the world. 
              They had a powerful cause but no platform to reach donors, volunteers, or communities online.
            </p>
            <p className="mb-6">
              That moment changed everything. We realized a website isn't just code—it's a bridge connecting NGOs 
              to those who believe in their vision.
            </p>
            <p className="text-brand-green font-semibold text-2xl md:text-3xl">
              At Devoura, we're on a mission to build websites that elevate your online presence, 
              making your cause accessible, engaging, and unstoppable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg font-semibold"
            >
              Get a Free Consultation
            </Button>
            <Button 
              onClick={() => scrollToSection('portfolio')}
              variant="outline"
              size="lg"
              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 text-lg"
            >
              See Our Work
            </Button>
          </div>

          <div className="animate-bounce">
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
