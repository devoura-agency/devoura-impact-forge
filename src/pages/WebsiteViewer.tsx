import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';

const DEVICE_SIZES = {
  desktop: { w: 1200, h: 800 },
  tablet: { w: 800, h: 1100 },
  mobile: { w: 400, h: 800 },
};

const WebsiteViewer = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const url = params.get('url');
  const name = params.get('name');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const size = DEVICE_SIZES[device];

  if (!url) return <div className="text-center mt-32 text-lg">No website selected.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-5xl mb-8 flex items-center gap-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <h2 className="text-2xl font-bold text-brand-green">{name}</h2>
      </div>
      <div className="flex gap-4 mb-6">
        <Button variant={device === 'desktop' ? 'default' : 'outline'} onClick={() => setDevice('desktop')} className="flex items-center gap-2">
          <Monitor className="w-5 h-5" /> Desktop
        </Button>
        <Button variant={device === 'tablet' ? 'default' : 'outline'} onClick={() => setDevice('tablet')} className="flex items-center gap-2">
          <Tablet className="w-5 h-5" /> Tablet
        </Button>
        <Button variant={device === 'mobile' ? 'default' : 'outline'} onClick={() => setDevice('mobile')} className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" /> Mobile
        </Button>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-brand-green" style={{ width: size.w + 24, height: size.h + 24 }}>
        <iframe
          src={url}
          title={name}
          width={size.w}
          height={size.h}
          className="rounded-xl border-0"
          style={{ background: '#fff' }}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};

export default WebsiteViewer; 