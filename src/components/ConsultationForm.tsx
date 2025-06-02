
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-brand-green">
          <Calendar className="w-6 h-6" />
          Free Consultation Booking
        </CardTitle>
        <p className="text-gray-600">
          Let's discuss your NGO's vision and how we can bring it to life with a powerful website.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <Input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                required
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
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <Input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
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
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
              <Input 
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Your NGO name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NGO Type *</label>
              <select 
                name="ngoType"
                value={formData.ngoType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Website (if any)</label>
            <Input 
              name="currentWebsite"
              value={formData.currentWebsite}
              onChange={handleChange}
              placeholder="https://your-current-website.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select budget</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-20k">$10,000 - $20,000</option>
                <option value="20k-plus">$20,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
              <select 
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="3-plus-months">3+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What are your main goals for the website? *</label>
            <Textarea 
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="e.g., Increase donations, attract volunteers, improve online presence..."
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current challenges you're facing</label>
            <Textarea 
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              placeholder="Tell us about any challenges with your current online presence..."
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <Input 
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
              <select 
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 8 PM)</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3">
            <Calendar className="w-4 h-4 mr-2" />
            Book Free Consultation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsultationForm;
