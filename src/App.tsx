import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
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

function App() {
  useEffect(() => {
    // Update the document title on component mount
    document.title = 'SecureMate - Your Personal Security, One Tap Away';
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
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
          {/* <ContactSection /> */}
        </main>
        <FooterSection />
      </div>
    </AuthProvider>
  );
}

export default App;