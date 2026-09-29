import React from 'react';
import DancingNeonRobot from './DancingNeonRobot';
import { ArrowRight, CheckCircle2, Music } from 'lucide-react';

interface MascotSectionProps {
  onOpenPreOrder: () => void;
}

export const MascotSection: React.FC<MascotSectionProps> = ({ onOpenPreOrder }) => {
  return (
    <section className="relative py-24 bg-[#03050c] border-t border-blue-500/20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-blue-700/15 to-cyan-500/10 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mascot Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>TELADU 3D SPATIAL MASCOT</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Meet the Teladu 3D Mascot.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white mt-1">
                Dancing with Teladu V1.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Engineered in the authentic Teladu brand kit featuring polished white armor, electric blue side plates, and the
              official smiling waving hand emblem. Watch it groove, spin 360°, and dance while holding the 3D crystal-glass Teladu V1 phone.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Frameless 3D spatial presentation with interactive choreographies.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Integrated Web Audio API synthesizer for live cyber-funk beats.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Holding the 3D transparent glass Teladu V1 with glowing neon blue buttons.</span>
              </div>
            </div>

            {/* White Button with Blue Text & Neon Blue Halo */}
            <div className="pt-4">
              <button
                onClick={onOpenPreOrder}
                className="px-8 py-3.5 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,56,255,0.7)] hover:shadow-[0_0_35px_rgba(0,56,255,0.95)] hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Get Early Bird Access · $29</span>
                <ArrowRight className="w-4 h-4 text-[#0038ff]" />
              </button>
            </div>
          </div>

          {/* Right Column: Frameless 3D Dancing Robot standing directly in space */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <DancingNeonRobot />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MascotSection;
