import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Models from "./pages/Models";
import ModelDetail from "./pages/ModelDetail";
import Casting from "./pages/Casting";
import CastingApply from "./pages/CastingApply";
import Services from "./pages/Services";
import Magazine from "./pages/Magazine";
import FashionDay from "./pages/FashionDay";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
