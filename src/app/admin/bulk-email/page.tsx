
import BulkEmailSender from '../components/BulkEmailSender';
import EmailHistory from '../components/EmailHistory';

export default function BulkEmailPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Bulk Email Management</h1>
      <BulkEmailSender />
      <EmailHistory />
    </div>
  );
}
