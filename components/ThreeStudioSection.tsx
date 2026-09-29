import React, { useState } from 'react';
import ThreePhoneViewer from './ThreePhoneViewer';
import { Layers, Shield, Sparkles, Cpu, Rotate3d, Compass } from 'lucide-react';

export const ThreeStudioSection: React.FC = () => {
  const [selectedHighlight, setSelectedHighlight] = useState<number>(0);

  const highlights = [
    {
      title: 'Aerospace Grade 5 Titanium',
      detail: 'Forged under 1,200 tons of hydraulic pressure and precision CNC milled for the highest strength-to-weight ratio in consumer electronics.',
      icon: Shield,
    },
    {
      title: 'Modular 3D Layer Architecture',
      detail: 'Switch into Exploded 3D view to reveal the internal Teladu N1 logic board, liquid vapor chamber, and modular sapphire periscope array.',
      icon: Layers,
    },
    {
      title: 'Sub-Millimeter Thermal Loop',
      detail: 'Vapor chamber cooling with graphite micro-fins keeps the N1 neural chip performing at sustained 60 TOPS without thermal throttling.',
      icon: Cpu,
    },
  ];

  return (
    <section id="studio-3d" className="relative py-24 md:py-32 bg-[#05080e] border-y border-white/5 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              Interactive Hardware Laboratory
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              01. Real-Time 3D Spatial Studio
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Drag to rotate 360°, inspect the triple periscope camera module, switch titanium finishes, or engage
            exploded mode to view the interior architecture.
          </p>
        </div>

        {/* 3D Viewport with Three.js */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <ThreePhoneViewer interactive allowExplodedView autoRotateSpeed={0.6} />
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
              <span className="flex items-center gap-1.5">
                <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
                Touch / Click & Drag to Orbit 360°
              </span>
              <span className="font-mono tabular-nums">WebGL 2.0 · 60 FPS PBR Render</span>
            </div>
          </div>

          {/* Interactive Feature Callouts */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedHighlight === idx;
              return (
                <div
                  key={item.title}
                  onClick={() => setSelectedHighlight(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-950/40 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light pl-11">
                    {item.detail}
                  </p>
                </div>
              );
            })}

            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Tip: Toggle <strong>Exploded 3D View</strong> on the top controls to inspect how the front sapphire shield, OLED panel, and logic board disengage along the Z-axis.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeStudioSection;
