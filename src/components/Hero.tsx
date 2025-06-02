
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
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-green mb-8 leading-tight">
            Elevate Your NGO's <span className="text-brand-gold">Digital Impact</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            Professional websites that drive donations, engage volunteers, and amplify your mission. 
            Built specifically for NGOs who want to make a real difference online.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-brand-green mb-2">50%</div>
              <p className="text-gray-600">Increase in donations</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-brand-green mb-2">24/7</div>
              <p className="text-gray-600">AI-powered engagement</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-brand-green mb-2">100%</div>
              <p className="text-gray-600">Accessibility compliant</p>
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
              onClick={() => scrollToSection('portfolio')}
              variant="outline"
              size="lg"
              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-4 text-lg"
            >
              View Our Work
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
