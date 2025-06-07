
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { FileUp, Download, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

interface NgoData {
  name: string;
  email: string;
  ngoType: string;
}

interface ProcessingStats {
  total: number;
  processed: number;
  categories: number;
  errors: string[];
}

export default function NgoCategorizer() {
  const [categorizedData, setCategorizedData] = useState<Record<string, NgoData[]>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<ProcessingStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    setCategorizedData({});
    setStats(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      
      if (!sheetName) {
        throw new Error('No worksheets found in the file');
      }

      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      if (jsonData.length === 0) {
        throw new Error('The file appears to be empty');
      }

      // Validate required columns
      const firstRow = jsonData[0];
      const requiredColumns = ['name', 'email', 'ngoType'];
      const missingColumns = requiredColumns.filter(col => !(col in firstRow));
      
      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
      }

      const categorized: Record<string, NgoData[]> = {};
      const errors: string[] = [];
      let processed = 0;

      // Process each row
      jsonData.forEach((item, index) => {
        const rowNumber = index + 2; // +2 because index is 0-based and we skip header row
        
        // Validate required fields
        if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
          errors.push(`Row ${rowNumber}: Missing or invalid organization name`);
          return;
        }

        if (!item.email || typeof item.email !== 'string' || item.email.trim() === '') {
          errors.push(`Row ${rowNumber}: Missing email address`);
          return;
        }

        if (!validateEmailFormat(item.email.trim())) {
          errors.push(`Row ${rowNumber}: Invalid email format for ${item.email}`);
          return;
        }

        if (!item.ngoType || typeof item.ngoType !== 'string' || item.ngoType.trim() === '') {
          errors.push(`Row ${rowNumber}: Missing NGO type`);
          return;
        }

        const ngoData: NgoData = {
          name: item.name.trim(),
          email: item.email.trim().toLowerCase(),
          ngoType: item.ngoType.trim().toLowerCase().replace(/\s+/g, '-')
        };

        // Check for duplicate emails within the same category
        if (categorized[ngoData.ngoType]) {
          const existingEmails = categorized[ngoData.ngoType].map(org => org.email);
          if (existingEmails.includes(ngoData.email)) {
            errors.push(`Row ${rowNumber}: Duplicate email ${ngoData.email} in ${ngoData.ngoType} category`);
            return;
          }
        }

        if (!categorized[ngoData.ngoType]) {
          categorized[ngoData.ngoType] = [];
        }
        categorized[ngoData.ngoType].push(ngoData);
        processed++;
      });

      setCategorizedData(categorized);
      
      const processingStats: ProcessingStats = {
        total: jsonData.length,
        processed,
        categories: Object.keys(categorized).length,
        errors
      };
      
      setStats(processingStats);

      if (errors.length > 0) {
        setSuccess(`File processed with ${errors.length} errors. Check the details below.`);
      } else {
        setSuccess(`File processed successfully! Found ${processed} organizations across ${Object.keys(categorized).length} categories.`);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Error processing file: ${errorMessage}`);
      console.error('File processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
        setError('Please select a valid CSV or Excel file (.csv, .xlsx, .xls)');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size too large. Please select a file smaller than 10MB.');
        return;
      }

      processFile(file);
    }
  };

  const downloadCategorizedFile = (ngoType: string, data: NgoData[]) => {
    try {
      // Create worksheet with proper headers
      const worksheet = XLSX.utils.json_to_sheet(data, {
        header: ['name', 'email', 'ngoType']
      });
      
      // Set column widths for better readability
      worksheet['!cols'] = [
        { width: 30 }, // name
        { width: 35 }, // email
        { width: 20 }  // ngoType
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, ngoType.replace(/-/g, '_'));
      
      // Convert ngoType to filename format
      const filename = `${ngoType.replace(/-/g, '_')}_ngo.xlsx`;
      XLSX.writeFile(workbook, filename);
    } catch (err) {
      setError(`Error downloading file for ${ngoType}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const downloadAllFiles = () => {
    Object.entries(categorizedData).forEach(([ngoType, data]) => {
      setTimeout(() => {
        downloadCategorizedFile(ngoType, data);
      }, 100); // Small delay between downloads
    });
  };

  const resetForm = () => {
    setCategorizedData({});
    setStats(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileUp className="w-5 h-5" />
          NGO Categorizer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload a CSV/Excel file with NGO data to categorize and download separate files by NGO type
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              disabled={isProcessing}
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="mb-2"
            >
              {isProcessing ? 'Processing...' : 'Select CSV/Excel File'}
            </Button>
            <p className="text-sm text-gray-500">
              Supported formats: .csv, .xlsx, .xls (Max 10MB)
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Required columns: name, email, ngoType
            </p>
          </div>

          {Object.keys(categorizedData).length > 0 && (
            <div className="flex gap-2">
              <Button onClick={downloadAllFiles} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download All Files
              </Button>
              <Button onClick={resetForm} variant="outline">
                Reset
              </Button>
            </div>
          )}
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Processing file...</span>
            </div>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Processing Statistics */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Processing Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-gray-500">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.processed}</div>
                  <div className="text-sm text-gray-500">Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.categories}</div>
                  <div className="text-sm text-gray-500">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.errors.length}</div>
                  <div className="text-sm text-gray-500">Errors</div>
                </div>
              </div>

              {stats.errors.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-red-600 mb-2">Errors found:</h4>
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 max-h-40 overflow-y-auto">
                    {stats.errors.map((error, index) => (
                      <div key={index} className="text-sm text-red-700 mb-1">
                        • {error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Categorized Results */}
        {Object.entries(categorizedData).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorized NGOs ({Object.entries(categorizedData).length} categories)</h3>
            <div className="grid gap-4">
              {Object.entries(categorizedData)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([ngoType, data]) => (
                <Card key={ngoType} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg capitalize mb-2">
                          {ngoType.replace(/-/g, ' ')} NGOs
                        </h4>
                        <p className="text-sm text-gray-500 mb-3">
                          {data.length} organization{data.length !== 1 ? 's' : ''}
                        </p>
                        
                        {/* Show first few organizations as preview */}
                        <div className="space-y-1 mb-3">
                          {data.slice(0, 3).map((org, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              • {org.name} ({org.email})
                            </div>
                          ))}
                          {data.length > 3 && (
                            <div className="text-sm text-gray-500">
                              ... and {data.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => downloadCategorizedFile(ngoType, data)}
                        variant="outline"
                        size="sm"
                        className="ml-4"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
