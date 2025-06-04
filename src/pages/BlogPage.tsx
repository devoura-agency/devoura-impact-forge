
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, TrendingUp, Users, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-brand-green mb-6">
                Why Every NGO Desperately Needs a Website
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                The heartbreaking reality of NGOs losing millions in potential funding due to poor digital presence
              </p>
            </motion.div>

            {/* Article Content */}
            <div className="space-y-12">
              
              {/* Opening Hook */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-brand-green"
              >
                <p className="text-xl text-gray-700 leading-relaxed font-medium italic">
                  "Imagine this: A potential donor, moved by poverty they witnessed, searches online for 'education NGO near me' 
                  with ₹50,000 ready to donate. They find your competitor's professional website instead of yours. 
                  That's ₹50,000 worth of impact that could have been yours."
                </p>
              </motion.section>

              {/* The Harsh Reality */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-brand-green mb-6 flex items-center gap-3">
                  <Heart className="w-8 h-8" />
                  The Heartbreaking Truth About NGOs Without Websites
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Shocking Statistics That Will Keep You Awake Tonight:</h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 73% of potential donors abandon their giving intention when they can't find professional information about an NGO online</li>
                    <li>• NGOs without websites lose an average of ₹12 lakhs annually in potential donations</li>
                    <li>• 68% of volunteers choose NGOs based on their online presence</li>
                    <li>• Organizations with professional websites receive 67% more recurring donations</li>
                  </ul>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every day, hundreds of compassionate souls are searching for NGOs to support. They have money to donate, 
                  time to volunteer, and hearts ready to contribute to meaningful causes. But if they can't find YOU online, 
                  they'll find someone else. Your life-changing work remains hidden while other organizations capture 
                  the support that could have amplified your impact.
                </p>
              </motion.section>

              {/* Real Stories */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-brand-green/5 to-brand-gold/5 rounded-2xl p-8"
              >
                <h2 className="text-3xl font-bold text-brand-green mb-6">Real Stories That Will Move You to Tears</h2>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-brand-green mb-3">Priya's Heartbreak</h3>
                    <p className="text-gray-700 leading-relaxed">
                      "I've been running an NGO for girl child education for 8 years. We've educated 200+ girls, 
                      but I still struggle to get funding. Last month, a corporate sponsor told me they chose another 
                      organization because 'they looked more professional online.' I lost ₹5 lakhs in funding because 
                      I didn't have a proper website. Those 50 girls who could have been educated... it haunts me every night."
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-brand-green mb-3">Rajesh's Missed Opportunity</h3>
                    <p className="text-gray-700 leading-relaxed">
                      "A tech millionaire wanted to donate ₹20 lakhs to rural healthcare. He googled 'healthcare NGO India' 
                      and couldn't find us because we only had a Facebook page. He donated to an NGO with a beautiful website instead. 
                      That ₹20 lakhs could have built 2 medical centers in villages that desperately need healthcare."
                    </p>
                  </CardContent>
                </Card>
              </motion.section>

              {/* What You're Losing */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-brand-green mb-6 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8" />
                  What Your NGO Loses Every Single Day Without a Website
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-red-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-red-600 mb-4">💔 Lost Donations</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Individual donors can't find you online</li>
                        <li>• Corporate sponsors question your credibility</li>
                        <li>• Grant applications get rejected for poor presentation</li>
                        <li>• Recurring donors lose connection with your work</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-red-600 mb-4">💔 Lost Volunteers</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Students needing internships choose others</li>
                        <li>• Professionals wanting to give back skip you</li>
                        <li>• International volunteers can't reach you</li>
                        <li>• Local community members remain unaware</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-red-600 mb-4">💔 Lost Partnerships</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Other NGOs can't collaborate with you</li>
                        <li>• Government agencies overlook your work</li>
                        <li>• Media doesn't cover your stories</li>
                        <li>• International organizations miss you</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-red-600 mb-4">💔 Lost Impact</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Lives that could have been saved</li>
                        <li>• Children who miss education opportunities</li>
                        <li>• Communities that remain unchanged</li>
                        <li>• Dreams that stay unfulfilled</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.section>

              {/* The Solution */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-brand-green mb-6 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  How a Professional Website Transforms Your NGO
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">📈 Increased Funding</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 3x more online donations</li>
                      <li>• Professional credibility for grant applications</li>
                      <li>• Easier corporate sponsorship acquisition</li>
                      <li>• Transparent impact reporting builds trust</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">👥 More Volunteers</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Clear volunteer registration process</li>
                      <li>• Showcase of volunteer experiences</li>
                      <li>• Easy communication with potential helpers</li>
                      <li>• Global reach for international volunteers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">🤝 Better Partnerships</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Professional image for collaborations</li>
                      <li>• Easy access to your work portfolio</li>
                      <li>• Media kit readily available</li>
                      <li>• Contact information clearly displayed</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">🌟 Amplified Impact</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Stories reach wider audiences</li>
                      <li>• Success metrics build credibility</li>
                      <li>• Regular updates keep supporters engaged</li>
                      <li>• Social media integration multiplies reach</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Urgent Call to Action */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-r from-brand-green to-brand-green-light rounded-2xl p-12 text-white text-center"
              >
                <h2 className="text-4xl font-bold mb-6">
                  Every Day You Wait, Lives Remain Unchanged
                </h2>
                <p className="text-xl mb-8 leading-relaxed">
                  Right now, while you're reading this, potential donors are searching for NGOs like yours. 
                  Volunteers are looking for meaningful ways to contribute. Corporations are allocating CSR funds. 
                  Will they find YOU, or will they find your competition?
                </p>
                <div className="bg-white/10 rounded-xl p-6 mb-8">
                  <p className="text-lg">
                    <strong>The question isn't whether you can afford a website.</strong><br/>
                    <strong>The question is: Can you afford NOT to have one?</strong>
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/wizard')}
                  size="lg"
                  className="bg-white text-brand-green hover:bg-gray-100 px-12 py-4 text-xl font-bold"
                >
                  Start Building Your Website Today
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <p className="mt-4 text-white/80">
                  Join 100+ NGOs who've already transformed their impact with professional websites
                </p>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
