
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeneralContactForm from '@/components/GeneralContactForm';

const GeneralContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
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
              <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
                Get In Touch With Us
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Have questions about our services? Want to discuss your NGO's digital needs? 
                We're here to help you amplify your mission online.
              </p>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <GeneralContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GeneralContactPage;
