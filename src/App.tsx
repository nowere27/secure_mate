import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ClientDashboard from './pages/ClientDashboard';
import Dashboard from './pages/Dashboard';
import BecomeBodyguard from './pages/BecomeBodyguard';
import BodyguardPending from './pages/BodyguardPending';
import BodyguardDashboard from './pages/BodyguardDashboard';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BenefitsSection from './sections/BenefitsSection';
import AppPreviewSection from './sections/AppPreviewSection';
import BodyguardsSection from './sections/BodyguardsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CoverageSection from './sections/CoverageSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading SecureMate...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/old-dashboard" element={<><Header /><Dashboard /></>} />
          <Route path="/become-bodyguard" element={<BecomeBodyguard />} />
          <Route path="/bodyguard-pending" element={<BodyguardPending />} />
          <Route path="/bodyguard-dashboard" element={<BodyguardDashboard />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/become-bodyguard" element={<BecomeBodyguard />} />
        <Route path="/bodyguard-pending" element={<BodyguardPending />} />
        <Route path="/*" element={
          <>
            <main>
              <HeroSection />
              <HowItWorksSection />
              <BenefitsSection />
              <AppPreviewSection />
              <BodyguardsSection />
              <TestimonialsSection />
              <CoverageSection />
              <PricingSection />
              <FAQSection />
            </main>
            <FooterSection />
          </>
        } />
      </Routes>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Update the document title on component mount
    document.title = 'SecureMate - Your Personal Security, One Tap Away';
  }, []);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;