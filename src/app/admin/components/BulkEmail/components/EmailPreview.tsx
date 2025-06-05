
import { getHTMLEmailTemplate } from '../utils/emailTemplates';
import { NGOType } from '../types';

export default function EmailPreview() {
  const sampleHTML = getHTMLEmailTemplate('Sample NGO', 'education');

  return (
    <div className="bg-gray-50 p-4 rounded-md border">
      <strong className="text-sm text-gray-700">Professional HTML Email Preview (Education Template):</strong>
      <div className="mt-4 border rounded-md bg-white" style={{ maxHeight: '400px', overflow: 'auto' }}>
        <div dangerouslySetInnerHTML={{ __html: sampleHTML }} />
      </div>
      <div className="mt-4 text-xs text-gray-500">
        <p className="font-medium">Each email includes:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Professional HTML design with your Devoura logo</li>
          <li>Emotionally engaging content tailored to each NGO type</li>
          <li>Clear statistics and benefits for each sector</li>
          <li>Strong call-to-action buttons linking to your website and wizard</li>
          <li>2+ years experience badge and changemaker messaging</li>
          <li>Mobile-responsive design for all devices</li>
          <li>Professional branding and visual hierarchy</li>
        </ul>
        <p className="mt-2 text-amber-600 font-medium">
          📎 Pitch deck PDF will be automatically attached when available
        </p>
      </div>
    </div>
  );
}
