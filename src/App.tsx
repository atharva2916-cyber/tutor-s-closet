import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Parent Pages
import ParentLogin from "./pages/parent/ParentLogin";
import ParentHome from "./pages/parent/ParentHome";
import BookTutor from "./pages/parent/BookTutor";
import ParentBookings from "./pages/parent/ParentBookings";

// Tutor Pages
import TutorLogin from "./pages/tutor/TutorLogin";
import TutorHome from "./pages/tutor/TutorHome";
import TutorEarnings from "./pages/tutor/TutorEarnings";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Parent Routes */}
          <Route path="/parent/login" element={<ParentLogin />} />
          <Route path="/parent" element={<ParentHome />} />
          <Route path="/parent/search" element={<ParentHome />} />
          <Route path="/parent/book/:tutorId" element={<BookTutor />} />
          <Route path="/parent/bookings" element={<ParentBookings />} />
          <Route path="/parent/profile" element={<ParentHome />} />
          
          {/* Tutor Routes */}
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/tutor" element={<TutorHome />} />
          <Route path="/tutor/requests" element={<TutorHome />} />
          <Route path="/tutor/schedule" element={<TutorHome />} />
          <Route path="/tutor/earnings" element={<TutorEarnings />} />
          <Route path="/tutor/profile" element={<TutorHome />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
