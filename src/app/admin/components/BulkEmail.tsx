import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const getEmailTemplate = (name: string, ngoType: string) => {
  const templates = {
    'education': `
Dear ${name},

We are excited to connect with you regarding our specialized services for educational NGOs. Our team has extensive experience in creating impactful digital solutions for educational institutions and organizations.

We offer:
- Custom website development for educational NGOs
- Student engagement platforms
- Educational resource management systems
- Donation and fundraising tools

Would you be interested in learning more about how we can help your educational NGO make a greater impact?

Best regards,
Devoura Team
`,
    'women-empowerment': `
Dear ${name},

We are reaching out because we specialize in supporting women empowerment NGOs with digital solutions that amplify their impact.

Our services include:
- Custom websites showcasing your empowerment programs
- Community engagement platforms
- Resource sharing systems
- Donation and volunteer management tools

Let's discuss how we can help your organization reach more women and create lasting change.

Best regards,
Devoura Team
`,
    'wildlife': `
Dear ${name},

We are passionate about supporting wildlife conservation efforts through technology. Our team has experience working with wildlife NGOs to create impactful digital solutions.

We offer:
- Custom websites for wildlife conservation
- Wildlife tracking and monitoring systems
- Conservation awareness platforms
- Donation and volunteer management tools

Would you like to explore how we can help your wildlife conservation efforts?

Best regards,
Devoura Team
`,
    'community-service': `
Dear ${name},

We understand the unique challenges faced by community service organizations. Our digital solutions are designed to help you serve your community more effectively.

Our services include:
- Custom websites for community outreach
- Volunteer management systems
- Resource coordination platforms
- Community engagement tools

Let's discuss how we can support your community service initiatives.

Best regards,
Devoura Team
`,
    'health-and-wellness': `
Dear ${name},

We specialize in creating digital solutions for health and wellness NGOs. Our platforms are designed to help you reach and serve more people effectively.

We offer:
- Custom health-focused websites
- Patient/beneficiary management systems
- Health education platforms
- Donation and resource management tools

Would you like to learn more about how we can support your health and wellness initiatives?

Best regards,
Devoura Team
`,
    'disaster-management': `
Dear ${name},

We understand the critical role of technology in disaster management and relief efforts. Our solutions are designed to help you respond quickly and effectively.

Our services include:
- Emergency response websites
- Resource coordination systems
- Volunteer management platforms
- Donation and aid distribution tools

Let's discuss how we can help your disaster management organization be more effective.

Best regards,
Devoura Team
`,
    'other': `
Dear ${name},

We are reaching out because we specialize in creating digital solutions for NGOs across various sectors. Our team has extensive experience in helping organizations like yours make a greater impact.

We offer:
- Custom website development
- Digital engagement platforms
- Resource management systems
- Donation and volunteer tools

Would you be interested in learning more about how we can support your organization's mission?

Best regards,
Devoura Team
`
  };

  return templates[ngoType as keyof typeof templates] || templates.other;
};

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
    for (const r of recipients) {
      try {
        const res = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: r.name,
            email: r.email,
            ngoType: r.ngoType,
            subject: 'Devoura NGO Collaboration',
            text: getEmailTemplate(r.name, r.ngoType),
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
        <pre className="whitespace-pre-wrap mt-2">{getEmailTemplate('Sample NGO', 'education')}</pre>
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