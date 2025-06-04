import { Button } from '@/components/ui/button';
import { Heart, Users, Globe, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const StoryPage = () => {
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

            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-brand-green mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                A journey born from compassion, fueled by purpose, and dedicated to amplifying voices of change
              </p>
            </motion.div>

            {/* Emotional NGO Images Section */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-3 gap-6 mb-16"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop" 
                  alt="Children in classroom" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white p-4 font-semibold">Education Changes Lives</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop" 
                  alt="Community gathering" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white p-4 font-semibold">Communities Unite for Good</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=300&fit=crop" 
                  alt="Helping hands" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white p-4 font-semibold">Every Hand Helps</p>
                </div>
              </div>
            </motion.section>

            {/* Story Content */}
            <div className="space-y-12">
              
              {/* The Beginning */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-green">Where It All Began</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      It was a rainy Tuesday evening when everything changed. I was scrolling through social media, 
                      feeling disconnected from the world, when I stumbled upon a small NGO's page. Their mission was beautiful, 
                      their work was transformative, but their website... it broke my heart.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Here was an organization feeding hundreds of children daily, educating girls in remote villages, 
                      and literally saving lives - yet their digital presence couldn't convey even a fraction of their impact.
                    </p>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=300&fit=crop" 
                      alt="Child with hope in eyes" 
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                </div>
              </motion.section>

              {/* The Realization */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-brand-green/5 to-brand-gold/5 rounded-2xl p-8"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop" 
                      alt="Volunteers working together" 
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-brand-green">The Painful Truth</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      I started researching and what I found shattered me. Thousands of NGOs across the world were struggling 
                      with the same problem. Organizations doing God's work, fighting poverty, saving the environment, 
                      empowering women - all of them struggling to reach the people who cared about their cause.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The statistics were heartbreaking: 70% of NGOs lose potential donors due to poor online presence. 
                      Millions of rupees in potential funding, thousands of volunteers, countless lives that could be touched.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* The Mission */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-green">Our Sacred Mission</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      That's when Devoura was born - not as a business, but as a mission. We realized that every NGO 
                      deserves a digital presence as powerful as their purpose. Every organization changing lives deserves 
                      a website that can touch hearts, inspire action, and connect them with people who share their vision.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We don't just build websites; we create digital bridges that connect compassionate hearts with meaningful causes.
                    </p>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop" 
                      alt="Hands reaching out in unity" 
                      className="rounded-xl shadow-lg w-full"
                    />
                  </div>
                </div>
              </motion.section>

              {/* The Promise */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-brand-green to-brand-green-light rounded-2xl p-8 text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src="https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=800&h=400&fit=crop" 
                    alt="Children smiling" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6">Our Promise to You</h2>
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      ✨ We will treat your mission as sacred as you do
                    </p>
                    <p className="text-lg leading-relaxed">
                      💫 We will craft your digital story with the same passion you bring to your cause
                    </p>
                    <p className="text-lg leading-relaxed">
                      🌟 We will build you a platform that doesn't just look good, but creates real impact
                    </p>
                    <p className="text-lg leading-relaxed">
                      💚 We will be your partners in amplifying voices of change across the world
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Emotional Images Section */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="relative mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop" 
                      alt="Child studying" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="w-16 h-16 bg-brand-green/90 rounded-full flex items-center justify-center mx-auto -mt-8 relative z-10">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-green mb-2">Every Child Matters</h3>
                  <p className="text-sm text-gray-600">Your education NGO could reach more children with the right digital presence</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="relative mb-4">
                    <img 
                      src="https://plus.unsplash.com/premium_photo-1682973057207-3c7ceafc7ea5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Women empowerment" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="w-16 h-16 bg-brand-green/90 rounded-full flex items-center justify-center mx-auto -mt-8 relative z-10">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-green mb-2">Every Woman Counts</h3>
                  <p className="text-sm text-gray-600">Your empowerment programs deserve a platform that inspires and mobilizes</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="relative mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=200&fit=crop" 
                      alt="Community help" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="w-16 h-16 bg-brand-green/90 rounded-full flex items-center justify-center mx-auto -mt-8 relative z-10">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-brand-green mb-2">Every Life Has Value</h3>
                  <p className="text-sm text-gray-600">Your humanitarian work needs a voice that reaches every corner of the world</p>
                </div>
              </motion.section>

              {/* CTA Section */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center bg-brand-cream rounded-2xl p-12 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=400&fit=crop" 
                    alt="Hope and unity" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-brand-green mb-6">
                    Let's Write Your Digital Story Together
                  </h2>
                  <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    Your NGO's mission is too important to be hidden. Let's create a digital presence 
                    that amplifies your impact and connects you with supporters who share your vision.
                  </p>
                  <Button 
                    onClick={() => navigate('/wizard')}
                    size="lg"
                    className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryPage;
