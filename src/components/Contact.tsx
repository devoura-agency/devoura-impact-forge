import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Calendar, MessageCircle, BarChart, Rocket, Sparkles } from 'lucide-react';
import ConsultationForm from './ConsultationForm';
import AuditForm from './AuditForm';
import { motion } from 'framer-motion';

const Contact = () => {
  const [activeForm, setActiveForm] = useState('contact');

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-brand-cream to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Let's Elevate Your Mission
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              That one conversation with an NGO sparked Devoura, and we're here to spark change for you. 
              Whether you need a new website, AI-driven engagement, or data insights, we're ready to help your NGO shine online.
            </p>
          </div>

          {/* Form Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={() => setActiveForm('contact')}
              variant={activeForm === 'contact' ? 'default' : 'outline'}
              className={activeForm === 'contact' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
            >
              <Mail className="w-4 h-4 mr-2" />
              General Contact
            </Button>
            <Button
              onClick={() => setActiveForm('consultation')}
              variant={activeForm === 'consultation' ? 'default' : 'outline'}
              className={activeForm === 'consultation' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
            <Button
              onClick={() => setActiveForm('audit')}
              variant={activeForm === 'audit' ? 'default' : 'outline'}
              className={activeForm === 'audit' ? 'bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
            >
              <BarChart className="w-4 h-4 mr-2" />
              Request Audit
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Dynamic Form */}
            <div>
              {activeForm === 'contact' && (
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-brand-green">
                      <Mail className="w-6 h-6" />
                      Get in Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <Input placeholder="Your first name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <Input placeholder="Your last name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                        <Input placeholder="Your NGO name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <Textarea 
                          placeholder="Tell us about your mission and how we can help..." 
                          rows={4}
                        />
                      </div>
                      <Button className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeForm === 'consultation' && <ConsultationForm />}
              {activeForm === 'audit' && <AuditForm />}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-brand-green">
                    <Mail className="w-6 h-6" />
                    Email Us Directly
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Prefer email? Drop us a line and we'll get back to you within 24 hours.
                  </p>
                  <a 
                    href="mailto:hello@devoura.com"
                    className="text-brand-green hover:text-brand-green-light font-semibold"
                  >
                    hello@devoura.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-brand-green">
                    <MessageCircle className="w-6 h-6" />
                    Connect on X
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Follow us for web design tips and NGO success stories.
                  </p>
                  <a 
                    href="https://twitter.com/DevouraAgency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-green hover:text-brand-green-light font-semibold"
                  >
                    @DevouraAgency
                  </a>
                </CardContent>
              </Card>

              <div className="bg-brand-green p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Why Choose Devoura?</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Specialized in NGO websites</li>
                  <li>• AI-powered engagement tools</li>
                  <li>• Proven donation increase results</li>
                  <li>• Ongoing support & maintenance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="relative overflow-hidden rounded-xl shadow-xl mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green-light to-brand-gold opacity-80 animate-gradient-x z-0" />
              <div className="relative z-10 p-10 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
                  className="flex items-center gap-3 mb-4"
                >
                  <Rocket className="w-8 h-8 text-white animate-bounce" />
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">Ready to Make Your Mission Unstoppable?</h3>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
                  className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto"
                >
                  Join us to elevate your online presence and amplify your impact. <Sparkles className="inline w-6 h-6 text-yellow-200 ml-1 animate-pulse" />
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-brand-green font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-brand-green hover:text-white transition text-lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Free Consultation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
