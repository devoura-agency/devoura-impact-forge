import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function WizardRequests() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'wizard-submissions'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setRequests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Wizard Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Design</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Maintenance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.mobile}</TableCell>
              <TableCell>{r.org}</TableCell>
              <TableCell>{r.template}</TableCell>
              <TableCell>{r.design}</TableCell>
              <TableCell>{r.pkg}</TableCell>
              <TableCell>{r.maintenance}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell>{r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {requests.length === 0 && <div className="text-gray-500 text-center py-8">No wizard requests found.</div>}
    </div>
  );
} 