import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Leaf, Users, Shield, Building } from 'lucide-react';
import Header from '@/components/Header';

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

const steps = [
  'Choose Template',
  'Choose Website Package',
  'Choose Maintenance Plan',
  'Contact Details',
];

const stepInstructions = [
  'Select the type of NGO template you want to start with. This helps us tailor the experience to your mission.',
  'Pick the website package that best fits your needs and budget.',
  'Choose a maintenance plan, or select "No Maintenance" if you only want the website built.',
  'Enter your contact details so we can reach out and start your project!'
];

const WebsiteWizard = () => {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', org: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const canNext =
    (step === 0 && selectedTemplate) ||
    (step === 1 && selectedPackage) ||
    (step === 2 && selectedMaintenance) ||
    (step === 3 && contact.name && contact.email && contact.org);

  const handleNext = async () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setSubmitting(true);
      // Send email using mailto as fallback (for demo)
      const subject = encodeURIComponent('New Website Inquiry from Devoura Wizard');
      const body = encodeURIComponent(
        `Template: ${selectedTemplate}\nPackage: ${selectedPackage}\nMaintenance: ${selectedMaintenance}\nName: ${contact.name}\nEmail: ${contact.email}\nOrganization: ${contact.org}`
      );
      window.location.href = `mailto:devoura.agency@gmail.com?subject=${subject}&body=${body}`;
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        setTimeout(() => navigate('/'), 3000);
      }, 2000);
    }
  };
  const handleBack = () => setStep(Math.max(0, step - 1));

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-start pt-32 pb-16">
        {/* Progress Bar */}
        <div className="w-full max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${i <= step ? 'bg-brand-green' : 'bg-gray-300'}`}>{i + 1}</div>
                <span className={`text-xs mt-2 ${i === step ? 'text-brand-green font-bold' : 'text-gray-500'}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-2 bg-brand-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
        {/* Step Content */}
        <div className="w-full max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-lg text-brand-green font-medium mb-8">
            {stepInstructions[step]}
          </motion.p>
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {templates.map((t, idx) => (
                  <motion.div
                    key={t.id}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                    className={`rounded-2xl shadow-xl bg-white p-8 flex flex-col items-center cursor-pointer border-4 ${selectedTemplate === t.id ? 'border-brand-gold' : 'border-transparent'}`}
                    onClick={() => setSelectedTemplate(t.id)}
                  >
                    <div className={`w-16 h-16 ${t.color} rounded-full flex items-center justify-center mb-4`}>
                      <t.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-green mb-2">{t.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {packages.map((plan, idx) => (
                  <motion.div
                    key={plan.id}
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
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {maintenance.map((plan, idx) => (
                  <motion.div
                    key={plan.id}
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
            </motion.div>
          )}
          {step === 3 && !submitted && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    value={contact.name}
                    onChange={e => setContact({ ...contact, name: e.target.value })}
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    placeholder="you@email.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Organization</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    value={contact.org}
                    onChange={e => setContact({ ...contact, org: e.target.value })}
                    placeholder="Your NGO Name"
                  />
                </div>
              </div>
            </motion.div>
          )}
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-brand-green mb-4">Thank you for your submission!</h2>
              <p className="text-lg text-gray-700 mb-4">We have received your details and will contact you soon.</p>
              <p className="text-gray-500">Redirecting to homepage...</p>
            </motion.div>
          )}
        </div>
        {/* Navigation Buttons */}
        {!submitted && (
          <div className="flex justify-between w-full max-w-3xl mx-auto mt-8">
            <Button
              onClick={handleBack}
              disabled={step === 0 || submitting}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canNext || submitting}
              className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-3 text-lg font-bold rounded-lg shadow-lg disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : step === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebsiteWizard; 