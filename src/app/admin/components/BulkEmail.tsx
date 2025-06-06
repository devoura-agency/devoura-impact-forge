import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Recipient {
  name: string;
  email: string;
  ngoType: string;
}

const NGO_TYPES = [
  'education',
  'women-empowerment',
  'wildlife',
  'community-service',
  'health-and-wellness',
  'disaster-management',
  'other'
] as const;

export default function BulkEmail() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [manualEntry, setManualEntry] = useState<Recipient>({ name: '', email: '', ngoType: '' });
  const [sending, setSending] = useState(false);
  const [fileData, setFileData] = useState<Recipient[]>([]);
  const { toast } = useToast();

  // Handle file upload and parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data.map((row: any) => ({
            name: row.name || row.Name || '',
            email: row.email || row.Email || '',
            ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || ''
          })).filter((r: Recipient) => r.email && r.name);
          setFileData(data);
          toast({ 
            title: 'File Parsed', 
            description: `Found ${data.length} valid entries. Click 'Add to List' to review them.` 
          });
        },
        error: () => toast({ title: 'Error', description: 'Failed to parse CSV', variant: 'destructive' })
      });
    } else if (ext === 'xls' || ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        if (!bstr) return;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws).map((row: any) => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || ''
        })).filter((r: Recipient) => r.email && r.name);
        setFileData(data);
        toast({ 
          title: 'File Parsed', 
          description: `Found ${data.length} valid entries. Click 'Add to List' to review them.` 
        });
      };
      reader.readAsBinaryString(file);
    } else {
      toast({ title: 'Error', description: 'Unsupported file type', variant: 'destructive' });
    }
  };

  // Add file data to recipients
  const handleAddFileData = () => {
    if (fileData.length === 0) {
      toast({ title: 'Error', description: 'No valid data to add', variant: 'destructive' });
      return;
    }
    setRecipients([...recipients, ...fileData]);
    setFileData([]);
    toast({ title: 'Success', description: `Added ${fileData.length} entries to the list` });
  };

  // Manual entry add
  const handleAddManual = () => {
    if (!manualEntry.name || !manualEntry.email || !manualEntry.ngoType) {
      toast({ title: 'Error', description: 'Name, Email, and NGO Type are required', variant: 'destructive' });
      return;
    }
    setRecipients([...recipients, manualEntry]);
    setManualEntry({ name: '', email: '', ngoType: '' });
  };

  // Edit row
  const handleEdit = (idx: number, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  // Delete row
  const handleDelete = (idx: number) => {
    setRecipients(recipients.filter((_, i) => i !== idx));
  };

  // Send emails
  const handleSendEmails = async () => {
    setSending(true);
    let success = 0;
    let fail = 0;
    let noAttachments = 0;

    for (const r of recipients) {
      try {
        const res = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: r.name,
            email: r.email,
            ngoType: r.ngoType,
            subject: 'Devoura NGO Collaboration'
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
        stats: {
          success,
          fail,
          noAttachments
        }
      });
    } catch (err) {
      toast({ title: 'Warning', description: 'Emails sent but failed to save batch to database', variant: 'destructive' });
    }

    setSending(false);
    
    // Show appropriate toast message
    if (fail === 0) {
      if (noAttachments > 0) {
        toast({
          title: 'Emails Sent (Without Pitch Deck)',
          description: `Successfully sent ${success} emails, but pitch deck was not attached. Please ensure the PDF is in the correct location.`,
          variant: 'default'
        });
      } else {
        toast({
          title: 'Success',
          description: `Successfully sent ${success} emails with pitch deck attached.`,
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
      <h2 className="text-2xl font-semibold">Bulk Email Sender</h2>
      
      {/* File Upload Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />
          <Button 
            onClick={handleAddFileData}
            disabled={fileData.length === 0}
            className="bg-brand-green hover:bg-brand-green-light text-white"
          >
            Add to List ({fileData.length})
          </Button>
        </div>
        {fileData.length > 0 && (
          <div className="text-sm text-gray-600">
            Found {fileData.length} valid entries. Click 'Add to List' to review them.
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      {/* Manual Entry Section */}
      <div className="flex gap-2">
        <Input placeholder="Name" value={manualEntry.name} onChange={e => setManualEntry({ ...manualEntry, name: e.target.value })} />
        <Input placeholder="Email" value={manualEntry.email} onChange={e => setManualEntry({ ...manualEntry, email: e.target.value })} />
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
      
      {/* Recipients Table */}
      {recipients.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recipients List ({recipients.length})</h3>
            <Button 
              variant="outline" 
              onClick={() => setRecipients([])}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>NGO Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipients.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Input value={r.name} onChange={e => handleEdit(idx, 'name', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={r.email} onChange={e => handleEdit(idx, 'email', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Select value={r.ngoType} onValueChange={(value) => handleEdit(idx, 'ngoType', value)}>
                      <SelectTrigger>
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
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(idx)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Email Preview */}
      <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700">
        <strong>Email Preview:</strong>
        <div className="mt-2 text-xs">
          <p>Each email will be sent using a professionally designed HTML template specific to the NGO type, including:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Beautiful, responsive HTML layout</li>
            <li>Professional subject line tailored to NGO type</li>
            <li>Emotionally engaging content that creates urgency</li>
            <li>Specific benefits and statistics for each sector</li>
            <li>Our pitch deck as a PDF attachment (if available)</li>
            <li>A link to our website (https://devoura.vercel.app)</li>
          </ul>
          <p className="mt-2 text-amber-600">
            Make sure the pitch deck PDF is placed in the public/pitch-deck.pdf location
          </p>
        </div>
      </div>

      {/* Send Button */}
      <Button 
        onClick={handleSendEmails} 
        disabled={sending || recipients.length === 0} 
        className="w-full bg-brand-green hover:bg-brand-green-light text-white"
      >
        {sending ? 'Sending...' : `Continue & Send Emails (${recipients.length})`}
      </Button>
    </div>
  );
}
