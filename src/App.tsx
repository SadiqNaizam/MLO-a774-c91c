import { Toaster as ShadcnToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import PaymentsPage from "./pages/PaymentsPage";
import JointAccountCreationPage from "./pages/JointAccountCreationPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NotFound from "./pages/NotFound"; // Assuming this exists

const queryClient = new QueryClient();

const App = () => {
  console.log('App loaded, routing initialized.');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ShadcnToaster />
        <SonnerToaster richColors position="top-right" /> {/* Configured Sonner */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/account-details/:accountId" element={<AccountDetailsPage />} />
            <Route path="/accounts" element={<DashboardPage />} /> {/* Assuming /accounts shows dashboard or similar overview for BottomTabBar */}
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/joint-account-creation" element={<JointAccountCreationPage />} />
            <Route path="/profile-settings" element={<ProfileSettingsPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;