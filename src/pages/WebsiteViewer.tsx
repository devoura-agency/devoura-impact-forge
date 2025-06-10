import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Monitor, Tablet, Smartphone, MessageCircle } from 'lucide-react';

const DEVICE_SIZES = {
  desktop: { w: 1200, h: 800 },
  tablet: { w: 800, h: 1100 },
  mobile: { w: 375, h: 667 }, // iPhone-like
};

const WebsiteViewer = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const url = params.get('url');
  const name = params.get('name');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const size = DEVICE_SIZES[device];

  if (!url) return <div className="text-center mt-32 text-lg">No website selected.</div>;

  // Use responsive width for smaller screens
  const isSmallScreen = screenWidth < 500;
  const iframeWidth = isSmallScreen ? screenWidth - 32 : size.w;
  const iframeHeight = isSmallScreen ? (iframeWidth / size.w) * size.h : size.h;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-white flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl mb-8 flex items-center gap-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <h2 className="text-2xl font-bold text-brand-green">{name}</h2>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
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

      <div
        className="bg-white rounded-2xl shadow-2xl border-4 border-brand-green overflow-hidden relative"
        style={{
          width: iframeWidth + 24,
          height: iframeHeight + 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Banner Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-brand-green/90 text-white p-4 z-10 flex items-center justify-between">
          <p className="text-sm md:text-base">
            Inspired by this project? Devoura can build a unique, custom website for your NGO. Let's discuss your vision.
          </p>
          <Button
            onClick={() => navigate('/wizard')}
            variant="secondary"
            className="ml-4 bg-white text-brand-green hover:bg-brand-green hover:text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Start Discussion
          </Button>
        </div>

        <iframe
          src={url}
          title={name}
          width={iframeWidth}
          height={iframeHeight}
          className="rounded-xl mt-12" // Added margin-top to account for banner
          style={{
            border: 0,
            background: '#fff',
            display: 'block',
          }}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};

export default WebsiteViewer;
