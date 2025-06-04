import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TemplatesPage from './pages/TemplatesPage';
import PricingPage from './pages/PricingPage';
import SelectPlanPage from './pages/SelectPlanPage';
import WebsiteWizard from './pages/WebsiteWizard';
import WebsiteViewer from './pages/WebsiteViewer';
import RequestCall from './pages/RequestCall';
import GeneralContactPage from './pages/GeneralContactPage';
import PortfolioPage from './pages/PortfolioPage';
import StoryPage from './pages/StoryPage';
import BlogPage from './pages/BlogPage';
import AdminPanel from './pages/AdminPanel';
import ChatbotFAB from './components/ChatbotFAB';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/select-plan" element={<SelectPlanPage />} />
          <Route path="/wizard" element={<WebsiteWizard />} />
          <Route path="/website-viewer" element={<WebsiteViewer />} />
          <Route path="/request-call" element={<RequestCall />} />
          <Route path="/general-contact" element={<GeneralContactPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/why-ngos" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotFAB />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
