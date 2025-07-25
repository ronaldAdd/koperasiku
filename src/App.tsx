
//FINAL

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import DocumentDetail from "./pages/Edit";
import DocumentCreate from "./pages/DocumentCreate";
import NotFound from "./pages/NotFound";
import TokenCreate from "./pages/TokenCreate";
import AuthOnlyOffice from "./pages/Auth-onlyoffice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents/create" element={<New />} />
          <Route path="/settings/create-token" element={<TokenCreate />} />
          <Route path="/documents/:fileId" element={<DocumentDetail />} />
          <Route path="/auth-onlyoffice" element={<AuthOnlyOffice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
