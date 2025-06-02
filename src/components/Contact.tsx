
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Calendar, MessageCircle, BarChart } from 'lucide-react';

const Contact = () => {
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

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-brand-green mb-6">Get in Touch</h3>
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
            </div>

            <div className="space-y-6">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-brand-green">
                    <Calendar className="w-6 h-6" />
                    Book a Free Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Schedule a call to discuss your vision and how we can bring it to life.
                  </p>
                  <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                    Book Now
                  </Button>
                </CardContent>
              </Card>

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

              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-brand-green">
                    <BarChart className="w-6 h-6" />
                    NGO Website Audit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Get a free AI-powered audit to see how your site can improve.
                  </p>
                  <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                    Request Audit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-brand-green p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Make Your Mission Unstoppable?</h3>
              <p className="text-lg">
                Join us to elevate your online presence and amplify your impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
