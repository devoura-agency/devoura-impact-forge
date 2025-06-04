import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const CallRequestForm = () => {
  const [formData, setFormData] = useState({
    number: '',
    time: '',
    language: '',
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firebase
      const callRequestsRef = collection(db, 'callRequests');
      await addDoc(callRequestsRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });

      // Send email notification
      const response = await fetch('/api/call-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      // Show success message
      toast({
        title: 'Success!',
        description: 'Thank you for your request! We will call you at your preferred time.',
        variant: 'default',
      });

      // Reset form
      setFormData({
        number: '',
        time: '',
        language: '',
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
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
          <Phone className="w-6 h-6" />
          Request a Call
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <Input 
              type="tel"
              placeholder="Your phone number" 
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
            <Input 
              type="text"
              placeholder="When would you like us to call?" 
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
            <Input 
              placeholder="Your preferred language" 
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name (Optional)</label>
            <Input 
              placeholder="Your name" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
            <Input 
              type="email"
              placeholder="your@email.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3"
          >
            {loading ? 'Sending...' : 'Request Call'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CallRequestForm; 