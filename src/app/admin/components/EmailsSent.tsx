import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function EmailsSent() {
  const [batches, setBatches] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'bulkEmailBatches'), orderBy('sentAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setBatches(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bulk Emails Sent</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sent At</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.map((batch, idx) => (
            <>
              <TableRow key={batch.id}>
                <TableCell>{new Date(batch.sentAt).toLocaleString()}</TableCell>
                <TableCell>{batch.recipients?.length || 0}</TableCell>
                <TableCell>{batch.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setExpanded(expanded === idx ? null : idx)}>
                    {expanded === idx ? 'Hide' : 'View'}
                  </Button>
                </TableCell>
              </TableRow>
              {expanded === idx && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Recipients</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>NGO Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {batch.recipients?.map((r: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{r.name}</TableCell>
                              <TableCell>{r.email}</TableCell>
                              <TableCell>{r.ngoType}</TableCell>
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
      {batches.length === 0 && <div className="text-gray-500 text-center py-8">No bulk email batches found.</div>}
    </div>
  );
} 