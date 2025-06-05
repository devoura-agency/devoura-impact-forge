
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { parseCSVFile, parseExcelFile } from '../utils/fileParser';
import { Recipient } from '../types';

interface FileUploadProps {
  onDataParsed: (data: Recipient[]) => void;
}

export default function FileUpload({ onDataParsed }: FileUploadProps) {
  const [fileData, setFileData] = useState<Recipient[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    try {
      let data: Recipient[] = [];
      
      if (ext === 'csv') {
        data = await parseCSVFile(file);
      } else if (ext === 'xls' || ext === 'xlsx') {
        data = await parseExcelFile(file);
      } else {
        toast({ title: 'Error', description: 'Unsupported file type. Please use CSV or Excel files.', variant: 'destructive' });
        return;
      }
      
      setFileData(data);
      toast({ 
        title: 'File Parsed Successfully', 
        description: `Found ${data.length} valid entries. Click 'Add to List' to review them.` 
      });
    } catch (error) {
      console.error('File parsing error:', error);
      toast({ title: 'Error', description: 'Failed to parse file. Please check the format.', variant: 'destructive' });
    }
  };

  const handleAddFileData = () => {
    if (fileData.length === 0) {
      toast({ title: 'Error', description: 'No valid data to add', variant: 'destructive' });
      return;
    }
    onDataParsed(fileData);
    setFileData([]);
    // Clear the file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    toast({ title: 'Success', description: `Added ${fileData.length} entries to the list` });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <Label htmlFor="file-upload">Upload CSV or Excel File</Label>
          <Input 
            id="file-upload"
            type="file" 
            accept=".csv,.xls,.xlsx" 
            onChange={handleFileUpload}
          />
        </div>
        <Button 
          onClick={handleAddFileData}
          disabled={fileData.length === 0}
          className="bg-brand-green hover:bg-brand-green-light text-white"
        >
          Add to List ({fileData.length})
        </Button>
      </div>
      
      {fileData.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            <strong>Ready to add:</strong> {fileData.length} valid entries found in your file.
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Expected columns: name, email, ngoType (or variations like Name, Email, NGO Type)
          </p>
        </div>
      )}
    </div>
  );
}
