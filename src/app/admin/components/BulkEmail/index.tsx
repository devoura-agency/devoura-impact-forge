
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Recipient } from './types';
import { getHTMLEmailTemplate } from './utils/emailTemplates';
import FileUpload from './components/FileUpload';
import ManualEntry from './components/ManualEntry';
import RecipientsTable from './components/RecipientsTable';
import EmailPreview from './components/EmailPreview';

export default function BulkEmail() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleFileDataParsed = (newData: Recipient[]) => {
    setRecipients([...recipients, ...newData]);
  };

  const handleRecipientAdd = (recipient: Recipient) => {
    setRecipients([...recipients, recipient]);
  };

  const handleEdit = (idx: number, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const handleDelete = (idx: number) => {
    setRecipients(recipients.filter((_, i) => i !== idx));
  };

  const handleClearAll = () => {
    setRecipients([]);
  };

  const handleSendEmails = async () => {
    setSending(true);
    let success = 0;
    let fail = 0;
    let noAttachments = 0;

    for (const r of recipients) {
      try {
        const htmlTemplate = getHTMLEmailTemplate(r.name, r.ngoType as any);
        
        const res = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: r.name,
            email: r.email,
            ngoType: r.ngoType,
            subject: '🚀 Transform Your NGO\'s Digital Impact - Devoura Partnership',
            html: htmlTemplate,
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          success++;
          if (!data.attachmentsIncluded) {
            noAttachments++;
          }
        } else {
          fail++;
        }
      } catch {
        fail++;
      }
    }

    // Save batch to Firestore
    try {
      await addDoc(collection(db, 'bulkEmailBatches'), {
        sentAt: new Date().toISOString(),
        recipients,
        status: 'completed',
        stats: { success, fail, noAttachments }
      });
    } catch (err) {
      toast({ title: 'Warning', description: 'Emails sent but failed to save batch to database', variant: 'destructive' });
    }

    setSending(false);
    
    // Show appropriate toast message
    if (fail === 0) {
      if (noAttachments > 0) {
        toast({
          title: 'Professional HTML Emails Sent (Without Pitch Deck)',
          description: `Successfully sent ${success} professional HTML emails, but pitch deck was not attached. Please ensure the PDF is in the correct location.`,
          variant: 'default'
        });
      } else {
        toast({
          title: 'Success! 🎉',
          description: `Successfully sent ${success} professional HTML emails with pitch deck attached.`,
          variant: 'default'
        });
      }
      setRecipients([]);
    } else {
      toast({
        title: 'Partial Success',
        description: `Sent: ${success}, Failed: ${fail}${noAttachments > 0 ? ', No Pitch Deck: ' + noAttachments : ''}`,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Professional HTML Email Campaign</h2>
      
      <FileUpload onDataParsed={handleFileDataParsed} />

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      <ManualEntry onRecipientAdd={handleRecipientAdd} />
      
      <RecipientsTable 
        recipients={recipients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />

      <EmailPreview />

      <Button 
        onClick={handleSendEmails} 
        disabled={sending || recipients.length === 0} 
        className="w-full bg-brand-green hover:bg-brand-green-light text-white"
      >
        {sending ? 'Sending Professional HTML Emails...' : `🚀 Send Professional HTML Emails (${recipients.length})`}
      </Button>
    </div>
  );
}
