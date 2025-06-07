
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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

export default function EmailHistory() {
  const [batches, setBatches] = useState<EmailBatch[]>([]);
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'emailBatches'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const batchData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        completedAt: doc.data().completedAt?.toDate()
      })) as EmailBatch[];
      setBatches(batchData);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const getStatusColor = (status: EmailBatch['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      case 'paused': return 'text-yellow-600';
      case 'pending': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Sending History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => (
              <>
                <TableRow key={batch.id}>
                  <TableCell>{formatDate(batch.createdAt)}</TableCell>
                  <TableCell>{batch.subject}</TableCell>
                  <TableCell className={getStatusColor(batch.status)}>
                    {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                  </TableCell>
                  <TableCell>{Math.round(batch.progress)}%</TableCell>
                  <TableCell>{batch.recipients.length}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedBatch(expandedBatch === batch.id ? null : batch.id)}
                    >
                      {expandedBatch === batch.id ? 'Hide Details' : 'Show Details'}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedBatch === batch.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="p-4 bg-gray-50 rounded-md">
                        <h4 className="font-semibold mb-2">Recipients</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>NGO Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Retries</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {batch.recipients.map((recipient, index) => (
                              <TableRow key={index}>
                                <TableCell>{recipient.name}</TableCell>
                                <TableCell>{recipient.email}</TableCell>
                                <TableCell>{recipient.ngoType}</TableCell>
                                <TableCell className={getStatusColor(recipient.status)}>
                                  {recipient.status.charAt(0).toUpperCase() + recipient.status.slice(1)}
                                </TableCell>
                                <TableCell>{recipient.retryCount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
        {batches.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No email batches found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
