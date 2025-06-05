import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Recipient {
  name: string;
  email: string;
  ngoType: string;
}

const NGO_TYPES = [
  'education',
  'women-empowerment',
  'wildlife',
  'community-service',
  'health-and-wellness',
  'disaster-management',
  'other'
] as const;

const getEmailTemplate = (name: string, ngoType: string) => {
  const templates = {
    'education': `
Subject: Transform Educational Lives Through Technology - Your Mission Deserves More

Dear ${name},

Every child deserves quality education, but are outdated systems holding your educational NGO back from reaching more lives?

In today's digital world, educational NGOs that embrace technology see 40% more student engagement and 60% higher donation rates. Yet many incredible organizations like yours struggle with:

✗ Outdated websites that don't reflect your impact
✗ Manual processes that consume precious time
✗ Difficulty showcasing student success stories
✗ Limited reach to potential donors and volunteers

At Devoura, we specialize exclusively in educational NGO digital transformation. We've seen firsthand how the right technology can amplify your mission exponentially.

**What we bring to educational organizations:**
🎓 Student-centered engagement platforms that increase participation
📚 Resource management systems that streamline operations  
💝 Compelling storytelling tools that boost donations by 30%
📊 Real-time impact dashboards that show donors exactly how their money helps

Imagine having a website that doesn't just inform—but inspires action. A platform where potential donors can see exactly how their contribution changes a student's life, where volunteers can easily find ways to help, and where your educational programs reach the students who need them most.

Your mission is too important to be limited by technology barriers.

Best regards,
The Devoura Team

P.S. We're offering a complimentary digital impact assessment for educational NGOs this month. Let's explore your potential together.
`,
    'women-empowerment': `
Subject: Amplify Women's Voices - Your Empowerment Mission Needs the Right Platform

Dear ${name},

Every woman you empower creates a ripple effect that changes families, communities, and generations. But is your current digital presence matching the magnitude of your impact?

Women empowerment NGOs with professional digital platforms see 50% more program applications and 35% higher funding success rates. Yet many powerful organizations struggle with:

✗ Websites that don't capture the strength of your mission
✗ Limited ability to share powerful success stories
✗ Difficulty connecting with women who need your programs
✗ Challenges in showcasing impact to potential funders

At Devoura, we understand that women's empowerment isn't just a cause—it's a movement. And movements need platforms that inspire, engage, and mobilize.

**How we elevate women empowerment organizations:**
💪 Impact storytelling platforms that showcase real transformation
🌟 Community engagement tools that connect women globally
💝 Donation systems that make supporting women's causes effortless
📱 Mobile-optimized platforms reaching women everywhere

Picture this: A website where every visitor immediately understands the life-changing work you do. Where a single mother can easily find your job training program. Where a corporate sponsor sees exactly how their donation creates economic independence for women. Where volunteers can instantly connect with opportunities to make a difference.

Your work changes lives—your digital presence should change minds and open hearts.

Best regards,
The Devoura Team

P.S. We believe so strongly in women's empowerment that we're offering priority scheduling for organizations like yours. Your mission can't wait—neither should your digital transformation.
`,
    'wildlife': `
Subject: Save More Wildlife - Your Conservation Mission Needs Digital Innovation

Dear ${name},

Every species you protect and every habitat you preserve matters more than ever. But are outdated digital tools limiting your conservation impact when wildlife needs you most?

Wildlife conservation NGOs with modern digital platforms reach 3x more supporters and secure 45% more funding. Yet many crucial organizations face:

✗ Websites that don't convey the urgency of conservation
✗ Difficulty sharing real-time wildlife updates
✗ Limited ability to connect supporters with conservation actions
✗ Challenges showcasing conservation success stories

At Devoura, we believe that saving wildlife requires both field expertise and digital innovation. We specialize in creating platforms that make conservation compelling and action urgent.

**How we support wildlife conservation missions:**
🐾 Real-time wildlife tracking and monitoring dashboards
🌍 Interactive conservation maps showing immediate impact
💚 Urgent action alert systems for conservation emergencies
📸 Powerful visual storytelling that moves hearts and opens wallets

Imagine a website where visitors can watch your conservation work happen in real-time. Where a nature lover can instantly adopt an endangered animal. Where a concerned citizen can immediately take action to protect a threatened habitat. Where corporate sponsors see exactly how their support saves species from extinction.

Every day delayed is another day wildlife faces threats without your maximum impact.

Best regards,
The Devoura Team

P.S. We're offering expedited development for wildlife conservation organizations because we know every moment counts. Let's get your conservation mission the digital power it needs—today.
`,
    'community-service': `
Subject: Strengthen Communities - Your Service Mission Deserves Maximum Impact

Dear ${name},

Strong communities are built by organizations like yours, one service at a time. But are digital limitations preventing you from reaching everyone who needs your help?

Community service organizations with professional digital presence serve 60% more people and attract 40% more volunteers. Yet many dedicated organizations struggle with:

✗ Outdated systems that slow down service delivery
✗ Difficulty connecting with community members who need help
✗ Limited visibility for volunteer opportunities
✗ Challenges showing funders your real community impact

At Devoura, we know that community service is about connection, accessibility, and impact. We create digital solutions that bring communities together and make getting help easier.

**How we amplify community service organizations:**
🏘️ Community resource maps connecting people with services
🤝 Volunteer coordination systems that maximize helping hands
📋 Service request platforms that streamline assistance
💝 Impact visualization showing real community transformation

Envision a digital hub where community members instantly find the help they need. Where volunteers easily discover meaningful ways to serve. Where local businesses see exactly how their support strengthens neighborhoods. Where every service you provide creates visible, shareable impact.

Your community deserves access to every resource and service you offer.

Best regards,
The Devoura Team

P.S. Strong communities start with strong organizations. We're prioritizing community service NGOs because we believe in the ripple effect of local impact. Let's strengthen your community together.
`,
    'health-and-wellness': `
Subject: Heal More Lives - Your Health Mission Needs Digital Innovation

Dear ${name},

Every life you touch through health and wellness services creates waves of healing that extend to families and communities. But are digital barriers limiting how many people you can help?

Health and wellness NGOs with modern digital platforms reach 70% more patients and secure 50% more medical funding. Yet many vital organizations face challenges:

✗ Systems that slow down patient care and service delivery
✗ Difficulty connecting with people who need health services
✗ Limited ability to share health education and resources
✗ Challenges demonstrating health outcomes to funders

At Devoura, we understand that health is urgent and wellness is essential. We create digital solutions that make healthcare accessible and wellness achievable for everyone.

**How we support health and wellness missions:**
🏥 Patient management systems that streamline care delivery
💊 Health resource libraries accessible to entire communities
📱 Telemedicine integration for remote health support
📊 Health outcome tracking that proves your life-saving impact

Imagine a platform where patients easily access your health services. Where families find crucial health education when they need it most. Where medical volunteers quickly connect with opportunities to heal. Where donors see exactly how their support saves lives and improves health outcomes.

Every person deserves access to the health and wellness services you provide.

Best regards,
The Devoura Team

P.S. Health can't wait, and neither should your digital transformation. We're offering priority development for health organizations because every day means more lives you could be reaching.
`,
    'disaster-management': `
Subject: Save More Lives - Crisis Response Needs Instant Digital Solutions

Dear ${name},

When disaster strikes, every second counts. Every life you save and every family you help recover matters immensely. But are outdated systems slowing down your life-saving response?

Disaster management organizations with modern digital command centers respond 50% faster and coordinate 3x more effective relief efforts. Yet many critical organizations struggle with:

✗ Communication systems that fail during emergencies
✗ Slow resource coordination when speed saves lives
✗ Difficulty tracking aid distribution in real-time
✗ Limited ability to show donors immediate crisis impact

At Devoura, we know that disaster response is about speed, coordination, and saving lives. We create emergency-ready digital solutions that perform when it matters most.

**How we power disaster response organizations:**
🚨 Real-time emergency coordination dashboards
📍 Live resource tracking and distribution systems
📱 Mobile-first communication for field teams
🆘 Instant donor alert systems for emergency funding

Picture this: A command center where you instantly coordinate rescue efforts across multiple locations. Where emergency supplies are tracked in real-time from donation to distribution. Where affected families quickly find aid and shelter. Where emergency donors see immediate impact and respond instantly to urgent needs.

When lives are at stake, your response tools must be flawless.

Best regards,
The Devoura Team

P.S. Disasters don't wait for convenient timing, and neither should your digital preparedness. We're offering emergency priority development because when the next crisis hits, you need to be ready.
`,
    'other': `
Subject: Amplify Your Impact - Your NGO Mission Deserves Digital Excellence

Dear ${name},

Your NGO exists to solve important problems and create positive change. But are digital limitations preventing you from reaching your full potential and maximum impact?

NGOs with professional digital presence attract 65% more supporters, secure 45% more funding, and reach 3x more beneficiaries. Yet many incredible organizations struggle with:

✗ Websites that don't reflect the importance of their mission
✗ Outdated systems that waste precious time and resources
✗ Difficulty communicating impact to potential supporters
✗ Limited ability to scale their important work

At Devoura, we believe every NGO mission matters and deserves the best digital tools to succeed. We specialize exclusively in NGO digital transformation because we understand your unique challenges and opportunities.

**How we amplify NGO missions across all sectors:**
🎯 Mission-focused websites that inspire immediate action
💝 Integrated donation systems that increase giving by 30%
🤝 Volunteer management platforms that maximize community support
📊 Impact dashboards that prove your value to funders

Envision having digital tools that work as hard as you do for your cause. A website where visitors instantly understand why your mission matters and how they can help. Systems that automate tedious tasks so you focus on changing lives. Platforms that turn one-time supporters into lifelong advocates.

Your mission is too important to be held back by poor digital infrastructure.

Best regards,
The Devoura Team

P.S. Great missions deserve great tools. We're offering comprehensive digital assessments for mission-driven organizations because we believe in maximizing impact for good. Your community needs what you offer—let's make sure they can find it.
`
  };

  return templates[ngoType as keyof typeof templates] || templates.other;
};

export default function BulkEmail() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [manualEntry, setManualEntry] = useState<Recipient>({ name: '', email: '', ngoType: '' });
  const [sending, setSending] = useState(false);
  const [fileData, setFileData] = useState<Recipient[]>([]);
  const { toast } = useToast();

  // Handle file upload and parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data.map((row: any) => ({
            name: row.name || row.Name || '',
            email: row.email || row.Email || '',
            ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || ''
          })).filter((r: Recipient) => r.email && r.name);
          setFileData(data);
          toast({ 
            title: 'File Parsed', 
            description: `Found ${data.length} valid entries. Click 'Add to List' to review them.` 
          });
        },
        error: () => toast({ title: 'Error', description: 'Failed to parse CSV', variant: 'destructive' })
      });
    } else if (ext === 'xls' || ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        if (!bstr) return;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws).map((row: any) => ({
          name: row.name || row.Name || '',
          email: row.email || row.Email || '',
          ngoType: row.ngoType || row['ngo-type'] || row['NGO Type'] || ''
        })).filter((r: Recipient) => r.email && r.name);
        setFileData(data);
        toast({ 
          title: 'File Parsed', 
          description: `Found ${data.length} valid entries. Click 'Add to List' to review them.` 
        });
      };
      reader.readAsBinaryString(file);
    } else {
      toast({ title: 'Error', description: 'Unsupported file type', variant: 'destructive' });
    }
  };

  // Add file data to recipients
  const handleAddFileData = () => {
    if (fileData.length === 0) {
      toast({ title: 'Error', description: 'No valid data to add', variant: 'destructive' });
      return;
    }
    setRecipients([...recipients, ...fileData]);
    setFileData([]);
    toast({ title: 'Success', description: `Added ${fileData.length} entries to the list` });
  };

  // Manual entry add
  const handleAddManual = () => {
    if (!manualEntry.name || !manualEntry.email || !manualEntry.ngoType) {
      toast({ title: 'Error', description: 'Name, Email, and NGO Type are required', variant: 'destructive' });
      return;
    }
    setRecipients([...recipients, manualEntry]);
    setManualEntry({ name: '', email: '', ngoType: '' });
  };

  // Edit row
  const handleEdit = (idx: number, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  // Delete row
  const handleDelete = (idx: number) => {
    setRecipients(recipients.filter((_, i) => i !== idx));
  };

  // Send emails
  const handleSendEmails = async () => {
    setSending(true);
    let success = 0;
    let fail = 0;
    let noAttachments = 0;

    for (const r of recipients) {
      try {
        const res = await fetch('/api/bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: r.name,
            email: r.email,
            ngoType: r.ngoType,
            subject: 'Devoura NGO Collaboration',
            text: getEmailTemplate(r.name, r.ngoType),
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          success++;
          if (!data.attachmentsIncluded) {
            noAttachments++;
          }
        } else {
          fail++;
        }
      } catch {
        fail++;
      }
    }

    // Save batch to Firestore
    try {
      await addDoc(collection(db, 'bulkEmailBatches'), {
        sentAt: new Date().toISOString(),
        recipients,
        status: 'completed',
        stats: {
          success,
          fail,
          noAttachments
        }
      });
    } catch (err) {
      toast({ title: 'Warning', description: 'Emails sent but failed to save batch to database', variant: 'destructive' });
    }

    setSending(false);
    
    // Show appropriate toast message
    if (fail === 0) {
      if (noAttachments > 0) {
        toast({
          title: 'Emails Sent (Without Pitch Deck)',
          description: `Successfully sent ${success} emails, but pitch deck was not attached. Please ensure the PDF is in the correct location.`,
          variant: 'default'
        });
      } else {
        toast({
          title: 'Success',
          description: `Successfully sent ${success} emails with pitch deck attached.`,
          variant: 'default'
        });
      }
      setRecipients([]);
    } else {
      toast({
        title: 'Partial Success',
        description: `Sent: ${success}, Failed: ${fail}${noAttachments > 0 ? ', No Pitch Deck: ' + noAttachments : ''}`,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bulk Email Sender</h2>
      
      {/* File Upload Section */}
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

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      {/* Manual Entry Section */}
      <div className="flex gap-2">
        <Input placeholder="Name" value={manualEntry.name} onChange={e => setManualEntry({ ...manualEntry, name: e.target.value })} />
        <Input placeholder="Email" value={manualEntry.email} onChange={e => setManualEntry({ ...manualEntry, email: e.target.value })} />
        <Select value={manualEntry.ngoType} onValueChange={(value) => setManualEntry({ ...manualEntry, ngoType: value })}>
          <SelectTrigger className="w-[200px]">
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
        <Button onClick={handleAddManual}>Add</Button>
      </div>
      
      {/* Recipients Table */}
      {recipients.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recipients List ({recipients.length})</h3>
            <Button 
              variant="outline" 
              onClick={() => setRecipients([])}
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
                    <Input value={r.name} onChange={e => handleEdit(idx, 'name', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={r.email} onChange={e => handleEdit(idx, 'email', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Select value={r.ngoType} onValueChange={(value) => handleEdit(idx, 'ngoType', value)}>
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
                    <Button variant="destructive" onClick={() => handleDelete(idx)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Email Preview */}
      <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700">
        <strong>Email Preview (Education Template):</strong>
        <pre className="whitespace-pre-wrap mt-2 text-xs max-h-60 overflow-y-auto">{getEmailTemplate('Sample NGO', 'education')}</pre>
        <div className="mt-4 text-xs text-gray-500">
          Note: Each email will include:
          <ul className="list-disc list-inside mt-1">
            <li>Professional subject line tailored to NGO type</li>
            <li>Emotionally engaging content that creates urgency</li>
            <li>Specific benefits and statistics for each sector</li>
            <li>Our pitch deck as a PDF attachment (if available)</li>
            <li>A link to our website (https://devoura.vercel.app)</li>
          </ul>
          <p className="mt-2 text-amber-600">
            Make sure the pitch deck PDF is placed in the public/pitch-deck.pdf location
          </p>
        </div>
      </div>

      {/* Send Button */}
      <Button 
        onClick={handleSendEmails} 
        disabled={sending || recipients.length === 0} 
        className="w-full bg-brand-green hover:bg-brand-green-light text-white"
      >
        {sending ? 'Sending...' : `Continue & Send Emails (${recipients.length})`}
      </Button>
    </div>
  );
}
