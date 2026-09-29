import React from 'react';
import { EPHONE_ASSETS } from '../assets';
import { Shield, BatteryCharging, Cpu, Waves, Sparkles, Zap } from 'lucide-react';

export const HardwareBentoSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#06090e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              Uncompromising Industrial Craft
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              04. Engineered Beyond Limits
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Every millimeter of the Teladu ePhone is manufactured with tolerances under 5 microns for unmatched rigidity,
            thermal efficiency, and tactile beauty.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 4 Colorways Group Showcase (Col Span 7) */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-white/10 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Four Titanium Finishes</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Natural. Obsidian. Cobalt. Ceramic.
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-lg leading-relaxed font-light">
                Grade 5 titanium bonded to a nano-ceramic matte glass rear plate. Physical vapor deposition (PVD) ensures
                diamond-level scratch resilience.
              </p>
            </div>

            <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 relative">
              <img
                src={EPHONE_ASSETS.colorwaysLineup}
                alt="Lineup of four Teladu ePhone models in Natural Titanium, Obsidian, Cobalt, and Ceramic"
                className="w-full h-auto object-cover max-h-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                <span>Micro-Blasted Aerospace Finish</span>
                <span className="font-mono">100% RECYCLED TITANIUM</span>
              </div>
            </div>
          </div>

          {/* Card 2: Teladu N1 Silicon (Col Span 5) */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>3nm GAA Transistor Architecture</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Teladu N1 Bionic Chip
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
                24 billion transistors power a 16-core CPU, 32-core GPU with hardware ray tracing, and a 60 TOPS neural
                matrix for instant spatial intelligence.
              </p>

              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Neural Processing Throughput</span>
                    <span className="font-mono text-cyan-400 font-semibold">60 TOPS</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Ray Tracing Frame Latency</span>
                    <span className="font-mono text-cyan-400 font-semibold">3.8ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>TSMC 3-Nanometer Gate-All-Around</span>
              <span className="font-mono text-white">45% Power Reduction</span>
            </div>
          </div>

          {/* Card 3: Lifestyle & Spatial Experience (Col Span 5) */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-white/10 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10 mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Teladu Spatial OS</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Designed for Fluid Interaction
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
                A seamless glass UI that responds to eye tracking, micro-gestures, and natural voice grounding.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 relative">
              <img
                src={EPHONE_ASSETS.lifestyleDisplay}
                alt="Modern lifestyle shot of a user holding the Teladu ePhone showing its edge-to-edge display"
                className="w-full h-auto object-cover max-h-64 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white">
                <span>Natural Ambient Immersion</span>
              </div>
            </div>
          </div>

          {/* Card 4: Battery & MagFlow Charging (Col Span 7) */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>5,200mAh Silicon-Carbon Cell</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                38-Hour Autonomy. 0 to 70% in 18 Minutes.
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-lg leading-relaxed font-light">
                High-density silicon-carbon anode chemistry stores 28% more energy in a thinner footprint. MagFlow 50W
                wireless inductive alignment locks cleanly to all Teladu magnetic accessories.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">38h</div>
                  <div className="text-xs text-slate-400 mt-1">Continuous Video Playback</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">18 min</div>
                  <div className="text-xs text-slate-400 mt-1">0 to 70% Quick Charge</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">1,500</div>
                  <div className="text-xs text-slate-400 mt-1">Battery Cycles at 90%+</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                IP68 Water Submersion up to 6 Meters for 30 Minutes
              </span>
              <span className="font-mono text-white">MagFlow Qi2 Standard</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareBentoSection;
