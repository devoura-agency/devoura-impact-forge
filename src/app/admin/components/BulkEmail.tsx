import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface Recipient {
  ngoName: string;
  email: string;
  category: string;
  location: string;
}

const defaultTemplate = (ngoName: string, category: string, location: string, email: string) => `
Dear ${ngoName},

We are excited to connect with you regarding our latest initiatives for NGOs.

Category: ${category || 'N/A'}
Location: ${location || 'N/A'}
Email: ${email}

Please let us know if you have any questions or would like to collaborate!

Best regards,
Devoura Team
`;

export default function BulkEmail() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [manualEntry, setManualEntry] = useState<Recipient>({ ngoName: '', email: '', category: '', location: '' });
  const [sending, setSending] = useState(false);
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
          const data = results.data as Recipient[];
          setRecipients(data.filter(r => r.email));
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
        const data = XLSX.utils.sheet_to_json(ws) as Recipient[];
        setRecipients(data.filter(r => r.email));
      };
      reader.readAsBinaryString(file);
    } else {
      toast({ title: 'Error', description: 'Unsupported file type', variant: 'destructive' });
    }
  };

  // Manual entry add
  const handleAddManual = () => {
    if (!manualEntry.ngoName || !manualEntry.email) {
      toast({ title: 'Error', description: 'NGO Name and Email are required', variant: 'destructive' });
      return;
    }
    setRecipients([...recipients, manualEntry]);
    setManualEntry({ ngoName: '', email: '', category: '', location: '' });
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
    for (const r of recipients) {
      try {
        const res = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: r.email,
            subject: 'Devoura NGO Collaboration',
            ngoName: r.ngoName,
            category: r.category,
            location: r.location,
            email: r.email,
            text: defaultTemplate(r.ngoName, r.category, r.location, r.email),
          })
        });
        if (res.ok) success++;
        else fail++;
      } catch {
        fail++;
      }
    }
    setSending(false);
    toast({
      title: 'Bulk Email Result',
      description: `Sent: ${success}, Failed: ${fail}`,
      variant: fail === 0 ? 'default' : 'destructive',
    });
    if (fail === 0) setRecipients([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bulk Email Sender</h2>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />
        <span className="text-gray-500">or</span>
        <div className="flex gap-2">
          <Input placeholder="NGO Name" value={manualEntry.ngoName} onChange={e => setManualEntry({ ...manualEntry, ngoName: e.target.value })} />
          <Input placeholder="Email" value={manualEntry.email} onChange={e => setManualEntry({ ...manualEntry, email: e.target.value })} />
          <Input placeholder="Category" value={manualEntry.category} onChange={e => setManualEntry({ ...manualEntry, category: e.target.value })} />
          <Input placeholder="Location" value={manualEntry.location} onChange={e => setManualEntry({ ...manualEntry, location: e.target.value })} />
          <Button onClick={handleAddManual}>Add</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NGO Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipients.map((r, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Input value={r.ngoName} onChange={e => handleEdit(idx, 'ngoName', e.target.value)} />
              </TableCell>
              <TableCell>
                <Input value={r.email} onChange={e => handleEdit(idx, 'email', e.target.value)} />
              </TableCell>
              <TableCell>
                <Input value={r.category} onChange={e => handleEdit(idx, 'category', e.target.value)} />
              </TableCell>
              <TableCell>
                <Input value={r.location} onChange={e => handleEdit(idx, 'location', e.target.value)} />
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDelete(idx)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700">
        <strong>Email Preview:</strong>
        <pre className="whitespace-pre-wrap mt-2">{defaultTemplate('NGO Name', 'Category', 'Location', 'email@ngo.org')}</pre>
      </div>
      <Button onClick={handleSendEmails} disabled={sending || recipients.length === 0} className="w-full">
        {sending ? 'Sending...' : 'Continue & Send Emails'}
      </Button>
    </div>
  );
} 