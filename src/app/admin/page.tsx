
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import CallRequests from "./components/CallRequests";
import ContactRequests from "./components/ContactRequests";
import WebsiteTemplates from "./components/WebsiteTemplates";
import BulkEmail from "./components/BulkEmail";

export default function AdminPanel() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Quick Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Bulk Email Sender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Send bulk emails to NGOs with retry logic, progress tracking, and pause/resume functionality.
            </p>
            <Button 
              onClick={() => router.push('/admin/bulk-email')}
              className="w-full"
            >
              Open Bulk Email Sender
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              NGO Categorizer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Upload CSV/Excel files and automatically categorize NGOs by type for easy management.
            </p>
            <Button 
              onClick={() => router.push('/admin/categorizer')}
              className="w-full"
            >
              Open NGO Categorizer
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="call-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="call-requests">Call Requests</TabsTrigger>
          <TabsTrigger value="contact-requests">Contact Requests</TabsTrigger>
          <TabsTrigger value="templates">Website Templates</TabsTrigger>
          <TabsTrigger value="bulk-email">Bulk Email</TabsTrigger>
        </TabsList>

        <TabsContent value="call-requests">
          <CallRequests />
        </TabsContent>

        <TabsContent value="contact-requests">
          <ContactRequests />
        </TabsContent>

        <TabsContent value="templates">
          <WebsiteTemplates />
        </TabsContent>

        <TabsContent value="bulk-email">
          <BulkEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
