import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Leaf, Users, Shield, Building, ArrowLeft, ArrowRight, ExternalLink, Palette, Accessibility, Clock, Droplet, Baby, Utensils } from 'lucide-react';
import Header from '@/components/Header';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const NGO_CATEGORIES = [
  { id: 'education', title: 'Education NGOs', icon: GraduationCap, color: 'bg-blue-500' },
  { id: 'women-empowerment', title: 'Women Empowerment', icon: Heart, color: 'bg-pink-500' },
  { id: 'wildlife', title: 'Wildlife Conservation', icon: Leaf, color: 'bg-green-500' },
  { id: 'community-service', title: 'Community Service', icon: Users, color: 'bg-purple-500' },
  { id: 'health-and-wellness', title: 'Health & Wellness', icon: Shield, color: 'bg-red-500' },
  { id: 'disaster-management', title: 'Disaster Management', icon: Building, color: 'bg-orange-500' },
  { id: 'disability', title: 'Disability Support', icon: Accessibility, color: 'bg-indigo-500' },
  { id: 'old-age', title: 'Elderly Care', icon: Clock, color: 'bg-amber-500' },
  { id: 'environment-water', title: 'Environment & Water', icon: Droplet, color: 'bg-cyan-500' },
  { id: 'child-welfare', title: 'Child Welfare', icon: Baby, color: 'bg-yellow-500' },
  { id: 'food', title: 'Food Security', icon: Utensils, color: 'bg-emerald-500' },
  { id: 'request-custom', title: 'Request Custom Template', icon: Palette, color: 'bg-gradient-to-br from-brand-green to-brand-gold' },
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
  'Choose a Design',
  'Choose Website Package',
  'Choose Maintenance Plan',
  'Contact Details',
];

const stepInstructions = [
  'Select the type of NGO template you want to start with. This helps us tailor the experience to your mission.',
  'Preview real websites for your chosen category. Select a design or choose a custom website.',
  'Pick the website package that best fits your needs and budget.',
  'Choose a maintenance plan, or select "No Maintenance" if you only want the website built.',
  'Enter your contact details so we can reach out and start your project!'
];

const WebsiteWizard = () => {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', org: '', mobile: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [designIndex, setDesignIndex] = useState(0);
  const [error, setError] = useState(null);
  const [templateLinks, setTemplateLinks] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const canNext =
    (step === 0 && selectedTemplate) ||
    (step === 1 && (selectedDesign || selectedDesign === 'custom')) ||
    (step === 2 && selectedPackage) ||
    (step === 3 && selectedMaintenance) ||
    (step === 4 && contact.name && contact.email && contact.org && contact.mobile);

  const handleBack = () => {
    if (step === 0) {
      navigate('/');
    } else {
      setStep(Math.max(0, step - 1));
    }
  };

  const handleNext = async () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setSubmitting(true);
      setError(null);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contact.name,
            email: contact.email,
            org: contact.org,
            mobile: contact.mobile,
            template: selectedTemplate,
            design: selectedDesign,
            pkg: selectedPackage,
            maintenance: selectedMaintenance,
          }),
        });
        const data = await response.json();
        if (data.message === 'Emails sent successfully') {
          setSubmitting(false);
          setSubmitted(true);
          setTimeout(() => navigate('/'), 3000);
        } else {
          setSubmitting(false);
          setError('There was a problem submitting your request. Please try again.');
        }
      } catch (err) {
        setSubmitting(false);
        setError('There was a problem submitting your request. Please try again.');
      }
    }
  };

  // Restore state if coming back from WebsiteViewer
  useEffect(() => {
    if (location.state && location.state.fromViewer) {
      if (location.state.selectedTemplate) setSelectedTemplate(location.state.selectedTemplate);
      if (location.state.designIndex !== undefined) setDesignIndex(location.state.designIndex);
      if (location.state.step !== undefined) setStep(location.state.step);
    }
    // eslint-disable-next-line
  }, [location.state]);

  // Fetch templates for selected category
  useEffect(() => {
    if (!selectedTemplate) return;
    const fetchTemplates = async () => {
      const q = query(collection(db, 'websites'), where('category', '==', selectedTemplate), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setTemplateLinks(snap.docs.map(doc => ({
        name: doc.data().tag || doc.data().category,
        url: doc.data().link,
      })));
    };
    fetchTemplates();
  }, [selectedTemplate]);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-start pt-32 pb-16">
        {/* Go To Home Button */}
        <div className="w-full max-w-3xl mx-auto mb-4">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
          >
            Go To Home
          </Button>
        </div>

        {/* Form Description */}
        <div className="w-full max-w-3xl mx-auto mb-6 text-center">
          <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-4">
            <p className="text-brand-green font-medium">
              📝 This form helps us understand your NGO's needs so we can create the perfect website for you. 
              Fill out the steps below and we'll contact you to discuss your project!
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center min-w-[80px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${i <= step ? 'bg-brand-green' : 'bg-gray-300'}`}>{i + 1}</div>
                <span className={`text-xs mt-2 text-center ${i === step ? 'text-brand-green font-bold' : 'text-gray-500'}`}>{s}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {NGO_CATEGORIES.map((t, idx) => {
                  const isCustom = t.id === 'request-custom';
                  return (
                    <motion.div
                      key={t.id}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                      className={`rounded-2xl shadow-xl bg-white p-6 flex flex-col items-center cursor-pointer border-4 ${selectedTemplate === t.id ? 'border-brand-gold' : 'border-transparent'} h-full min-h-[200px] ${isCustom ? 'bg-gradient-to-br from-brand-cream to-white' : ''}`}
                      onClick={() => setSelectedTemplate(t.id)}
                    >
                      <div className={`w-16 h-16 ${isCustom ? 'bg-gradient-to-br from-brand-green to-brand-gold' : t.color} rounded-full flex items-center justify-center mb-4`}>
                        <t.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-green mb-2 text-center">{t.title}</h3>
                      {isCustom && (
                        <p className="text-gray-600 text-center text-sm">
                          Need something unique? We'll create a custom design just for your NGO.
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
          {step === 1 && selectedTemplate && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              {templateLinks.length > 0 ? (
                    <div className="flex flex-col items-center">
                  {/* Main Preview */}
                  <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center w-[900px] max-w-full mb-8">
                          <div className="w-full rounded-lg overflow-hidden mb-4 border border-gray-200" style={{height: '480px'}}>
                            <iframe
                        src={templateLinks[designIndex].url}
                        title={templateLinks[designIndex].name}
                              className="w-full h-full border-0 rounded-lg"
                              sandbox="allow-scripts allow-same-origin allow-popups"
                              loading="lazy"
                              style={{minHeight: '480px', maxHeight: '480px'}}
                            />
                          </div>
                    <h4 className="font-semibold text-xl mb-2 text-brand-green">{templateLinks[designIndex].name}</h4>
                          <div className="flex gap-4 mt-2">
                            <Button
                        className={`bg-brand-green hover:bg-brand-green-light text-white px-6 py-2 rounded-lg font-semibold ${selectedDesign === templateLinks[designIndex].url ? 'ring-2 ring-brand-gold' : ''}`}
                        onClick={() => setSelectedDesign(templateLinks[designIndex].url)}
                            >
                              Use This Design
                            </Button>
                            <Button
                              variant="outline"
                              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white flex items-center gap-2"
                        onClick={() => navigate(`/website-viewer?url=${encodeURIComponent(templateLinks[designIndex].url)}&name=${encodeURIComponent(templateLinks[designIndex].name)}`, { state: { fromViewer: true, step, selectedTemplate, designIndex } })}
                            >
                              <ExternalLink className="w-4 h-4" /> View Full
                            </Button>
                          </div>
                        </div>
                  {/* Thumbnails Row */}
                      <div className="flex gap-6 overflow-x-auto py-4 mb-6 w-full justify-center">
                    {templateLinks.map((ex, idx) => (
                          <div
                            key={ex.url}
                        className={`cursor-pointer transition-all duration-200 ${designIndex === idx ? 'transform scale-105 border-4 border-brand-gold' : 'border-2 border-gray-200'} bg-white rounded-xl shadow-lg`}
                        style={{ width: 240, height: 160 }}
                            onClick={() => setDesignIndex(idx)}
                          >
                        <div className="relative h-full w-full">
                                {/* Browser bar */}
                          <div className="h-6 bg-gray-300 flex items-center px-2 gap-1 rounded-t-xl">
                                  <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  </div>
                                  <div className="flex-1 mx-2 h-3 bg-white rounded text-xs"></div>
                                </div>
                                {/* Website preview */}
                          <div className="h-[120px] bg-white relative overflow-hidden rounded-b-xl">
                                  <iframe
                                    src={ex.url}
                                    title={ex.name}
                                    className="w-full h-full border-0 transform scale-50 origin-top-left"
                                    sandbox="allow-scripts allow-same-origin allow-popups"
                                    loading="lazy"
                                    style={{ 
                                      pointerEvents: 'none', 
                                      width: '200%', 
                                      height: '200%',
                                      background: '#f9fafb'
                                    }}
                                  />
                              </div>
                              {/* Website name */}
                              <div className="absolute -bottom-8 left-0 right-0 text-center">
                                <span className={`text-sm font-medium ${designIndex === idx ? 'text-brand-green' : 'text-gray-600'}`}>
                                  {ex.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                  {/* Custom Website Button */}
                      <div className="text-center mt-8">
                        <Button
                          variant="outline"
                          className={`border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3 text-lg font-bold rounded-lg ${selectedDesign === 'custom' ? 'ring-2 ring-brand-gold' : ''}`}
                          onClick={() => setSelectedDesign('custom')}
                        >
                          Custom Website
                        </Button>
                      </div>
                    </div>
              ) : (
                    <div className="text-center">
                      <p className="text-lg text-gray-700 mb-6">No ready-made designs for this category yet.</p>
                      <Button
                        variant="outline"
                        className={`border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3 text-lg font-bold rounded-lg ${selectedDesign === 'custom' ? 'ring-2 ring-brand-gold' : ''}`}
                        onClick={() => setSelectedDesign('custom')}
                      >
                        Custom Website
                      </Button>
                    </div>
              )}
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {packages.map((plan, idx) => {
                  const isSelected = selectedPackage === plan.id;
                  const isAnySelected = !!selectedPackage;
                  const cardColor = !isAnySelected || isSelected ? plan.color + ' text-white' : 'from-gray-200 to-gray-300 text-gray-400';
                  return (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                      className={`rounded-2xl shadow-xl bg-gradient-to-br ${cardColor} p-8 flex flex-col items-center cursor-pointer border-4 ${isSelected ? 'border-brand-gold' : 'border-transparent'}`}
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
                  );
                })}
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {maintenance.map((plan, idx) => {
                  const isSelected = selectedMaintenance === plan.id;
                  const isAnySelected = !!selectedMaintenance;
                  const cardColor = !isAnySelected || isSelected ? plan.color + ' text-brand-green-dark' : 'from-gray-100 to-gray-200 text-gray-400';
                  return (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                      className={`rounded-2xl shadow-xl bg-gradient-to-br ${cardColor} p-8 flex flex-col items-center cursor-pointer border-4 ${isSelected ? 'border-brand-gold' : 'border-transparent'}`}
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
                  );
                })}
              </div>
            </motion.div>
          )}
          {step === 4 && !submitted && (
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
                  <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    value={contact.mobile}
                    onChange={e => setContact({ ...contact, mobile: e.target.value })}
                    placeholder="Your Mobile Number"
                    type="tel"
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
          {error && (
            <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
          )}
        </div>

        {/* Navigation Buttons */}
        {!submitted && (
          <div className="flex justify-between w-full max-w-3xl mx-auto mt-8">
            <Button
              onClick={handleBack}
              disabled={submitting}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {step === 0 ? 'Go to Home' : 'Back'}
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
