
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Recipient } from '../types';

export const parseCSVFile = (file: File): Promise<Recipient[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data.map((row: any) => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || ''
        })).filter((r: Recipient) => r.email && r.name);
        resolve(data);
      },
      error: (error) => reject(error)
    });
  });
};

export const parseExcelFile = (file: File): Promise<Recipient[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        if (!bstr) {
          reject(new Error('Failed to read file'));
          return;
        }
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws).map((row: any) => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || ''
        })).filter((r: Recipient) => r.email && r.name);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsBinaryString(file);
  });
};
