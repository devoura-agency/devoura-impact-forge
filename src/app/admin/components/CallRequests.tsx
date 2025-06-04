import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CallRequest {
  id: string;
  number: string;
  time: string;
  language: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function CallRequests() {
  const [requests, setRequests] = useState<CallRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'callRequests'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CallRequest[];
      
      setRequests(requestsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const requestRef = doc(db, 'callRequests', id);
      await updateDoc(requestRef, { status });
      
      toast({
        title: 'Success',
        description: `Request marked as ${status}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Call Requests</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Preferred Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {new Date(request.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{request.name || 'N/A'}</TableCell>
              <TableCell>
                <div>
                  <div>{request.number}</div>
                  {request.email && (
                    <div className="text-sm text-gray-500">{request.email}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>{request.language}</TableCell>
              <TableCell>{request.time}</TableCell>
              <TableCell>
                <Badge variant={
                  request.status === 'completed' ? 'default' :
                  request.status === 'rejected' ? 'destructive' :
                  'secondary'
                }>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(request.id, 'completed')}
                    disabled={request.status === 'completed'}
                  >
                    Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(request.id, 'rejected')}
                    disabled={request.status === 'rejected'}
                  >
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 