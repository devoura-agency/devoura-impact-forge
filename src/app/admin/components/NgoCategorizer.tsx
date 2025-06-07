
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as XLSX from 'xlsx';

interface NgoData {
  name: string;
  email: string;
  ngoType: string;
}

export default function NgoCategorizer() {
  const [categorizedData, setCategorizedData] = useState<Record<string, NgoData[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<NgoData>(worksheet);

        // Categorize data by ngoType
        const categorized: Record<string, NgoData[]> = {};
        jsonData.forEach((item) => {
          if (!item.ngoType) return;
          if (!categorized[item.ngoType]) {
            categorized[item.ngoType] = [];
          }
          categorized[item.ngoType].push(item);
        });

        setCategorizedData(categorized);
        setSuccess('File processed successfully');
        setError(null);
      } catch (err) {
        setError('Error processing file. Please ensure it\'s a valid CSV/Excel file.');
        setSuccess(null);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      setSuccess(null);
    };

    reader.readAsBinaryString(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const downloadCategorizedFile = (ngoType: string, data: NgoData[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, ngoType);
    
    // Convert ngoType to filename format
    const filename = `${ngoType.replace(/-/g, '_')}_ngo.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>NGO Categorizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              Upload CSV/Excel File
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {Object.entries(categorizedData).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Categorized NGOs</h3>
              <div className="grid gap-4">
                {Object.entries(categorizedData).map(([ngoType, data]) => (
                  <Card key={ngoType}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium capitalize">
                            {ngoType.replace(/-/g, ' ')} NGOs
                          </h4>
                          <p className="text-sm text-gray-500">
                            {data.length} organizations
                          </p>
                        </div>
                        <Button
                          onClick={() => downloadCategorizedFile(ngoType, data)}
                          variant="outline"
                        >
                          Download {ngoType.replace(/-/g, '_')}_ngo.xlsx
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
