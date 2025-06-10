import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the page you're looking for. But don't worry! 
            We're here to help you get back on track.
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-6 text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Homepage
            </Button>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-2">Or explore our services:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate('/pricing')}
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  View Pricing
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/portfolio')}
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  See Our Work
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-green/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-brand-green mb-3">
            Special Offer for NGOs!
          </h3>
          <p className="text-gray-700 mb-4">
            Get your NGO website at 50% off! Starting at just ₹1,999.
            Limited time offer for the first 50 NGOs.
          </p>
          <Button
            onClick={() => navigate('/wizard')}
            className="bg-brand-green hover:bg-brand-green-light text-white"
          >
            Claim Your Offer
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
