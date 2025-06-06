import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, query, orderBy, onSnapshot, where, getDocs, limit, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Recipient {
  name: string;
  email: string;
  ngoType: string;
}

interface EmailStatus {
  recipient: Recipient;
  status: 'pending' | 'sending' | 'success' | 'failed';
  retryCount: number;
  error?: string;
}

interface EmailError {
  code: string;
  message: string;
  details?: string;
  recipient?: string;
  timestamp: string;
}

interface BulkEmailState {
  recipients: Recipient[];
  fileData: Recipient[];
  manualEntry: Recipient;
  sending: boolean;
  emailStatuses: EmailStatus[];
  progress: number;
  batchId: string | null;
  isPaused: boolean;
  currentBatch: number;
  totalBatches: number;
  backgroundJob: NodeJS.Timeout | null;
  dailyCount: number;
  remainingEmails: number;
  errors: EmailError[];
  scheduledFor?: string;
  isScheduling: boolean;
  subject: string;
  message: string;
  attachments: File[];
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

const BATCH_SIZE = 50; // Process 50 emails at a time
const EMAIL_DELAY = 5000; // 5 seconds between emails
const RETRY_DELAY = 10000; // 10 seconds between retries
const MAX_RETRIES = 3;
const DAILY_EMAIL_LIMIT = 100;

export default function BulkEmail() {
  const [state, setState] = useState<BulkEmailState>({
    recipients: [],
    fileData: [],
    manualEntry: { name: '', email: '', ngoType: '' },
    sending: false,
    emailStatuses: [],
    progress: 0,
    batchId: null,
    isPaused: false,
    currentBatch: 0,
    totalBatches: 0,
    backgroundJob: null,
    dailyCount: 0,
    remainingEmails: DAILY_EMAIL_LIMIT,
    errors: [],
    scheduledFor: undefined,
    isScheduling: false,
    subject: '',
    message: '',
    attachments: []
  });

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
          setState(prev => ({ ...prev, fileData: data }));
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
        setState(prev => ({ ...prev, fileData: data }));
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
    if (state.fileData.length === 0) {
      toast({ title: 'Error', description: 'No valid data to add', variant: 'destructive' });
      return;
    }
    setState(prev => ({
      ...prev,
      recipients: [...prev.recipients, ...state.fileData],
      fileData: []
    }));
    toast({ title: 'Success', description: `Added ${state.fileData.length} entries to the list` });
  };

  // Manual entry add
  const handleAddManual = () => {
    if (!state.manualEntry.name || !state.manualEntry.email || !state.manualEntry.ngoType) {
      toast({ title: 'Error', description: 'Name, Email, and NGO Type are required', variant: 'destructive' });
      return;
    }
    setState(prev => ({
      ...prev,
      recipients: [...prev.recipients, state.manualEntry],
      manualEntry: { name: '', email: '', ngoType: '' }
    }));
  };

  // Edit row
  const handleEdit = (idx: number, field: keyof Recipient, value: string) => {
    setState(prev => ({
      ...prev,
      recipients: prev.recipients.map((r, i) => i === idx ? { ...r, [field]: value } : r)
    }));
  };

  // Delete row
  const handleDelete = (idx: number) => {
    setState(prev => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== idx)
    }));
  };

  // Send single email with retry logic
  const sendSingleEmail = async (recipient: Recipient): Promise<boolean> => {
    try {
      const res = await fetch('/api/bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: [recipient],
          subject: state.subject,
          message: state.message,
          attachments: state.attachments
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 429) {
          // Daily limit reached
          toast({
            title: 'Daily Limit Reached',
            description: 'You have reached the daily email limit. Please try again tomorrow.',
            variant: 'destructive'
          });
          return false;
        }
        throw new Error(errorData.error || 'Failed to send email');
      }

      const data = await res.json();
      setState(prev => ({
        ...prev,
        dailyCount: data.dailyCount,
        remainingEmails: data.remainingEmails
      }));
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      handleError(error, recipient.email);
      return false;
    }
  };

  // Process a single batch of emails
  const processBatch = async (batchIndex: number, queue: EmailStatus[]) => {
    const start = batchIndex * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, queue.length);
    const batchQueue = queue.slice(start, end);

    for (let i = 0; i < batchQueue.length; i++) {
      if (state.isPaused) {
        await new Promise(resolve => {
          const checkPause = setInterval(() => {
            if (!state.isPaused) {
              clearInterval(checkPause);
              resolve(true);
            }
          }, 1000);
        });
      }

      const emailStatus = batchQueue[i];
      const queueIndex = start + i;
      
      setState(prev => ({
        ...prev,
        emailStatuses: prev.emailStatuses.map((status, idx) => 
          idx === queueIndex ? { ...status, status: 'sending' } : status
        )
      }));

      try {
        const success = await sendSingleEmail(emailStatus.recipient);
        
        if (success) {
          setState(prev => ({
            ...prev,
            emailStatuses: prev.emailStatuses.map((status, idx) => 
              idx === queueIndex ? { ...status, status: 'success' } : status
            )
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          emailStatuses: prev.emailStatuses.map((status, idx) => 
            idx === queueIndex ? { 
              ...status, 
              status: 'failed',
              error: error instanceof Error ? error.message : 'Unknown error'
            } : status
          )
        }));
      }

      // Update progress
      setState(prev => ({
        ...prev,
        progress: ((queueIndex + 1) / queue.length) * 100
      }));
    }
  };

  // Process all batches
  const processAllBatches = async (queue: EmailStatus[]) => {
    const batches = Math.ceil(queue.length / BATCH_SIZE);
    setState(prev => ({ ...prev, totalBatches: batches }));
    
    for (let i = 0; i < batches; i++) {
      if (state.isPaused) {
        await new Promise(resolve => {
          const checkPause = setInterval(() => {
            if (!state.isPaused) {
              clearInterval(checkPause);
              resolve(true);
            }
          }, 1000);
        });
      }
      
      setState(prev => ({ ...prev, currentBatch: i + 1 }));
      await processBatch(i, queue);
      
      // Add delay between batches
      if (i < batches - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  };

  // Send emails with queue system
  const handleSendEmails = async () => {
    setState(prev => ({ ...prev, sending: true, progress: 0, isPaused: false, currentBatch: 0 }));
    
    // Initialize email statuses
    const initialStatuses: EmailStatus[] = state.recipients.map(recipient => ({
      recipient,
      status: 'pending',
      retryCount: 0
    }));
    setState(prev => ({ ...prev, emailStatuses: initialStatuses }));

    try {
      // Create batch record in Firestore
      const batchRef = await addDoc(collection(db, 'bulkEmailBatches'), {
        sentAt: new Date().toISOString(),
        recipients: state.recipients,
        status: 'in_progress',
        stats: {
          total: state.recipients.length,
          success: 0,
          failed: 0
        }
      });
      setState(prev => ({ ...prev, batchId: batchRef.id }));

      // Process emails in batches
      const queue = [...initialStatuses];
      const batches = Math.ceil(queue.length / BATCH_SIZE);
      setState(prev => ({ ...prev, totalBatches: batches }));
      
      for (let i = 0; i < batches; i++) {
        if (state.isPaused) {
          await new Promise(resolve => {
            const checkPause = setInterval(() => {
              if (!state.isPaused) {
                clearInterval(checkPause);
                resolve(true);
              }
            }, 100);
          });
        }
        
        setState(prev => ({ ...prev, currentBatch: i + 1 }));
        await processBatch(i, queue);
        
        // Add delay between batches
        if (i < batches - 1) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }

      // Update batch record with final results
      const results = {
        success: state.emailStatuses.filter(s => s.status === 'success').length,
        fail: state.emailStatuses.filter(s => s.status === 'failed').length,
        noAttachments: 0
      };
      
      await updateDoc(doc(db, 'bulkEmailBatches', state.batchId), {
        status: 'completed',
        stats: results,
        completedAt: new Date().toISOString()
      });
      
      setState(prev => ({ ...prev, sending: false }));
    } catch (error) {
      console.error('Error sending emails:', error);
      handleError(error);
      setState(prev => ({ ...prev, sending: false }));
    }
  };

  // Cleanup background job
  useEffect(() => {
    return () => {
      if (state.backgroundJob) {
        clearTimeout(state.backgroundJob);
      }
    };
  }, [state.backgroundJob]);

  const handleSchedule = async () => {
    if (!state.scheduledFor) return;

    setState(prev => ({ ...prev, isScheduling: true }));
    try {
      const response = await fetch('/api/schedule-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: state.recipients,
          subject: state.subject,
          message: state.message,
          scheduledFor: state.scheduledFor,
          attachments: state.attachments
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to schedule emails');
      }

      toast({ 
        title: 'Success',
        description: 'Emails scheduled successfully'
      });
      setState(prev => ({
        ...prev,
        recipients: [],
        subject: '',
        message: '',
        attachments: [],
        scheduledFor: undefined,
        isScheduling: false
      }));
    } catch (error) {
      console.error('Error scheduling emails:', error);
      toast({ 
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to schedule emails',
        variant: 'destructive'
      });
      setState(prev => ({ ...prev, isScheduling: false }));
    }
  };

  const handleError = (error: any, recipient?: string) => {
    const emailError: EmailError = {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
      details: error.details || error.stack,
      recipient,
      timestamp: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      errors: [...prev.errors, emailError]
    }));

    // Log error to Firestore for analytics
    addDoc(collection(db, 'emailErrors'), emailError);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bulk Email Sender</h2>
      
      {/* Daily Limit Info */}
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-blue-800">Daily Email Limit</h3>
            <p className="text-sm text-blue-600">
              {state.dailyCount} emails sent today ({state.remainingEmails} remaining)
            </p>
          </div>
          <div className="w-32">
            <Progress value={(state.dailyCount / DAILY_EMAIL_LIMIT) * 100} className="h-2" />
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />
          <Button 
            onClick={handleAddFileData}
            disabled={state.fileData.length === 0}
            className="bg-brand-green hover:bg-brand-green-light text-white"
          >
            Add to List ({state.fileData.length})
          </Button>
        </div>
        {state.fileData.length > 0 && (
          <div className="text-sm text-gray-600">
            Found {state.fileData.length} valid entries. Click 'Add to List' to review them.
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      {/* Manual Entry Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add Recipient Manually</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Name"
            value={state.manualEntry.name}
            onChange={e => setState(prev => ({ ...prev, manualEntry: { ...prev.manualEntry, name: e.target.value } }))}
          />
          <Input
            placeholder="Email"
            type="email"
            value={state.manualEntry.email}
            onChange={e => setState(prev => ({ ...prev, manualEntry: { ...prev.manualEntry, email: e.target.value } }))}
          />
          <Select value={state.manualEntry.ngoType} onValueChange={(value) => setState(prev => ({ ...prev, manualEntry: { ...prev.manualEntry, ngoType: value } }))}>
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
        </div>
        <Button 
          onClick={handleAddManual}
          className="bg-brand-green hover:bg-brand-green-light text-white"
        >
          Add Recipient
        </Button>
      </div>
      
      {/* Recipients Table */}
      {state.recipients.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recipients List ({state.recipients.length})</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {state.remainingEmails} emails remaining today
              </span>
              <Button 
                variant="outline" 
                onClick={() => setState(prev => ({ ...prev, recipients: [] }))}
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.recipients.map((r, idx) => (
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

      {/* Progress and Status Section */}
      {state.sending && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Progress: {Math.round(state.progress)}% (Batch {state.currentBatch} of {state.totalBatches})
            </span>
            <span className="text-sm text-gray-600">
              {state.emailStatuses.filter(s => s.status === 'success').length} / {state.recipients.length} sent
              ({state.remainingEmails} remaining today)
            </span>
          </div>
          <Progress value={state.progress} className="w-full" />
          
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setState(prev => ({ ...prev, isPaused: !prev.isPaused }))}
              variant="outline"
              className={state.isPaused ? 'bg-yellow-100' : ''}
            >
              {state.isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
          
          <div className="max-h-60 overflow-y-auto border rounded-md p-4">
            {state.emailStatuses.map((status, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{status.recipient.email}</span>
                <span className={`text-sm ${
                  status.status === 'success' ? 'text-green-600' :
                  status.status === 'failed' ? 'text-red-600' :
                  status.status === 'sending' ? 'text-blue-600' :
                  'text-gray-600'
                }`}>
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                  {status.error && ` - ${status.error}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduling Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setState(prev => ({ ...prev, isScheduling: !prev.isScheduling }))}
          >
            {state.isScheduling ? 'Cancel Scheduling' : 'Schedule for Later'}
          </Button>
          {state.isScheduling && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Schedule for:</label>
              <input
                type="datetime-local"
                value={state.scheduledFor || ''}
                onChange={(e) => setState(prev => ({ ...prev, scheduledFor: e.target.value }))}
                min={new Date().toISOString().slice(0, 16)}
                className="border rounded px-2 py-1"
              />
            </div>
          )}
        </div>

        {state.isScheduling && state.scheduledFor && (
          <div className="text-sm text-muted-foreground">
            Emails will be sent on {new Date(state.scheduledFor).toLocaleString()}
          </div>
        )}
      </div>

      {/* Error Display */}
      {state.errors.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Errors</h3>
          <div className="space-y-2">
            {state.errors.map((error, index) => (
              <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">{error.code}</span>
                </div>
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
                {error.recipient && (
                  <p className="text-sm text-red-500">Recipient: {error.recipient}</p>
                )}
                {error.details && (
                  <pre className="mt-2 text-xs text-red-400 overflow-x-auto">
                    {error.details}
                  </pre>
                )}
                <p className="mt-1 text-xs text-red-400">
                  {new Date(error.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        {state.isScheduling ? (
          <Button
            onClick={handleSchedule}
            disabled={!state.scheduledFor || state.isScheduling}
          >
            Schedule Emails
          </Button>
        ) : (
          <Button
            onClick={handleSendEmails}
            disabled={state.sending || state.recipients.length === 0 || state.remainingEmails === 0}
          >
            {state.sending ? 'Sending...' : 
             state.remainingEmails === 0 ? 'Daily Limit Reached' :
             `Send ${Math.min(state.recipients.length, state.remainingEmails)} Emails`}
          </Button>
        )}
      </div>
    </div>
  );
}
