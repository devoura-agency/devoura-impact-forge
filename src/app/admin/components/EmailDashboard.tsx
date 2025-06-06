import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Mail, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface EmailStats {
  total: number;
  success: number;
  failed: number;
  pending: number;
  dailyCount: number;
  dailyLimit: number;
}

interface EmailHistory {
  id: string;
  recipient: {
    name: string;
    email: string;
    ngoType: string;
  };
  status: 'success' | 'failed' | 'pending';
  sentAt: string;
  error?: string;
  batchId?: string;
}

interface ScheduledEmail {
  id: string;
  recipient: {
    name: string;
    email: string;
    ngoType: string;
  };
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export default function EmailDashboard() {
  const [stats, setStats] = useState<EmailStats>({
    total: 0,
    success: 0,
    failed: 0,
    pending: 0,
    dailyCount: 0,
    dailyLimit: 100
  });
  const [history, setHistory] = useState<EmailHistory[]>([]);
  const [scheduled, setScheduled] = useState<ScheduledEmail[]>([]);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'scheduled'>('overview');

  // Fetch email statistics
  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split('T')[0];
      const counterRef = collection(db, 'emailCounters');
      const counterDoc = await getDocs(query(counterRef, where('date', '==', today)));
      
      if (!counterDoc.empty) {
        const count = counterDoc.docs[0].data().count;
        setStats(prev => ({ ...prev, dailyCount: count }));
      }
    };

    fetchStats();
  }, []);

  // Fetch email history
  useEffect(() => {
    const q = query(
      collection(db, 'emailHistory'),
      orderBy('sentAt', 'desc'),
      limit(100)
    );

    const unsub = onSnapshot(q, (snap) => {
      const emails = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmailHistory[];

      setHistory(emails);
      setStats(prev => ({
        ...prev,
        total: emails.length,
        success: emails.filter(e => e.status === 'success').length,
        failed: emails.filter(e => e.status === 'failed').length,
        pending: emails.filter(e => e.status === 'pending').length
      }));
    });

    return () => unsub();
  }, []);

  // Fetch scheduled emails
  useEffect(() => {
    const q = query(
      collection(db, 'scheduledEmails'),
      orderBy('scheduledFor', 'asc'),
      where('status', '==', 'pending')
    );

    const unsub = onSnapshot(q, (snap) => {
      const emails = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ScheduledEmail[];
      setScheduled(emails);
    });

    return () => unsub();
  }, []);

  // Prepare chart data
  const chartData = history.reduce((acc, email) => {
    const date = new Date(email.sentAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { date, success: 0, failed: 0 };
    }
    if (email.status === 'success') acc[date].success++;
    if (email.status === 'failed') acc[date].failed++;
    return acc;
  }, {} as Record<string, { date: string; success: number; failed: number }>);

  const chartDataArray = Object.values(chartData).slice(-7);

  const handleCancelScheduled = async (emailId: string) => {
    // Implement cancel scheduled email logic
    try {
      await db.collection('scheduledEmails').doc(emailId).delete();
    } catch (error) {
      console.error('Error canceling scheduled email:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Email Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant={selectedTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={selectedTab === 'history' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('history')}
          >
            History
          </Button>
          <Button
            variant={selectedTab === 'scheduled' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('scheduled')}
          >
            Scheduled
          </Button>
        </div>
      </div>

      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.success} successful, {stats.failed} failed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Usage</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.dailyCount}/{stats.dailyLimit}</div>
              <Progress value={(stats.dailyCount / stats.dailyLimit) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.total ? Math.round((stats.success / stats.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.success} successful deliveries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduled.length}</div>
              <p className="text-xs text-muted-foreground">
                Pending scheduled emails
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email History Chart */}
      {selectedTab === 'overview' && (
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Email Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartDataArray}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="success" stroke="#22c55e" name="Successful" />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email History Table */}
      {selectedTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>Email History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>NGO Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{email.recipient.name}</div>
                        <div className="text-sm text-muted-foreground">{email.recipient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{email.recipient.ngoType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {email.status === 'success' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {email.status === 'failed' && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        {email.status === 'pending' && (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="capitalize">{email.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(email.sentAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {email.error && (
                        <div className="flex items-center gap-2 text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{email.error}</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Scheduled Emails Table */}
      {selectedTab === 'scheduled' && (
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>NGO Type</TableHead>
                  <TableHead>Scheduled For</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduled.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{email.recipient.name}</div>
                        <div className="text-sm text-muted-foreground">{email.recipient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{email.recipient.ngoType}</TableCell>
                    <TableCell>
                      {new Date(email.scheduledFor).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span className="capitalize">{email.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelScheduled(email.id)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 