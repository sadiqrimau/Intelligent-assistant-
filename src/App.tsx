import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import StudentAffairs from "./pages/StudentAffairs";
import Registry from "./pages/Registry";
import Bursary from "./pages/Bursary";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AcademicPrograms from "./pages/AcademicPrograms";
import NotFound from "./pages/NotFound";
import LetterAssistant from "./pages/LetterAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes — require student login */}
            <Route path="/programs" element={<ProtectedRoute><AcademicPrograms /></ProtectedRoute>} />
            <Route path="/portal" element={<ProtectedRoute><StudentPortal /></ProtectedRoute>} />
            <Route path="/student-affairs" element={<ProtectedRoute><StudentAffairs /></ProtectedRoute>} />
            <Route path="/registry" element={<ProtectedRoute><Registry /></ProtectedRoute>} />
            <Route path="/bursary" element={<ProtectedRoute><Bursary /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/letter-assistant" element={<ProtectedRoute><LetterAssistant /></ProtectedRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
