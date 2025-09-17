import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Offers from "./pages/Offers";
import Bookings from "./pages/Bookings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import RoomInstructions from "./pages/RoomInstructions";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import { SignupModalProvider } from "@/context/SignupModalContext";

const queryClient = new QueryClient();

import { useEffect } from "react";
import { setupPendingReminders } from "@/services/notifications";

function ReminderInit() {
  useEffect(() => {
    setupPendingReminders();
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ReminderInit />
        <BrowserRouter>
          <SignupModalProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/bookings" element={<Bookings />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/room-instructions" element={<RoomInstructions />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </SignupModalProvider>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
