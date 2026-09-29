import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VirtualEPhone from './VirtualEPhone';
import ThreeGlassyPhone from './ThreeGlassyPhone';
import { Cloud, Globe, Zap, Smartphone, Rotate3d, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenPreOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPreOrder }) => {
  const [deviceMode, setDeviceMode] = useState<'virtual' | '3d'>('virtual');

  return (
    <section id="top" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#03060f]">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-blue-700/20 via-sky-500/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020408] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Exactly 2 Columns: Left Hero Text / Content, Right Interactive Phone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Text & Features (No internal Teladu logo, only normal clean text) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Teladu <span className="text-[#0047ff] drop-shadow-[0_0_25px_#0047ff]">V1</span>
                <span className="block text-white font-medium">Cloud ePhone.</span>
              </h1>
              <p className="mt-3 text-lg font-light text-slate-200">
                Meet the first Cloud ePhone.
              </p>
              {/* Blue accent line from T-V1.png */}
              <div className="w-12 h-1 bg-[#0047ff] rounded-full mt-4 shadow-[0_0_12px_#0047ff]" />
            </div>

            {/* The 3 Core Features from T-V1.png */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full border-2 border-blue-500/80 bg-blue-950/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,71,255,0.4)] group-hover:scale-105 transition-transform">
                  <Cloud className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">No Physical Device</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Just your account.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full border-2 border-blue-500/80 bg-blue-950/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,71,255,0.4)] group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">Access Anywhere</h4>
                  <p className="text-xs text-slate-400 mt-0.5">From any computer.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full border-2 border-blue-500/80 bg-blue-950/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,71,255,0.4)] group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">Instant Activation</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Scan. Login. Go.</p>
                </div>
              </div>
            </div>

            {/* Button: White with blue text and neon blue halo around button */}
            <div className="pt-4">
              <button
                onClick={onOpenPreOrder}
                className="px-8 py-4 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,56,255,0.6)] hover:shadow-[0_0_35px_rgba(0,56,255,0.9)] hover:bg-slate-50 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>Get Your Teladu V1 · $29</span>
                <ArrowRight className="w-4 h-4 text-[#0038ff]" />
              </button>
              <div className="text-[11px] font-mono text-slate-400 mt-2.5">
                Early bird pre-order · Inquiries: teladuv1@gmail.com
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Virtual ePhone Aligned Right with Dynamic Pulsing Neon Glow */}
          <div id="virtual-phone" className="lg:col-span-6 flex flex-col items-center lg:items-end relative">
            
            {/* Dynamic Neon Glow Effect behind the 3D ePhone pulsing in sync with breathing animation */}
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[550px] bg-gradient-to-tr from-[#0038ff] via-[#0047ff] to-[#00d2ff] blur-[110px] pointer-events-none rounded-full z-0"
            />

            {/* Viewport Mode Switcher */}
            <div className="mb-3 p-1 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-blue-500/40 flex items-center gap-1 shadow-lg relative z-20">
              <button
                onClick={() => setDeviceMode('virtual')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  deviceMode === 'virtual'
                    ? 'bg-white text-[#0038ff] shadow-[0_0_15px_rgba(0,56,255,0.6)] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Interactive Virtual Phone</span>
              </button>

              <button
                onClick={() => setDeviceMode('3d')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  deviceMode === '3d'
                    ? 'bg-white text-[#0038ff] shadow-[0_0_15px_rgba(0,56,255,0.6)] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5" />
                <span>3D Glassy Orbit</span>
              </button>
            </div>

            {/* Virtual ePhone or 3D inspection component */}
            <div className="relative z-10 w-full flex justify-center lg:justify-end">
              {deviceMode === 'virtual' ? (
                <VirtualEPhone enableFloating />
              ) : (
                <ThreeGlassyPhone onSelectInteractive={() => setDeviceMode('virtual')} />
              )}
            </div>

            <p className="mt-1 text-[11px] text-slate-400 text-center lg:text-right font-mono relative z-20 pr-4">
              {deviceMode === 'virtual'
                ? 'Tip: Test the power button, volume buttons, dialpad, or camera on your computer.'
                : 'Drag to inspect transparent glass casing, chrome bezel, and glowing blue buttons.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
