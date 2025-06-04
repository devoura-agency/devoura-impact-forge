
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, TrendingUp, Users, Heart, Globe, Phone, Mail, ExternalLink, Code, Palette, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PitchDeck = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-gold/10">
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Button 
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
        >
          ← Go To Home
        </Button>
      </div>

      {/* Slide 1: Welcome with Logo */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 pt-20"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-8">
            {/* Devoura Logo */}
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" 
                alt="Devoura Logo" 
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-green mb-6">
              Welcome to Devoura
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-8">
              Empowering NGOs with Digital Solutions
            </p>
            <div className="bg-brand-green/10 text-brand-green px-8 py-4 rounded-full inline-block text-lg font-medium mb-8">
              Your Cause, Our Code
            </div>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Devoura, we craft websites that empower NGOs to connect with supporters, 
            secure donations, and inspire volunteering. Let's amplify your impact together.
          </motion.p>
        </div>
      </motion.section>

      {/* Slide 2: The Challenge */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-red-600 mb-8">
              The Reality NGOs Face
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg max-w-4xl mx-auto">
              <p className="text-2xl text-red-700 font-semibold mb-4">
                80% of donors research organizations online before giving
              </p>
              <p className="text-lg text-red-600">
                Without a strong online presence, your impact remains invisible
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="text-center p-8 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-red-700 mb-4">Limited Visibility</h3>
              <p className="text-red-600">Potential donors and volunteers can't find you</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center p-8 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-red-700 mb-4">Mission Miscommunication</h3>
              <p className="text-red-600">Your powerful story gets lost without proper presentation</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center p-8 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-red-700 mb-4">Inefficient Fundraising</h3>
              <p className="text-red-600">Complicated donation processes lose supporters</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 3: The Solution */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-green to-brand-green-light"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto text-white">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Your Digital Home
            </h2>
            <p className="text-2xl mb-8 opacity-90">
              A professional website acts as a 24/7 ambassador for your cause
            </p>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-brand-gold mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
                    <p className="text-xl opacity-90">Showcase your mission to supporters worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-brand-gold mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Seamless Donations</h3>
                    <p className="text-xl opacity-90">Secure payment systems that make giving effortless</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-brand-gold mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Volunteer Attraction</h3>
                    <p className="text-xl opacity-90">Clear calls-to-action that inspire action</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-brand-gold mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Trust Building</h3>
                    <p className="text-xl opacity-90">Professional design that establishes credibility</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 text-brand-green">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-100 h-6 rounded ml-4"></div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-brand-cream to-brand-gold/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-brand-green mx-auto mb-4" />
                    <p className="text-lg font-semibold">Your NGO Website</p>
                    <p className="text-sm opacity-70">Professional • Accessible • Impactful</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 4: Statistics */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-green mb-8">
              The Numbers Don't Lie
            </h2>
            <p className="text-2xl text-gray-700">
              Organizations with optimized websites see dramatic improvements
            </p>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="bg-brand-cream p-12 rounded-2xl">
              <div className="text-6xl font-bold text-brand-green mb-4">+40%</div>
              <h3 className="text-2xl font-bold text-brand-green mb-2">More Engagement</h3>
              <p className="text-gray-700">Supporters interact more with professional websites</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-brand-gold/20 p-12 rounded-2xl">
              <div className="text-6xl font-bold text-brand-green mb-4">+156%</div>
              <h3 className="text-2xl font-bold text-brand-green mb-2">Donation Increase</h3>
              <p className="text-gray-700">NGOs see massive donation growth with proper websites</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-brand-green/10 p-12 rounded-2xl">
              <div className="text-6xl font-bold text-brand-green mb-4">+89%</div>
              <h3 className="text-2xl font-bold text-brand-green mb-2">Volunteer Sign-ups</h3>
              <p className="text-gray-700">Clear calls-to-action drive volunteer recruitment</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 5: Why Devoura */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-cream to-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-green mb-8">
              Why Choose Devoura?
            </h2>
            <p className="text-2xl text-gray-700">
              Your Partner in Digital Success
            </p>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-8">
              <Card className="p-8 border-brand-green/20 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-green mb-3">NGO Expertise</h3>
                      <p className="text-gray-700">We specialize exclusively in NGO web solutions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-8 border-brand-green/20 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-green mb-3">Tailored Solutions</h3>
                      <p className="text-gray-700">Custom websites reflecting your unique mission</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-8">
              <Card className="p-8 border-brand-green/20 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-green mb-3">Affordable & Scalable</h3>
                      <p className="text-gray-700">Budget-friendly options with room to grow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-8 border-brand-green/20 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-green mb-3">Ongoing Support</h3>
                      <p className="text-gray-700">Maintenance and updates to keep you thriving</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 6: Process */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-green mb-8">
              Our Proven Process
            </h2>
            <p className="text-2xl text-gray-700">
              How We Bring Your Vision to Life
            </p>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="space-y-6">
            {[
              { number: "01", title: "Discovery", description: "Understand your NGO's goals and audience" },
              { number: "02", title: "Design", description: "Create a user-friendly, visually appealing prototype" },
              { number: "03", title: "Development", description: "Build a secure, responsive website with donation features" },
              { number: "04", title: "Launch & Support", description: "Launch your site and provide ongoing support" }
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex items-center gap-8 p-8 bg-brand-cream rounded-xl">
                <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-brand-green mb-3">{step.title}</h3>
                  <p className="text-xl text-gray-700">{step.description}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-brand-green" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 7: Our Capabilities - Replacing Success Stories */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-green to-brand-green-light"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto text-white">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What We Deliver
            </h2>
            <p className="text-2xl opacity-90">
              Comprehensive solutions designed for NGO success
            </p>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Custom Design</h3>
                  <p className="text-xl opacity-90">Unique, mission-focused designs that tell your story</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Modern Development</h3>
                  <p className="text-xl opacity-90">Fast, secure, mobile-responsive websites</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Payment Integration</h3>
                  <p className="text-xl opacity-90">Secure donation systems with multiple payment options</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Performance Focus</h3>
                  <p className="text-xl opacity-90">Optimized for speed, SEO, and user engagement</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 8: Our Approach - Replacing Testimonials */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-green mb-8">
              Our Mission-Driven Approach
            </h2>
            <p className="text-2xl text-gray-700">
              How we ensure your success
            </p>
          </motion.div>
          
          <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="bg-brand-cream p-8 rounded-2xl">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-green mb-4">Understanding Your Impact</h3>
              <p className="text-xl text-gray-700">
                We dive deep into your mission, values, and goals to create websites that authentically represent your cause and connect with your audience.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-brand-green/10 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-green mb-4">Results-Focused Strategy</h3>
              <p className="text-xl text-gray-700">
                Every design decision and feature we implement is strategically chosen to maximize donations, volunteer sign-ups, and community engagement.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 9: CTA */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-cream via-white to-brand-gold/10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-bold text-brand-green mb-8">
              Ready to Amplify Your Impact?
            </h2>
            <p className="text-2xl text-gray-700 mb-12">
              Take your NGO to the next level with a professional website that drives results
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                onClick={() => navigate('/request-call')}
                size="lg"
                className="bg-brand-green hover:bg-brand-green-light text-white px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              
              <Button 
                onClick={() => window.open('https://devoura.vercel.app', '_blank')}
                variant="outline"
                size="lg"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-12 py-6 text-xl rounded-full"
              >
                <ExternalLink className="mr-3 h-6 w-6" />
                View Our Portfolio
              </Button>
            </div>
            
            <div className="bg-brand-green/10 text-brand-green px-8 py-4 rounded-full inline-block text-lg font-medium">
              ✨ Free consultation • No commitment • Just results
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Slide 10: Contact */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-brand-green text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
              <img 
                src="/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" 
                alt="Devoura Logo" 
                className="h-20 w-auto"
              />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Connect with Devoura
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-6 text-brand-gold">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Globe className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl">devoura.vercel.app</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl">devoura.agency@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl">Schedule a call</span>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-6 text-brand-gold">Next Steps</h3>
                <div className="space-y-3 text-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-gold mt-1" />
                    <span>Free consultation call</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-gold mt-1" />
                    <span>Custom proposal for your NGO</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-gold mt-1" />
                    <span>Begin transforming your impact</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-3xl font-bold text-brand-gold">
              Let's build a website that powers your mission
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default PitchDeck;
