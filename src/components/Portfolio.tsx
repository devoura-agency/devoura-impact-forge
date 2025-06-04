
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, GraduationCap, Leaf } from 'lucide-react';

const Portfolio = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-brand-cream to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 
          Commented out for now since we haven't created websites for clients yet
          Will be enabled in the future
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Stories of Impact
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our work transforms NGO missions into digital success stories. Here's how we've helped organizations amplify their impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-brand-green">Education NGO Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Designed a vibrant website with an AI chatbot to answer donor FAQs, 
                  increasing engagement by 20% and streamlining the donation process.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engagement Increase</span>
                    <span className="text-sm font-semibold text-brand-green">+20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Donation Conversion</span>
                    <span className="text-sm font-semibold text-brand-green">+15%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-brand-green">Environmental NGO Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Built a fast, SEO-optimized site with integrated donation platform, 
                  boosting organic traffic by 15% and improving volunteer recruitment.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Organic Traffic</span>
                    <span className="text-sm font-semibold text-brand-green">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Volunteer Sign-ups</span>
                    <span className="text-sm font-semibold text-brand-green">+25%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          </div>
          */}

          <div className="text-center bg-white p-12 rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold text-brand-green mb-6">Your NGO's Story</h3>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Ready to create your own success story? Let's build a website that amplifies your impact 
              and connects you with supporters worldwide.
            </p>
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
