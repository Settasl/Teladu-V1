import React, { useState } from 'react';
import { EPHONE_ASSETS } from '../assets';
import { Camera, Focus, Aperture, SunMedium, Moon, Sliders, Check } from 'lucide-react';

interface LensSpec {
  id: string;
  name: string;
  focalLength: string;
  aperture: string;
  sensor: string;
  description: string;
  highlights: string[];
}

const LENSES: LensSpec[] = [
  {
    id: 'wide',
    name: '200MP Fusion Wide',
    focalLength: '24mm',
    aperture: 'f/1.4',
    sensor: '1/1.12" Custom Super-QIS',
    description: '16-in-1 pixel binning delivers 12.5MP photos with 2.8µm virtual pixels for noise-free low light fidelity.',
    highlights: ['Sub-wavelength sapphire coating', 'Zero-shutter lag at 200MP RAW', 'Dual-pixel autofocus across 100% of sensor'],
  },
  {
    id: 'telephoto',
    name: '50MP Periscope Telephoto',
    focalLength: '120mm (5x–10x)',
    aperture: 'f/2.8',
    sensor: '1/2.0" Quad-Bayer',
    description: 'Continuous optical zoom prism with 3D sensor-shift stabilization providing razor-sharp handheld portraits.',
    highlights: ['10x lossless optical zoom', 'Tetraprism folded light geometry', 'Spatial audio microphone beamforming'],
  },
  {
    id: 'ultrawide',
    name: '48MP Macro Ultra-Wide',
    focalLength: '13mm',
    aperture: 'f/2.2',
    sensor: '1/2.55" BSI CMOS',
    description: '122° panoramic field of view that automatically switches to 2cm macro photography with edge sharpness correction.',
    highlights: ['122° wide panoramic angle', '2cm extreme macro focus distance', 'Hardware barrel distortion compensation'],
  },
];

export const CameraMatrixSection: React.FC = () => {
  const [activeLens, setActiveLens] = useState<string>('wide');
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [exposureVal, setExposureVal] = useState<number>(0);

  const currentLens = LENSES.find((l) => l.id === activeLens) || LENSES[0];

  return (
    <section id="optics" className="relative py-24 md:py-32 bg-[#06090e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              Next-Generation Optoelectronic Array
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              02. The 200MP Optical Matrix
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Three dedicated sapphire lenses, continuous periscope refraction, and real-time computational photogrammetry
            powered by the Teladu N1 Neural engine.
          </p>
        </div>

        {/* Main Grid: Macro Camera Detail & Interactive Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Macro Camera Image Carrier with HUD overlay */}
          <div className="lg:col-span-7 relative rounded-3xl p-1.5 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl overflow-hidden group">
            <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[4/3]">
              <img
                src={EPHONE_ASSETS.cameraDetail}
                alt="Macro detail of the Teladu ePhone triple sapphire camera array"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isNightMode ? 'brightness-125 contrast-110' : ''
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Simulated Camera Viewfinder Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/40">
                {/* Top Viewfinder Bar */}
                <div className="flex items-center justify-between font-mono text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>REC 8K / 60FPS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{currentLens.focalLength}</span>
                    <span>{currentLens.aperture}</span>
                    <span className="text-cyan-400">ISO {isNightMode ? '3200' : '100'}</span>
                  </div>
                </div>

                {/* Center Crosshair Focus Reticle */}
                <div className="self-center flex flex-col items-center">
                  <div className="w-24 h-24 border border-cyan-400/60 rounded-xl relative flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  </div>
                  <span className="font-mono text-[11px] text-cyan-300 mt-2 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {currentLens.name} · Laser AF Locked
                  </span>
                </div>

                {/* Bottom Viewfinder Bar */}
                <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                  <span>EXP: {exposureVal > 0 ? `+${exposureVal}` : exposureVal} EV</span>
                  <span>TELADU NEURAL PHOTOMETRY</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Image Toggles */}
            <div className="p-3 bg-slate-950/80 backdrop-blur-md rounded-2xl mt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsNightMode(!isNightMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                    isNightMode
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{isNightMode ? 'Night Mode: Active' : 'Night Mode: Auto'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400">Exposure:</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.5"
                  value={exposureVal}
                  onChange={(e) => setExposureVal(parseFloat(e.target.value))}
                  className="w-24 accent-cyan-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-cyan-300 w-8 tabular-nums">{exposureVal} EV</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lens Selector Tabs and Detailed Specs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Segmented Lens Controls */}
            <div className="p-1.5 bg-slate-950 rounded-2xl border border-white/10 flex items-center gap-1">
              {LENSES.map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => setActiveLens(lens.id)}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-center ${
                    activeLens === lens.id
                      ? 'bg-white text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lens.focalLength}
                </button>
              ))}
            </div>

            {/* Selected Lens Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{currentLens.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mt-1">
                    <span>{currentLens.focalLength}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentLens.aperture}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentLens.sensor}</span>
                  </div>
                </div>
                <div className="p-3 bg-cyan-500/10 text-cyan-300 rounded-xl border border-cyan-500/20">
                  <Aperture className="w-5 h-5" />
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {currentLens.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                {currentLens.highlights.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="font-mono text-xl font-bold text-white tabular-nums">4.8x</div>
                <div className="text-xs text-slate-400 mt-0.5">Greater Light Gathering</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="font-mono text-xl font-bold text-white tabular-nums">14-Bit</div>
                <div className="text-xs text-slate-400 mt-0.5">Computational Cinema DNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CameraMatrixSection;
