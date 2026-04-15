import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentPortal from "./pages/StudentPortal";
import StudentAffairs from "./pages/StudentAffairs";
import Registry from "./pages/Registry";
import Bursary from "./pages/Bursary";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AcademicPrograms from "./pages/AcademicPrograms";
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
          <Route path="/programs" element={<AcademicPrograms />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/student-affairs" element={<StudentAffairs />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/bursary" element={<Bursary />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
