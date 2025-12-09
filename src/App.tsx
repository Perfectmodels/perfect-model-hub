import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Models from "./pages/Models";
import ModelDetail from "./pages/ModelDetail";
import Casting from "./pages/Casting";
import CastingApply from "./pages/CastingApply";
import Services from "./pages/Services";
import Magazine from "./pages/Magazine";
import FashionDay from "./pages/FashionDay";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ModelDashboard from "./pages/ModelDashboard";
import Dashboard from "./pages/admin/Dashboard";
import CastingApplications from "./pages/admin/CastingApplications";
import CastingLive from "./pages/admin/CastingLive";
import ModelsManagement from "./pages/admin/ModelsManagement";
import PaymentsManagement from "./pages/admin/PaymentsManagement";
import AbsencesManagement from "./pages/admin/AbsencesManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/:id" element={<ModelDetail />} />
            <Route path="/casting" element={<Casting />} />
            <Route path="/casting/apply" element={<CastingApply />} />
            <Route path="/services" element={<Services />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/fashion-day" element={<FashionDay />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/model-dashboard" element={<ModelDashboard />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/casting" element={<CastingApplications />} />
            <Route path="/admin/casting-live" element={<CastingLive />} />
            <Route path="/admin/models" element={<ModelsManagement />} />
            <Route path="/admin/payments" element={<PaymentsManagement />} />
            <Route path="/admin/absences" element={<AbsencesManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
