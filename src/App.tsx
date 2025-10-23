
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Forum from "./pages/Forum";
import Wiki from "./pages/Wiki";
import Stats from "./pages/Stats";
import Jobs from "./pages/Jobs";
import Admin from "./pages/Admin";
import AdminProfile from "./pages/AdminProfile";
import Sponsors from "./pages/Sponsors";
import SponsorProfile from "./pages/SponsorProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:username" element={<AdminProfile />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/sponsors/:username" element={<SponsorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;