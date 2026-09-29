import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ToggleRight, Smartphone, Sparkles, Monitor, ArrowRight } from 'lucide-react';

interface MacroTile {
  title: string;
  tagline: string;
  renderType: 'camera' | 'buttons' | 'thin' | 'glass' | 'display';
}

const TILES: MacroTile[] = [
  {
    title: 'Premium Camera System',
    tagline: 'Capture more. Do more.',
    renderType: 'camera',
  },
  {
    title: 'Teladu Blue Buttons',
    tagline: 'Simple. Elegant. Functional.',
    renderType: 'buttons',
  },
  {
    title: 'Ultra Thin Design',
    tagline: 'Light in hand. Big on possibility.',
    renderType: 'thin',
  },
  {
    title: 'Clear Glass Finish',
    tagline: 'Stunning from every angle.',
    renderType: 'glass',
  },
  {
    title: 'Immersive Display',
    tagline: 'Vibrant. Smooth. Brilliant.',
    renderType: 'display',
  },
];

export const PillarsSection: React.FC<{ onOpenPreOrder?: () => void }> = ({ onOpenPreOrder }) => {
  return (
    <section id="pillars" className="relative py-12 sm:py-20 bg-[#03050c] border-t border-blue-500/20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              Architecture & Optical Engineering
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Crafted in Pure Crystal Glass
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            Every feature on the Teladu V1 is precision engineered to combine physical transparent luxury with virtual cloud freedom.
          </p>
        </div>

        {/* The 5 Macro Tiles (Exact Reproduction of T-V1.png Bottom Strip) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {TILES.map((tile, idx) => (
            <motion.div
              key={tile.title}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-blue-500/25 hover:border-cyan-400/60 overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(0,71,255,0.3)] flex flex-col justify-between transition-all ${
                idx === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : ''
              }`}
            >
              {/* Visual Macro Artwork Canvas matching the photo in T-V1.png */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-b from-[#0c1424] to-[#04060d] overflow-hidden flex items-center justify-center p-2.5 sm:p-3">
                {/* 1. Camera Macro Render */}
                {tile.renderType === 'camera' && (
                  <div className="relative w-28 h-28 rounded-full bg-slate-900 border-2 border-slate-700/80 shadow-2xl flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-black border border-blue-500/40 flex flex-col items-center justify-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-blue-600/80 shadow-[0_0_10px_#0047ff]" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-blue-600/80 shadow-[0_0_10px_#0047ff]" />
                      </div>
                    </div>
                    {/* Gold flash dot */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#facc15]" />
                  </div>
                )}

                {/* 2. Blue Buttons Macro Render */}
                {tile.renderType === 'buttons' && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Chrome edge bar */}
                    <div className="w-20 h-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 rounded-sm rotate-12 flex flex-col justify-center items-center gap-4 shadow-xl">
                      {/* Neon Blue Buttons with Intense Glow */}
                      <div className="w-3.5 h-12 rounded-sm bg-blue-600 border border-cyan-300 shadow-[0_0_20px_#0047ff,0_0_8px_#00f0ff]" />
                      <div className="w-3.5 h-12 rounded-sm bg-blue-600 border border-cyan-300 shadow-[0_0_20px_#0047ff,0_0_8px_#00f0ff]" />
                    </div>
                  </div>
                )}

                {/* 3. Ultra Thin Design Macro Render */}
                {tile.renderType === 'thin' && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Diagonal ultra-thin chrome profile */}
                    <div className="w-4 h-36 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 rounded-full rotate-45 border border-white/40 shadow-2xl flex items-center justify-center">
                      <div className="w-1.5 h-10 rounded-full bg-blue-500 shadow-[0_0_12px_#0047ff]" />
                    </div>
                  </div>
                )}

                {/* 4. Clear Glass Finish Macro Render */}
                {tile.renderType === 'glass' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Glass Bottom Port & Speaker holes */}
                    <div className="w-36 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center gap-3 shadow-lg">
                      {/* Left speakers */}
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      </div>
                      {/* USB-C Glass Port */}
                      <div className="w-8 h-3.5 rounded-full border border-blue-400/80 bg-blue-950 flex items-center justify-center shadow-[0_0_8px_#0047ff]">
                        <div className="w-4 h-1 bg-cyan-300 rounded-full" />
                      </div>
                      {/* Right speakers */}
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Immersive Display Macro Render */}
                {tile.renderType === 'display' && (
                  <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#0b162c] via-[#ea580c] to-[#facc15] overflow-hidden flex flex-col items-center pt-2 shadow-inner border border-white/20">
                    {/* Punch hole camera at top */}
                    <div className="w-3 h-3 rounded-full bg-black border border-white/30 shadow-sm" />
                    {/* Sunset clouds & mountain silhouette */}
                    <div className="w-full h-12 mt-auto bg-[#070c18] rounded-t-full" />
                  </div>
                )}

                {/* Glassy reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Text Information matching T-V1.png */}
              <div className="p-4">
                <h3 className="text-xs font-bold text-white tracking-tight">{tile.title}</h3>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">{tile.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
