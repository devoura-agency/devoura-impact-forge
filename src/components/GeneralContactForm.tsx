import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const GeneralContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Helper to check if running on Vercel (prod)
  const isProd = typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Always save to Firebase
      const contactsRef = collection(db, 'contacts');
      await addDoc(contactsRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });

      // Only send email via API in production (Vercel)
      if (isProd) {
        const response = await fetch('/api/general-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            organization: formData.organization,
            message: formData.message
          }),
        });

        let data = {};
        try {
          data = await response.json();
        } catch (err) {
          throw new Error('Unexpected response from server');
        }

        if (!response.ok || (data as any).message !== 'Emails sent successfully') {
          throw new Error((data as any).error || 'Failed to send email notification');
        }
      }

      toast({
        title: 'Success!',
        description: 'Thank you for your message! We will get back to you soon.',
        variant: 'default',
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        message: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-brand-green">
          <Mail className="w-6 h-6" />
          General Contact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <Input 
                placeholder="Your first name" 
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <Input 
                placeholder="Your last name" 
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input 
              type="email" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
            <Input 
              placeholder="Your NGO name" 
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <Textarea 
              placeholder="Tell us about your mission and how we can help..." 
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneralContactForm;
