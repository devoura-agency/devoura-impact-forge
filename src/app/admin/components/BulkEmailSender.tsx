import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface EmailRecipient {
  name: string;
  email: string;
  ngoType: string;
  status: 'pending' | 'success' | 'failed';
  retryCount: number;
}

interface EmailBatch {
  id: string;
  recipients: EmailRecipient[];
  subject: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
}

export default function BulkEmailSender() {
  const [batches, setBatches] = useState<EmailBatch[]>([]);
  const [currentBatch, setCurrentBatch] = useState<EmailBatch | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const processingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const parseRecipients = (text: string): EmailRecipient[] => {
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .map(line => {
        const [name, email, ngoType] = line.split(',').map(s => s.trim());
        return {
          name,
          email,
          ngoType,
          status: 'pending',
          retryCount: 0
        };
      });
  };

  const createNewBatch = async () => {
    if (!subject || !content || !recipients) {
      setError('Please fill in all fields');
      return;
    }

    const parsedRecipients = parseRecipients(recipients);
    if (parsedRecipients.length === 0) {
      setError('Please enter at least one recipient');
      return;
    }

    const newBatch: EmailBatch = {
      id: Date.now().toString(),
      recipients: parsedRecipients,
      subject,
      content,
      status: 'pending',
      progress: 0,
      createdAt: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, 'emailBatches'), newBatch);
      newBatch.id = docRef.id;
      setBatches(prev => [...prev, newBatch]);
      setCurrentBatch(newBatch);
      setError(null);
      setSuccess('Batch created successfully');
    } catch (err) {
      setError('Failed to create batch');
    }
  };

  const sendEmail = async (recipient: EmailRecipient, batchId: string) => {
    try {
      const response = await fetch('/api/bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: recipient.name,
          email: recipient.email,
          ngoType: recipient.ngoType,
          subject
        })
      });

      if (!response.ok) throw new Error('Failed to send email');
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay for success
      return true;
    } catch (error) {
      if (recipient.retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5s delay for retry
        return false;
      }
      return false;
    }
  };

  const processBatch = async () => {
    if (!currentBatch || processingRef.current || isPaused) return;

    processingRef.current = true;
    const batch = { ...currentBatch };
    const totalRecipients = batch.recipients.length;

    while (currentIndexRef.current < totalRecipients && !isPaused) {
      const recipient = batch.recipients[currentIndexRef.current];
      
      if (recipient.status === 'pending') {
        const success = await sendEmail(recipient, batch.id);
        
        if (success) {
          recipient.status = 'success';
        } else if (recipient.retryCount < 3) {
          recipient.retryCount++;
          currentIndexRef.current--;
        } else {
          recipient.status = 'failed';
        }

        batch.progress = ((currentIndexRef.current + 1) / totalRecipients) * 100;
        setCurrentBatch(batch);
        await updateDoc(doc(db, 'emailBatches', batch.id), batch);
      }

      currentIndexRef.current++;
    }

    if (currentIndexRef.current >= totalRecipients) {
      batch.status = 'completed';
      batch.completedAt = new Date();
      await updateDoc(doc(db, 'emailBatches', batch.id), batch);
      setCurrentBatch(null);
      currentIndexRef.current = 0;
    }

    processingRef.current = false;
  };

  useEffect(() => {
    if (currentBatch && !isPaused) {
      processBatch();
    }
  }, [currentBatch, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (currentBatch) {
      const updatedBatch = { ...currentBatch, status: !isPaused ? 'paused' : 'in_progress' };
      setCurrentBatch(updatedBatch);
      updateDoc(doc(db, 'emailBatches', updatedBatch.id), updatedBatch);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Email Sender</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Textarea
              placeholder="Email Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
            <Textarea
              placeholder="Recipients (one per line, format: name,email,ngoType)"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              rows={5}
            />
            <Button onClick={createNewBatch}>Create New Batch</Button>
          </div>
        </CardContent>
      </Card>

      {currentBatch && (
        <Card>
          <CardHeader>
            <CardTitle>Current Batch Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={currentBatch.progress} />
              <div className="flex justify-between">
                <span>Progress: {Math.round(currentBatch.progress)}%</span>
                <Button onClick={togglePause}>
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>Pending: {currentBatch.recipients.filter(r => r.status === 'pending').length}</div>
                <div>Success: {currentBatch.recipients.filter(r => r.status === 'success').length}</div>
                <div>Failed: {currentBatch.recipients.filter(r => r.status === 'failed').length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
} 