
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Recipient, NGO_TYPES } from '../types';

interface ManualEntryProps {
  onRecipientAdd: (recipient: Recipient) => void;
}

export default function ManualEntry({ onRecipientAdd }: ManualEntryProps) {
  const [manualEntry, setManualEntry] = useState<Recipient>({ name: '', email: '', ngoType: '' });
  const { toast } = useToast();

  const handleAddManual = () => {
    if (!manualEntry.name || !manualEntry.email || !manualEntry.ngoType) {
      toast({ title: 'Error', description: 'Name, Email, and NGO Type are required', variant: 'destructive' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(manualEntry.email)) {
      toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }

    onRecipientAdd(manualEntry);
    setManualEntry({ name: '', email: '', ngoType: '' });
    toast({ title: 'Success', description: 'Recipient added successfully' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div>
        <Label htmlFor="name">Organization Name</Label>
        <Input 
          id="name"
          placeholder="Enter NGO name" 
          value={manualEntry.name} 
          onChange={e => setManualEntry({ ...manualEntry, name: e.target.value })} 
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email"
          type="email"
          placeholder="contact@ngo.org" 
          value={manualEntry.email} 
          onChange={e => setManualEntry({ ...manualEntry, email: e.target.value })} 
        />
      </div>
      <div>
        <Label htmlFor="ngoType">NGO Category</Label>
        <Select value={manualEntry.ngoType} onValueChange={(value) => setManualEntry({ ...manualEntry, ngoType: value })}>
          <SelectTrigger id="ngoType">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {NGO_TYPES.map(type => (
              <SelectItem key={type} value={type}>
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={handleAddManual}
        className="bg-brand-green hover:bg-brand-green-light text-white"
      >
        Add Recipient
      </Button>
    </div>
  );
}
