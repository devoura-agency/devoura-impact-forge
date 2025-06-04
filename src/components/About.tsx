
import { Heart, Users, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-brand-cream to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Why Choose Devoura?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're not just web developers—we're passionate advocates for your cause, 
              dedicated to amplifying your impact through powerful digital storytelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-green mb-3">NGO-Focused Design</h3>
              <p className="text-gray-600">
                Every element designed specifically for nonprofit organizations and social impact.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-green mb-3">Donation Optimization</h3>
              <p className="text-gray-600">
                Proven strategies that increase online donations and volunteer engagement.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-green mb-3">Global Impact</h3>
              <p className="text-gray-600">
                Websites that reach supporters worldwide and amplify your message globally.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-green mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Track record of increasing NGO visibility and supporter engagement.
              </p>
            </div>
          </div>

          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brand-green mb-4">
              Our Mission Started with One Conversation
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              A chance encounter with an NGO struggling to share their incredible work online sparked our journey. 
              Today, we're dedicated to ensuring no meaningful cause goes unheard in the digital world.
            </p>
            <Button 
              onClick={() => navigate('/story')}
              className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-3"
            >
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
