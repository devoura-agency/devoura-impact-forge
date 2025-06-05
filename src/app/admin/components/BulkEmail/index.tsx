
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        
        console.log(`Sending email to ${recipient.email}...`);
        
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
        
        const responseText = await response.text();
        console.log(`Response for ${recipient.email}:`, responseText);
        
        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            success++;
            if (!data.attachmentsIncluded) {
              noAttachments++;
            }
            console.log(`Email sent successfully to ${recipient.email}:`, data);
          } catch (parseError) {
            console.error(`JSON parse error for ${recipient.email}:`, parseError);
            fail++;
          }
        } else {
          console.error(`Failed to send email to ${recipient.email}:`, responseText);
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bulk Email</h2>
        <p className="text-muted-foreground">
          Send personalized, professional emails to NGOs with our compelling templates
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Recipients</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload onDataParsed={handleFileDataParsed} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Individual Recipient</CardTitle>
        </CardHeader>
        <CardContent>
          <ManualEntry onRecipientAdd={handleRecipientAdd} />
        </CardContent>
      </Card>
      
      {recipients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recipients ({recipients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <RecipientsTable 
              recipients={recipients}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClearAll={handleClearAll}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Email Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <EmailPreview />
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleSendEmails} 
          disabled={sending || recipients.length === 0} 
          className="w-full max-w-md bg-brand-green hover:bg-brand-green-light text-white"
          size="lg"
        >
          {sending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Professional HTML Emails...
            </>
          ) : (
            `🚀 Send Professional HTML Emails (${recipients.length})`
          )}
        </Button>
      </div>
      
      {recipients.length === 0 && (
        <p className="text-center text-muted-foreground">Add recipients to enable sending</p>
      )}
    </div>
  );
}
