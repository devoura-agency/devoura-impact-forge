import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Leaf, Users, Shield, Building } from 'lucide-react';

const templates = [
  { id: 'education', title: 'Education NGOs', icon: GraduationCap, color: 'bg-blue-500' },
  { id: 'women-empowerment', title: 'Women Empowerment', icon: Heart, color: 'bg-pink-500' },
  { id: 'wildlife', title: 'Wildlife Conservation', icon: Leaf, color: 'bg-green-500' },
  { id: 'social-welfare', title: 'Social Welfare', icon: Users, color: 'bg-purple-500' },
  { id: 'healthcare', title: 'Healthcare', icon: Shield, color: 'bg-red-500' },
  { id: 'disaster-relief', title: 'Disaster Relief', icon: Building, color: 'bg-orange-500' },
];

const packages = [
  { id: 'starter', name: 'Starter', color: 'from-green-400 to-green-600', price: '₹3,000 – ₹5,000', features: ['Static pages (Home, About, Projects, Contact)', 'Responsive Design', '3 – 5 Days Delivery'] },
  { id: 'pro', name: 'Pro', color: 'from-blue-400 to-blue-600', price: '₹5,000 – ₹7,500', features: ['All Starter features', 'Contact/Volunteer Form with Email Integration', '4 – 6 Days Delivery'] },
  { id: 'impact', name: 'Impact Pack', color: 'from-yellow-400 to-yellow-600', price: '₹10,000 – ₹15,000', features: ['All Pro features', 'Dynamic website, Admin panel', 'Donation/payment gateway', '7 – 10 Days Delivery'] },
  { id: 'super', name: 'Super Pack', color: 'from-purple-400 to-purple-600', price: '₹15,000 – ₹25,000+', features: ['All Impact Pack features', 'Fully manageable website (CMS)', 'Login/signup, uploads, admin dashboard', '10 – 15 Days Delivery'] },
];

const maintenance = [
  { id: 'quarterly', name: 'Quarterly', color: 'from-gray-200 to-gray-400', price: '₹1,000 – ₹2,000', features: ['1 backup/month', '2 small changes/month', 'Uptime checks'] },
  { id: 'half-yearly', name: 'Half-Yearly', color: 'from-blue-200 to-blue-400', price: '₹2,000 – ₹3,500', features: ['2 backups/month', '3 changes/month', 'Performance optimization'] },
  { id: 'yearly', name: 'Yearly', color: 'from-green-200 to-green-400', price: '₹4,000 – ₹6,000', features: ['24/7 support', 'Regular updates', 'Security patches', 'Free hosting*'] },
  { id: 'no-maintenance', name: 'No Maintenance', color: 'from-gray-100 to-gray-300', price: '₹0', features: ['No maintenance plan', 'Only website building'] },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SelectPlanPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const selectedTemplateId = query.get('template');
  const selectedTemplate = useMemo(() => templates.find(t => t.id === selectedTemplateId), [selectedTemplateId]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedTemplate && selectedPackage && selectedMaintenance) {
      // Pass preferences to next step (e.g., contact form or summary)
      navigate(`/contact?template=${selectedTemplate.id}&package=${selectedPackage}&maintenance=${selectedMaintenance}`);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-start pt-24 pb-16"
    >
      <div className="w-full max-w-5xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-8 text-center">
          Select Your Plan
        </h1>
        {selectedTemplate && (
          <div className="flex flex-col items-center mb-12">
            <div className={`w-16 h-16 ${selectedTemplate.color} rounded-full flex items-center justify-center mb-4`}>
              <selectedTemplate.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-brand-green mb-2">{selectedTemplate.title}</h2>
          </div>
        )}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-brand-green mb-6 text-center">Choose a Website Package</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                className={`rounded-2xl shadow-xl bg-gradient-to-br ${plan.color} text-white p-8 flex flex-col items-center cursor-pointer border-4 ${selectedPackage === plan.id ? 'border-brand-gold' : 'border-transparent'}`}
                onClick={() => setSelectedPackage(plan.id)}
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
        </div>
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-brand-green mb-6 text-center">Choose a Maintenance Plan</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {maintenance.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                className={`rounded-2xl shadow-xl bg-gradient-to-br ${plan.color} text-brand-green-dark p-8 flex flex-col items-center cursor-pointer border-4 ${selectedMaintenance === plan.id ? 'border-brand-gold' : 'border-transparent'}`}
                onClick={() => setSelectedMaintenance(plan.id)}
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
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-4 text-lg font-bold rounded-xl shadow-lg disabled:opacity-50"
            disabled={!selectedPackage || !selectedMaintenance}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </motion.main>
  );
};

export default SelectPlanPage; 