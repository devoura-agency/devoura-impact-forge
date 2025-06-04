
import { Heart, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WhyNGOs = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="why-ngos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-green text-center mb-16">
            Why NGOs Need a Website
          </h2>
          
          <div className="text-lg text-gray-700 mb-12 text-center">
            <p className="mb-6">
              From that pivotal conversation, we learned NGOs face unique challenges: limited budgets, 
              scattered audiences, and the need to inspire action. A website solves this by:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 rounded-lg bg-brand-cream hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-green mb-4">Reaching Donors</h3>
              <p className="text-gray-700">
                A user-friendly site with integrated donation platforms makes giving effortless 
                and increases donor engagement.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-brand-cream hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-green mb-4">Engaging Volunteers</h3>
              <p className="text-gray-700">
                Clear calls-to-action and compelling content attract passionate supporters 
                and build lasting communities.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-brand-cream hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-green mb-4">Sharing Your Story</h3>
              <p className="text-gray-700">
                Stunning designs and accessible content bring your mission to life 
                and amplify your impact globally.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/portfolio')}
                className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-3"
              >
                See Our Work Portfolio
              </Button>
              <Button 
                onClick={() => navigate('/wizard')}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNGOs;
