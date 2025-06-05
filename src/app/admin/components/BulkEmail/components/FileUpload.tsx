
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        toast({ title: 'Error', description: 'Unsupported file type', variant: 'destructive' });
        return;
      }
      
      setFileData(data);
      toast({ 
        title: 'File Parsed', 
        description: `Found ${data.length} valid entries. Click 'Add to List' to review them.` 
      });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to parse file', variant: 'destructive' });
    }
  };

  const handleAddFileData = () => {
    if (fileData.length === 0) {
      toast({ title: 'Error', description: 'No valid data to add', variant: 'destructive' });
      return;
    }
    onDataParsed(fileData);
    setFileData([]);
    toast({ title: 'Success', description: `Added ${fileData.length} entries to the list` });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />
        <Button 
          onClick={handleAddFileData}
          disabled={fileData.length === 0}
          className="bg-brand-green hover:bg-brand-green-light text-white"
        >
          Add to List ({fileData.length})
        </Button>
      </div>
      {fileData.length > 0 && (
        <div className="text-sm text-gray-600">
          Found {fileData.length} valid entries. Click 'Add to List' to review them.
        </div>
      )}
    </div>
  );
}
