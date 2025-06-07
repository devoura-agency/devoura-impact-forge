import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Progress } from '@/components/ui/progress';
import { Pause, Play, History, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Recipient {
  name: string;
  email: string;
  ngoType: string;
  status?: 'pending' | 'sending' | 'success' | 'failed';
  retries?: number;
}

interface EmailHistory {
  id: string;
  sentAt: string;
  recipients: Recipient[];
  stats: {
    success: number;
    fail: number;
    noAttachments: number;
  };
}

const NGO_TYPES = [
  'education',
  'women-empowerment',
  'wildlife',
  'community-service',
  'health-and-wellness',
  'disaster-management',
  'environment-water',
  'disability',
  'old-age',
  'child-welfare',
  'food',
  'other'
] as const;

const MAX_RETRIES = 3;
const SUCCESS_DELAY = 2000; // 2 seconds
const RETRY_DELAY = 5000; // 5 seconds

export default function BulkEmail() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [manualEntry, setManualEntry] = useState<Recipient>({ name: '', email: '', ngoType: '' });
  const [sending, setSending] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fileData, setFileData] = useState<Recipient[]>([]);
  const [progress, setProgress] = useState(0);
  const [emailHistory, setEmailHistory] = useState<EmailHistory[]>([]);
  const [currentBatch, setCurrentBatch] = useState<Recipient[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load email history
  const loadEmailHistory = async () => {
    try {
      const q = query(collection(db, 'bulkEmailBatches'), orderBy('sentAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const history = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmailHistory[];
      setEmailHistory(history);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to load email history', variant: 'destructive' });
    }
  };

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
            ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || '',
            status: 'pending' as const,
            retries: 0
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
          ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || '',
          status: 'pending' as const,
          retries: 0
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
    setRecipients([...recipients, { ...manualEntry, status: 'pending', retries: 0 }]);
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

  // Send single email with retry mechanism
  const sendEmailWithRetry = async (recipient: Recipient): Promise<boolean> => {
    let attempts = 0;
    
    while (attempts < MAX_RETRIES) {
      try {
        if (paused) {
          await new Promise(resolve => {
            const checkPause = setInterval(() => {
              if (!paused) {
                clearInterval(checkPause);
                resolve(true);
              }
            }, 1000);
          });
        }

        const res = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: recipient.name,
            email: recipient.email,
            ngoType: recipient.ngoType,
            subject: 'Devoura NGO Collaboration'
          }),
          signal: abortControllerRef.current?.signal
        });

        if (res.ok) {
          await new Promise(resolve => setTimeout(resolve, SUCCESS_DELAY));
          return true;
        }
        
        attempts++;
        if (attempts < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          throw err;
        }
        attempts++;
        if (attempts < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }
    
    return false;
  };

  // Send emails
  const handleSendEmails = async () => {
    setSending(true);
    setProgress(0);
    abortControllerRef.current = new AbortController();
    
    let successCount = 0;
    let failCount = 0;
    let noAttachments = 0;
    const totalEmails = recipients.length;

    try {
      for (let i = 0; i < recipients.length; i++) {
        if (paused) {
          await new Promise(resolve => {
            const checkPause = setInterval(() => {
              if (!paused) {
                clearInterval(checkPause);
                resolve(true);
              }
            }, 1000);
          });
        }

        const recipient = recipients[i];
        setRecipients(prev => prev.map((r, idx) => 
          idx === i ? { ...r, status: 'sending' } : r
        ));

        const emailSuccess = await sendEmailWithRetry(recipient);
        
        setRecipients(prev => prev.map((r, idx) => 
          idx === i ? { ...r, status: emailSuccess ? 'success' : 'failed' } : r
        ));

        if (emailSuccess) {
          successCount++;
        } else {
          failCount++;
        }

        setProgress(((i + 1) / totalEmails) * 100);
      }

      // Save batch to Firestore
      await addDoc(collection(db, 'bulkEmailBatches'), {
        sentAt: new Date().toISOString(),
        recipients,
        status: 'completed',
        stats: {
          success: successCount,
          fail: failCount,
          noAttachments
        }
      });

      // Update history
      await loadEmailHistory();

      // Show appropriate toast message
      if (failCount === 0) {
        toast({
          title: 'Success',
          description: `Successfully sent ${successCount} emails.`,
          variant: 'default'
        });
        setRecipients([]);
      } else {
        toast({
          title: 'Partial Success',
          description: `Sent: ${successCount}, Failed: ${failCount}`,
          variant: 'destructive'
        });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        toast({
          title: 'Operation Cancelled',
          description: 'Email sending was cancelled.',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while sending emails.',
          variant: 'destructive'
        });
      }
    } finally {
      setSending(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  };

  // Handle pause/resume
  const togglePause = () => {
    setPaused(!paused);
    if (!paused) {
      abortControllerRef.current?.abort();
    }
  };

  // Add next batch
  const handleAddNextBatch = () => {
    if (currentBatch.length === 0) {
      toast({ title: 'Error', description: 'No batch data to add', variant: 'destructive' });
      return;
    }
    setRecipients([...recipients, ...currentBatch]);
    setCurrentBatch([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Bulk Email Sender</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={loadEmailHistory}>
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Email History</DialogTitle>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Success</TableHead>
                      <TableHead>Failed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailHistory.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell>{new Date(batch.sentAt).toLocaleString()}</TableCell>
                        <TableCell>{batch.recipients.length}</TableCell>
                        <TableCell>{batch.stats.success}</TableCell>
                        <TableCell>{batch.stats.fail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setRecipients([])}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>NGO Type</TableHead>
                <TableHead>Status</TableHead>
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
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      r.status === 'success' ? 'bg-green-100 text-green-800' :
                      r.status === 'failed' ? 'bg-red-100 text-red-800' :
                      r.status === 'sending' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {r.status || 'Pending'}
                    </span>
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

      {/* Progress Bar */}
      {sending && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
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

      {/* Control Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={handleSendEmails} 
          disabled={sending || recipients.length === 0} 
          className="flex-1 bg-brand-green hover:bg-brand-green-light text-white"
        >
          {sending ? 'Sending...' : `Send Emails (${recipients.length})`}
        </Button>
        {sending && (
          <Button 
            onClick={togglePause}
            variant="outline"
            className="w-32"
          >
            {paused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
