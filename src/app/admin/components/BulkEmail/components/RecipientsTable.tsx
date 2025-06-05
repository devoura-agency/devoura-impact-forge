
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Recipient, NGO_TYPES } from '../types';

interface RecipientsTableProps {
  recipients: Recipient[];
  onEdit: (index: number, field: keyof Recipient, value: string) => void;
  onDelete: (index: number) => void;
  onClearAll: () => void;
}

export default function RecipientsTable({ recipients, onEdit, onDelete, onClearAll }: RecipientsTableProps) {
  if (recipients.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recipients List ({recipients.length})</h3>
        <Button 
          variant="outline" 
          onClick={onClearAll}
          className="text-red-600 hover:text-red-700"
        >
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>NGO Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipients.map((r, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Input value={r.name} onChange={e => onEdit(idx, 'name', e.target.value)} />
              </TableCell>
              <TableCell>
                <Input value={r.email} onChange={e => onEdit(idx, 'email', e.target.value)} />
              </TableCell>
              <TableCell>
                <Select value={r.ngoType} onValueChange={(value) => onEdit(idx, 'ngoType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select NGO Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {NGO_TYPES.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => onDelete(idx)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
