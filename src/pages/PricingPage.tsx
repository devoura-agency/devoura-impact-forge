
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plans = [
  {
    name: 'Starter',
    color: 'from-green-400 to-green-600',
    price: '₹3,000 – ₹5,000',
    features: [
      'Static pages (Home, About, Projects, Contact)',
      'Responsive Design',
      '3 – 5 Days Delivery',
    ],
  },
  {
    name: 'Pro',
    color: 'from-blue-400 to-blue-600',
    price: '₹5,000 – ₹7,500',
    features: [
      'All Starter features',
      'Contact/Volunteer Form with Email Integration',
      '4 – 6 Days Delivery',
    ],
  },
  {
    name: 'Impact Pack',
    color: 'from-yellow-400 to-yellow-600',
    price: '₹10,000 – ₹15,000',
    features: [
      'All Pro features',
      'Dynamic website, Admin panel',
      'Donation/payment gateway',
      '7 – 10 Days Delivery',
    ],
  },
  {
    name: 'Super Pack',
    color: 'from-purple-400 to-purple-600',
    price: '₹15,000 – ₹25,000+',
    features: [
      'All Impact Pack features',
      'Fully manageable website (CMS)',
      'Login/signup, uploads, admin dashboard',
      '10 – 15 Days Delivery',
    ],
  },
];

const maintenance = [
  {
    name: 'Quarterly',
    color: 'from-gray-200 to-gray-400',
    price: '₹1,000 – ₹2,000',
    features: [
      '1 backup/month',
      '2 small changes/month',
      'Uptime checks',
    ],
  },
  {
    name: 'Half-Yearly',
    color: 'from-blue-200 to-blue-400',
    price: '₹2,000 – ₹3,500',
    features: [
      '2 backups/month',
      '3 changes/month',
      'Performance optimization',
    ],
  },
  {
    name: 'Yearly',
    color: 'from-green-200 to-green-400',
    price: '₹4,000 – ₹6,000',
    features: [
      '24/7 support',
      'Regular updates',
      'Security patches',
      'Free hosting*',
    ],
  },
];

const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-24 pb-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
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

            <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-8 text-center">
              Website Development Packages
            </h1>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
              Choose the plan that fits your mission and scale. All packages are crafted for NGOs and social impact organizations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring' }}
                  className={`rounded-2xl shadow-xl bg-gradient-to-br ${plan.color} text-white p-8 flex flex-col items-center`}
                >
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <div className="text-3xl font-extrabold mb-4">{plan.price}</div>
                  <ul className="mb-6 space-y-2 text-base">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-lg">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-brand-green mb-8 text-center">Website Maintenance Plans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {maintenance.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring' }}
                  className={`rounded-2xl shadow-xl bg-gradient-to-br ${plan.color} text-brand-green-dark p-8 flex flex-col items-center`}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-extrabold mb-4">{plan.price}</div>
                  <ul className="mb-6 space-y-2 text-base">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-lg">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Single CTA Button */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-brand-green p-12 rounded-xl text-white"
              >
                <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Let's discuss your NGO's needs and find the perfect package for your mission. 
                  Our team will guide you through the entire process.
                </p>
                <Button 
                  onClick={() => navigate('/wizard')}
                  size="lg"
                  className="bg-white text-brand-green hover:bg-gray-100 px-12 py-4 text-lg font-bold"
                >
                  Start Your Project
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default PricingPage; 
