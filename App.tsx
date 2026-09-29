import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PillarsSection from './components/PillarsSection';
import TechSpecsGlassTable from './components/TechSpecsGlassTable';
import EPhoneFeaturesSection from './components/EPhoneFeaturesSection';
import MascotSection from './components/MascotSection';
import CloudArchitectureSection from './components/CloudArchitectureSection';
import PreOrderModal from './components/PreOrderModal';
import LegalModal from './components/LegalModal';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [preOrderOpen, setPreOrderOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen bg-[#03060f] text-slate-100 flex flex-col font-sans selection:bg-blue-600/40 selection:text-cyan-200">
      {/* Top Navigation Bar */}
      <Navbar onOpenPreOrder={() => setPreOrderOpen(true)} />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Hero Section: Left content, Right interactive virtual ePhone with pulsing neon glow */}
        <Hero onOpenPreOrder={() => setPreOrderOpen(true)} />

        {/* 5 Macro Hardware & Optical Pillars from T-V1.png */}
        <PillarsSection onOpenPreOrder={() => setPreOrderOpen(true)} />

        {/* Detailed Glassmorphism Technical Specifications Table (Hardware, Camera, Battery) */}
        <TechSpecsGlassTable onOpenPreOrder={() => setPreOrderOpen(true)} />

        {/* Complete ePhone Android Features & Capabilities from Teladu Features.png */}
        <EPhoneFeaturesSection onOpenPreOrder={() => setPreOrderOpen(true)} />

        {/* Dancing 3D Neon AI Robot Holding Teladu V1 ePhone with Synthesizer Beat */}
        <MascotSection onOpenPreOrder={() => setPreOrderOpen(true)} />

        {/* Cloud Native Architecture & Virtual eSIM System */}
        <CloudArchitectureSection />
      </main>

      {/* Footer with Teladu V1 Lockup & Active Legal Triggers */}
      <Footer
        onOpenPreOrder={() => setPreOrderOpen(true)}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Early Bird Pre-Order Modal ($29) with Country-Adaptive Payment System (Card, Mobile Money, Bank, Crypto) */}
      <PreOrderModal
        isOpen={preOrderOpen}
        onClose={() => setPreOrderOpen(false)}
      />

      {/* Privacy Policy & Terms of Service Document Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
};

export default App;
