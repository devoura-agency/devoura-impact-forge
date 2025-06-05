
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
    if (recipients.length === 0) {
      toast({ title: 'Error', description: 'No recipients to send emails to', variant: 'destructive' });
      return;
    }

    setSending(true);
    let success = 0;
    let fail = 0;
    let noAttachments = 0;

    for (const recipient of recipients) {
      try {
        const htmlTemplate = getHTMLEmailTemplate(recipient.name, recipient.ngoType as any);
        
        const response = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: recipient.name,
            email: recipient.email,
            ngoType: recipient.ngoType,
            subject: '🚀 Transform Your NGO\'s Digital Impact - Devoura Partnership',
            html: htmlTemplate,
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          success++;
          if (!data.attachmentsIncluded) {
            noAttachments++;
          }
          console.log(`Email sent successfully to ${recipient.email}:`, data);
        } else {
          const errorData = await response.text();
          console.error(`Failed to send email to ${recipient.email}:`, errorData);
          fail++;
        }
      } catch (error) {
        console.error(`Error sending email to ${recipient.email}:`, error);
        fail++;
      }
    }

    // Save batch to Firestore
    try {
      await addDoc(collection(db, 'bulkEmailBatches'), {
        sentAt: new Date().toISOString(),
        recipients,
        status: 'completed',
        stats: { success, fail, noAttachments, total: recipients.length }
      });
    } catch (err) {
      console.error('Failed to save batch to database:', err);
      toast({ 
        title: 'Warning', 
        description: 'Emails sent but failed to save batch to database', 
        variant: 'destructive' 
      });
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
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-brand-green">Professional HTML Email Campaign</h2>
        <p className="text-gray-600">Send personalized, professional emails to NGOs with our compelling templates</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Recipients</h3>
        <FileUpload onDataParsed={handleFileDataParsed} />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-gray-500 font-medium">or add manually</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Add Individual Recipient</h3>
        <ManualEntry onRecipientAdd={handleRecipientAdd} />
      </div>
      
      {recipients.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <RecipientsTable 
            recipients={recipients}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Email Preview</h3>
        <EmailPreview />
      </div>

      <div className="text-center">
        <Button 
          onClick={handleSendEmails} 
          disabled={sending || recipients.length === 0} 
          className="w-full max-w-md bg-brand-green hover:bg-brand-green-light text-white py-3 text-lg font-semibold"
          size="lg"
        >
          {sending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending Professional HTML Emails...
            </>
          ) : (
            `🚀 Send Professional HTML Emails (${recipients.length})`
          )}
        </Button>
        {recipients.length === 0 && (
          <p className="text-gray-500 mt-2">Add recipients to enable sending</p>
        )}
      </div>
    </div>
  );
}
