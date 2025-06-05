
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    onRecipientAdd(manualEntry);
    setManualEntry({ name: '', email: '', ngoType: '' });
  };

  return (
    <div className="flex gap-2">
      <Input 
        placeholder="Name" 
        value={manualEntry.name} 
        onChange={e => setManualEntry({ ...manualEntry, name: e.target.value })} 
      />
      <Input 
        placeholder="Email" 
        value={manualEntry.email} 
        onChange={e => setManualEntry({ ...manualEntry, email: e.target.value })} 
      />
      <Select value={manualEntry.ngoType} onValueChange={(value) => setManualEntry({ ...manualEntry, ngoType: value })}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select NGO Type" />
        </SelectTrigger>
        <SelectContent>
          {NGO_TYPES.map(type => (
            <SelectItem key={type} value={type}>
              {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAddManual}>Add</Button>
    </div>
  );
}
