
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import WebsiteWizard from './pages/WebsiteWizard';
import StoryPage from './pages/StoryPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import TemplatesPage from './pages/TemplatesPage';
import RequestCall from './pages/RequestCall';
import GeneralContactPage from './pages/GeneralContactPage';
import AdminPanel from './pages/AdminPanel';
import WebsiteViewer from './pages/WebsiteViewer';
import SelectPlanPage from './pages/SelectPlanPage';
import NotFound from './pages/NotFound';
import PitchDeck from './pages/PitchDeck';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wizard" element={<WebsiteWizard />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/request-call" element={<RequestCall />} />
            <Route path="/general-contact" element={<GeneralContactPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/website-viewer" element={<WebsiteViewer />} />
            <Route path="/select-plan" element={<SelectPlanPage />} />
            <Route path="/pitch-deck" element={<PitchDeck />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
