import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallRequests from "./components/CallRequests";
import ContactRequests from "./components/ContactRequests";
import WebsiteTemplates from "./components/WebsiteTemplates";
import BulkEmail from "./components/BulkEmail";

export default function AdminPanel() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
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