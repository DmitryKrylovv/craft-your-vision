import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import ProviderPage from "./pages/ProviderPage";
import VDSPage from "./pages/VDSPage";
import HostingPage from "./pages/HostingPage";
import DomainsPage from "./pages/DomainsPage";
import DNSPage from "./pages/DNSPage";
import SSLPage from "./pages/SSLPage";
import CloudPage from "./pages/CloudPage";
import DedicatedPage from "./pages/DedicatedPage";
import ColocationPage from "./pages/ColocationPage";
import ProvidersRatingPage from "./pages/ProvidersRatingPage";
import ForProvidersPage from "./pages/ForProvidersPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogEditorPage from "./pages/BlogEditorPage";
import BlogProfilePage from "./pages/BlogProfilePage";
import HelpPage from "./pages/HelpPage";
import DashboardPage from "./pages/DashboardPage";
import ServerManagePage from "./pages/ServerManagePage";
import ColocationManagePage from "./pages/ColocationManagePage";
import DomainManagePage from "./pages/DomainManagePage";
import SupportPage from "./pages/SupportPage";
import FinancesPage from "./pages/FinancesPage";
import OrderPage from "./pages/OrderPage";
import AboutPage from "./pages/AboutPage";
import SmartHandsPage from "./pages/SmartHandsPage";
import SmartHandsCareersPage from "./pages/SmartHandsCareersPage";
import FreelancePage from "./pages/FreelancePage";
import FreelanceSpecialistsPage from "./pages/FreelanceSpecialistsPage";
import FreelanceCreateResumePage from "./pages/FreelanceCreateResumePage";
import FreelanceVacancyPage from "./pages/FreelanceVacancyPage";
import FreelanceResumePage from "./pages/FreelanceResumePage";
import GPUPage from "./pages/GPUPage";
 import AntiAbusePage from "./pages/AntiAbusePage";
 import PloozaPayPage from "./pages/PloozaPayPage";
import MigrationPage from "./pages/MigrationPage";
import ResellerPage from "./pages/ResellerPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// Provider Panel
import ProviderLayout from "./components/provider/ProviderLayout";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderLocations from "./pages/provider/ProviderLocations";
import ProviderTariffs from "./pages/provider/ProviderTariffs";
import ProviderIntegrations from "./pages/provider/ProviderIntegrations";
import ProviderReviews from "./pages/provider/ProviderReviews";
import ProviderStats from "./pages/provider/ProviderStats";
import ProviderTeam from "./pages/provider/ProviderTeam";
import ProviderSettings from "./pages/provider/ProviderSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationsProvider>
        <RoleProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vds" element={<VDSPage />} />
              <Route path="/hosting" element={<HostingPage />} />
              <Route path="/domains" element={<DomainsPage />} />
              <Route path="/dns" element={<DNSPage />} />
              <Route path="/ssl" element={<SSLPage />} />
              <Route path="/cloud" element={<CloudPage />} />
              <Route path="/dedicated" element={<DedicatedPage />} />
              <Route path="/gpu" element={<GPUPage />} />
               <Route path="/anti-abuse" element={<AntiAbusePage />} />
               <Route path="/pay" element={<PloozaPayPage />} />
              <Route path="/colocation" element={<ColocationPage />} />
              <Route path="/migration" element={<MigrationPage />} />
              <Route path="/reseller" element={<ResellerPage />} />
              <Route path="/providers" element={<ProvidersRatingPage />} />
              <Route path="/for-providers" element={<ForProvidersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/post/:postId" element={<BlogPostPage />} />
              <Route path="/blog/profile/:username" element={<BlogProfilePage />} />
              <Route path="/blog/editor" element={<BlogEditorPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/order" element={<OrderPage />} />
              <Route path="/dashboard/server/:serverId" element={<ServerManagePage />} />
              <Route path="/dashboard/colocation/:colocationId" element={<ColocationManagePage />} />
              <Route path="/dashboard/domain/:domainId" element={<DomainManagePage />} />
              <Route path="/dashboard/support" element={<SupportPage />} />
              <Route path="/dashboard/finances" element={<FinancesPage />} />
              <Route path="/provider/:providerId" element={<ProviderPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/smart-hands" element={<SmartHandsPage />} />
              <Route path="/smart-hands/careers" element={<SmartHandsCareersPage />} />
              
              {/* Freelance Platform */}
              <Route path="/freelance" element={<FreelancePage />} />
              <Route path="/freelance/specialists" element={<FreelanceSpecialistsPage />} />
              <Route path="/freelance/create-resume" element={<FreelanceCreateResumePage />} />
              <Route path="/freelance/vacancy/:vacancyId" element={<FreelanceVacancyPage />} />
              <Route path="/freelance/resume/:resumeId" element={<FreelanceResumePage />} />
              
              {/* Provider Panel Routes */}
              <Route path="/provider-panel" element={<ProviderLayout />}>
                <Route index element={<ProviderDashboard />} />
                <Route path="locations" element={<ProviderLocations />} />
                <Route path="tariffs" element={<ProviderTariffs />} />
                <Route path="integrations" element={<ProviderIntegrations />} />
                <Route path="reviews" element={<ProviderReviews />} />
                <Route path="stats" element={<ProviderStats />} />
                <Route path="team" element={<ProviderTeam />} />
                <Route path="settings" element={<ProviderSettings />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RoleProvider>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
