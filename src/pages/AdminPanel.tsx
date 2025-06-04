import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { LogOut, Users, Mail, Globe, Upload, Plus } from 'lucide-react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallRequests from "../app/admin/components/CallRequests";
import ContactRequests from "../app/admin/components/ContactRequests";
import WebsiteTemplates from "../app/admin/components/WebsiteTemplates";
import BulkEmail from "../app/admin/components/BulkEmail";

// Existing website links data
const existingWebsites = [
  {
    link: "https://devoura-impact-forge.vercel.app/templates/ngo1",
    category: "NGO",
    tag: "starter"
  },
  {
    link: "https://devoura-impact-forge.vercel.app/templates/ngo2",
    category: "NGO",
    tag: "starter"
  },
  {
    link: "https://devoura-impact-forge.vercel.app/templates/ngo3",
    category: "NGO",
    tag: "starter"
  },
  {
    link: "https://devoura-impact-forge.vercel.app/templates/ngo4",
    category: "NGO",
    tag: "starter"
  },
  {
    link: "https://devoura-impact-forge.vercel.app/templates/ngo5",
    category: "NGO",
    tag: "starter"
  },
  {
    link: "https://devoura-impact-forge.vercel.app/templates/ngo6",
    category: "NGO",
    tag: "starter"
  }
];

const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isSavingWebsites, setIsSavingWebsites] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
    } catch (error) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const saveExistingWebsites = async () => {
    setIsSavingWebsites(true);
    try {
      const websitesRef = collection(db, 'websites');
      
      // Check if websites already exist
      const q = query(websitesRef, where('tag', '==', 'starter'));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        alert('Websites already exist in the database!');
        return;
      }

      // Add each website to Firestore
      for (const website of existingWebsites) {
        await addDoc(websitesRef, {
          ...website,
          createdAt: new Date().toISOString()
        });
      }
      
      alert('Successfully saved all website templates!');
    } catch (error) {
      console.error('Error saving websites:', error);
      alert('Error saving websites. Please try again.');
    } finally {
      setIsSavingWebsites(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-brand-green">Admin Login</CardTitle>
              <p className="text-gray-600">Access the Devoura admin panel</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    className="focus:ring-brand-green focus:border-brand-green"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    className="focus:ring-brand-green focus:border-brand-green"
                  />
                </div>
                {loginError && (
                  <p className="text-red-600 text-sm text-center">{loginError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-light text-white"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-brand-green">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Tabs for admin sections */}
          <Tabs defaultValue="call-requests" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
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
      </div>
    </div>
  );
};

export default AdminPanel;
