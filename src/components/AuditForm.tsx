
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, CheckCircle } from 'lucide-react';

const AuditForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    ngoType: '',
    mainChallenges: '',
    specificAreas: [],
    currentMetrics: ''
  });

  const auditAreas = [
    'Website Performance & Speed',
    'SEO & Search Visibility',
    'User Experience (UX)',
    'Accessibility Compliance',
    'Donation Process',
    'Mobile Responsiveness',
    'Content Quality',
    'Social Media Integration'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Audit form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (area: string) => {
    const currentAreas = formData.specificAreas;
    const newAreas = currentAreas.includes(area)
      ? currentAreas.filter(item => item !== area)
      : [...currentAreas, area];
    
    setFormData({
      ...formData,
      specificAreas: newAreas
    });
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-brand-green">
          <BarChart className="w-6 h-6" />
          Free Website Audit Request
        </CardTitle>
        <p className="text-gray-600">
          Get a comprehensive AI-powered audit of your website with actionable insights to improve your online impact.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
              <Input 
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Your NGO name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
              <Input 
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-website.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
              <Input 
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
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
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What specific areas would you like us to focus on? (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {auditAreas.map((area) => (
                <label key={area} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.specificAreas.includes(area)}
                    onChange={() => handleCheckboxChange(area)}
                    className="w-4 h-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
                  />
                  <span className="text-sm text-gray-700">{area}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are your main challenges with your current website?
            </label>
            <Textarea 
              name="mainChallenges"
              value={formData.mainChallenges}
              onChange={handleChange}
              placeholder="e.g., Low donations, poor search rankings, difficult to navigate..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current website metrics (if known)
            </label>
            <Textarea 
              name="currentMetrics"
              value={formData.currentMetrics}
              onChange={handleChange}
              placeholder="e.g., Monthly visitors, donation conversion rate, bounce rate..."
              rows={3}
            />
          </div>

          <div className="bg-brand-cream p-4 rounded-lg">
            <h4 className="font-semibold text-brand-green mb-2">What you'll get:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                Comprehensive website performance analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                SEO audit and improvement recommendations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                User experience assessment
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                Actionable improvement roadmap
              </li>
            </ul>
          </div>

          <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3">
            <BarChart className="w-4 h-4 mr-2" />
            Request Free Audit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuditForm;
