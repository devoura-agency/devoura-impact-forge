import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CATEGORY_OPTIONS = [
  'education',
  'women-empowerment',
  'wildlife',
  'community-service',
  'health-and-wellness',
  'disaster-management',
];

interface Template {
  id: string;
  category: string;
  link: string;
  tag: string;
  createdAt: string;
}

export default function WebsiteTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    category: '',
    link: '',
    tag: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'websites'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const templatesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Template[];
      
      setTemplates(templatesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTemplate = async () => {
    try {
      await addDoc(collection(db, 'websites'), {
        ...newTemplate,
        createdAt: new Date().toISOString(),
      });
      
      setNewTemplate({ category: '', link: '', tag: '' });
      setIsAdding(false);
      
      toast({
        title: 'Success',
        description: 'Template added successfully',
      });
    } catch (error) {
      console.error('Error adding template:', error);
      toast({
        title: 'Error',
        description: 'Failed to add template',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'websites', id));
      
      toast({
        title: 'Success',
        description: 'Template deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete template',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Website Templates</h2>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button>Add Template</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={newTemplate.category}
                  onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Link</label>
                <Input
                  value={newTemplate.link}
                  onChange={(e) => setNewTemplate({ ...newTemplate, link: e.target.value })}
                  placeholder="Template URL"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tag</label>
                <Input
                  value={newTemplate.tag}
                  onChange={(e) => setNewTemplate({ ...newTemplate, tag: e.target.value })}
                  placeholder="e.g., starter, premium"
                />
              </div>
              <Button onClick={handleAddTemplate} className="w-full">
                Add Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.category}</TableCell>
              <TableCell>
                <a 
                  href={template.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {template.link}
                </a>
              </TableCell>
              <TableCell>{template.tag}</TableCell>
              <TableCell>
                {new Date(template.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 