import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VirtualEPhone from './VirtualEPhone';
import ThreeGlassyPhone from './ThreeGlassyPhone';
import ErrorBoundary from './ErrorBoundary';
import { Cloud, Globe, Zap, Smartphone, Rotate3d, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenPreOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPreOrder }) => {
  const [deviceMode, setDeviceMode] = useState<'virtual' | '3d'>('virtual');

  return (
    <section id="top" className="relative pt-20 pb-12 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden bg-[#03060f]">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-r from-blue-700/20 via-sky-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-[#020408] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Exactly 2 Columns: Left Hero Text / Content, Right Interactive Phone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Text & Features */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div>
              <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Teladu <span className="text-[#0047ff] drop-shadow-[0_0_25px_#0047ff]">V1</span>
                <span className="block text-white font-medium">Cloud ePhone.</span>
              </h1>
              <p className="mt-2 text-sm sm:text-lg font-light text-slate-200">
                Meet the first Cloud ePhone.
              </p>
              {/* Blue accent line */}
              <div className="w-10 sm:w-12 h-1 bg-[#0047ff] rounded-full mt-2.5 sm:mt-4 shadow-[0_0_12px_#0047ff] mx-auto lg:mx-0" />
            </div>

            {/* The 3 Core Features - App Style Micro-Cards */}
            <div className="space-y-2.5 sm:space-y-4 pt-1 sm:pt-2 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2.5 sm:gap-3.5 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/80 bg-blue-950/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,71,255,0.4)] group-hover:scale-105 transition-transform">
                  <Cloud className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">No Physical Device</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Just your account.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3.5 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/80 bg-blue-950/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,71,255,0.4)] group-hover:scale-105 transition-transform">
                  <Globe className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Access Anywhere</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">From any computer.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3.5 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/80 bg-blue-950/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,71,255,0.4)] group-hover:scale-105 transition-transform">
                  <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Instant Activation</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Scan. Login. Go.</p>
                </div>
              </div>
            </div>

            {/* Clear Glassy, Smaller Button */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenPreOrder}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Your Teladu V1 · $29</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
              </button>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                Early bird order · teladuv1@gmail.com
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Virtual ePhone Aligned Right */}
          <div id="virtual-phone" className="lg:col-span-6 flex flex-col items-center lg:items-end relative max-w-full">
            
            {/* Dynamic Neon Glow Effect behind the 3D ePhone */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[450px] sm:h-[550px] bg-gradient-to-tr from-[#0038ff] via-[#0047ff] to-[#00d2ff] blur-[90px] sm:blur-[110px] pointer-events-none rounded-full z-0"
            />

            {/* Viewport Mode Switcher (Clear Glassy, Smaller) */}
            <div className="mb-2 sm:mb-3 p-1 rounded-full bg-slate-950/70 backdrop-blur-xl border border-blue-500/35 flex items-center gap-1 shadow-lg relative z-20">
              <button
                onClick={() => setDeviceMode('virtual')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  deviceMode === 'virtual'
                    ? 'bg-white/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,180,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Virtual Phone</span>
              </button>

              <button
                onClick={() => setDeviceMode('3d')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  deviceMode === '3d'
                    ? 'bg-white/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,180,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Rotate3d className="w-3 h-3" />
                <span>3D Glassy Orbit</span>
              </button>
            </div>

            {/* Virtual ePhone or 3D inspection component */}
            <div className="relative z-10 w-full flex justify-center lg:justify-end max-w-full">
              {deviceMode === 'virtual' ? (
                <VirtualEPhone enableFloating />
              ) : (
                <ErrorBoundary>
                  <ThreeGlassyPhone onSelectInteractive={() => setDeviceMode('virtual')} />
                </ErrorBoundary>
              )}
            </div>

            <p className="mt-1 text-[10px] sm:text-[11px] text-slate-400 text-center lg:text-right font-mono relative z-20 px-2 sm:pr-4">
              {deviceMode === 'virtual'
                ? 'Tip: The phone is static while tapping buttons, dialpad, or camera.'
                : 'Drag to inspect transparent glass casing, chrome bezel, and glowing blue buttons.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
