import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Rocket, Sparkles, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    phone: '',
    ngoType: '',
    currentWebsite: '',
    budget: '',
    timeline: '',
    goals: '',
    challenges: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Consultation form submitted:', formData);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        phone: '',
        ngoType: '',
        currentWebsite: '',
        budget: '',
        timeline: '',
        goals: '',
        challenges: '',
        preferredDate: '',
        preferredTime: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-white shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-green to-brand-green-light text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Rocket className="w-6 h-6" />
            <CardTitle>Ready to Make Your Mission Unstoppable?</CardTitle>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/90 mt-2"
          >
            Join us to elevate your online presence and amplify your impact. Let's create something extraordinary together!
          </motion.p>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-8"
              >
                <Sparkles className="w-16 h-16 text-brand-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-green mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your request and will contact you shortly to schedule your consultation.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      required
                      className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      required
                      className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                    <Input 
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your NGO name"
                      required
                      className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">NGO Type *</label>
                    <select 
                      name="ngoType"
                      value={formData.ngoType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="education">Education</option>
                      <option value="women-empowerment">Women Empowerment</option>
                      <option value="wildlife">Wildlife Conservation</option>
                      <option value="social-welfare">Social Welfare</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="disaster-relief">Disaster Relief</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Website (if any)</label>
                  <Input 
                    name="currentWebsite"
                    value={formData.currentWebsite}
                    onChange={handleChange}
                    placeholder="https://your-current-website.com"
                    className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <select 
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    >
                      <option value="">Select budget</option>
                      <option value="under-5k">Under ₹5,000</option>
                      <option value="5k-10k">₹5,000 - ₹10,000</option>
                      <option value="10k-20k">₹10,000 - ₹20,000</option>
                      <option value="20k-plus">₹20,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                    <select 
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-plus-months">3+ months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What are your main goals for the website? *</label>
                  <Textarea 
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="e.g., Increase donations, attract volunteers, improve online presence..."
                    rows={3}
                    required
                    className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current challenges you're facing</label>
                  <Textarea 
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="Tell us about any challenges with your current online presence..."
                    rows={3}
                    className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <Input 
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select 
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-green hover:bg-brand-green-light text-white py-6 text-lg font-semibold relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Book Free Consultation'}
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      animate={{ x: isSubmitting ? '100%' : '-100%' }}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                    />
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConsultationForm;
