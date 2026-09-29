import React, { useState } from 'react';
import { Cpu, Camera, BatteryCharging, Shield, Radio, Check, ArrowRight } from 'lucide-react';

interface SpecGroup {
  category: string;
  icon: React.ElementType;
  specs: { label: string; value: string; detail: string }[];
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    category: 'Hardware Performance & Cloud Compute',
    icon: Cpu,
    specs: [
      { label: 'Cloud Virtual Host', value: 'Android 15 Virtualization', detail: 'Isolated sandboxed microVM running dedicated Android 15 core' },
      { label: 'Host Processor Allocation', value: 'Octa-Core 4.2 GHz Turbo', detail: 'Dedicated hyper-threaded cloud vCPU slice per user session' },
      { label: 'RAM / Virtual Memory', value: '12 GB LPDDR5X Cloud Allocation', detail: 'Zero-swapping active app state retention in cloud memory' },
      { label: 'Cloud Drive Storage', value: '128 GB High-Speed NVMe', detail: 'Direct NVMe partition with instant browser media streaming' },
      { label: 'Stream Resolution & Refresh', value: '2560 × 1200 · 120 FPS ProMotion', detail: 'Low-latency H.265 / AV1 WebRTC hardware-accelerated video pipeline' },
      { label: 'Network Roundtrip Latency', value: 'Sub-12ms Edge Anycast', detail: 'Over 120+ global point-of-presence edge nodes worldwide' },
    ],
  },
  {
    category: 'Camera Sensor Details & Optics Matrix',
    icon: Camera,
    specs: [
      { label: 'Primary Fusion Sensor', value: '200 MP Super-QIS Sensor', detail: '1/1.12" large optical format, f/1.4 aperture, 16-in-1 pixel binning' },
      { label: 'Telephoto Periscope Array', value: '50 MP Dual Continuous Prism', detail: 'Folded light path with 10x lossless optical refraction zoom' },
      { label: 'Front Selfie Camera', value: '32 MP Punch-Hole Sensor', detail: 'Under-glass centered punch hole, f/2.0 aperture with 4K 60FPS video' },
      { label: 'Sensor Stabilization', value: '3D Optical Sensor-Shift OIS', detail: 'Active 5-axis digital gyro stabilization for smooth handheld motion' },
      { label: 'Computational Imaging', value: '14-Bit Cinema HDR Photometry', detail: 'Zero shutter lag, real-time multi-frame exposure blending' },
      { label: 'Video Capture Standards', value: '8K @ 60FPS · ProRes Spatial', detail: 'Real-time spatial video capture ready for web & AR viewports' },
    ],
  },
  {
    category: 'Battery Capacity & Power Architecture',
    icon: BatteryCharging,
    specs: [
      { label: 'Virtual Cell Capacity', value: '5,200 mAh Silicon-Carbon Anode', detail: 'High energy-density virtual chemistry with 38-hour video runtime' },
      { label: 'Device Battery Telemetry', value: 'Hardware API Synced via W3C', detail: 'Real-time battery level and charging status mapped from host system' },
      { label: 'MagFlow Inductive Charge', value: '80W Fast Charge Simulation', detail: 'Recharges from 0 to 70% in under 18 minutes' },
      { label: 'Cell Longevity Cycle', value: '1,500 Full Cycles @ 90% Health', detail: 'Cloud-managed intelligent trickle voltage balancing algorithms' },
      { label: 'Power Consumption Efficiency', value: '0% Local Battery Drain Load', detail: 'Offloads all heavy computing, gaming, and 3D to remote cloud nodes' },
    ],
  },
  {
    category: 'Glass Chassis, Neon Controls & Connectivity',
    icon: Shield,
    specs: [
      { label: 'Chassis Finish', value: 'Clear Refractive Tempered Glass', detail: '100% transparent back plate displaying internal optical pod and logo' },
      { label: 'Inner Bevel Rim', value: 'Aircraft-Grade 7000 Polished Chrome', detail: 'Laser-welded structural inner perimeter with mirror sheen' },
      { label: 'Hardware Side Buttons', value: 'Illuminated Neon Electric Blue', detail: 'Physical power and volume keys with integrated haptic vibration feedback' },
      { label: 'Dimensions & Weight', value: '160.8 × 76.5 × 6.8 mm · 174 g', detail: 'Ultra-thin lightweight profile with ergonomic curved glass edges' },
      { label: 'Water & Dust Ingress', value: 'IP68 Certified (Submersible 6m)', detail: 'Hermetically bonded glass enclosure resistant to dust and moisture' },
      { label: 'Telephony & Connectivity', value: 'Global Virtual eSIM · 5G Standalone', detail: 'Built-in software radio with instant multi-carrier roaming profiles' },
    ],
  },
];

export const TechSpecsGlassTable: React.FC<{ onOpenPreOrder: () => void }> = ({ onOpenPreOrder }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="specs" className="relative py-16 sm:py-24 bg-[#03060f] border-t border-blue-500/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] sm:h-[400px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Engineering Verification
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Detailed Technical Specifications
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-300 font-light">
            Comprehensive telemetry across cloud compute throughput, 200MP optical photogrammetry, and silicon-carbon battery endurance.
          </p>
        </div>

        {/* Glassmorphic Tab Bar: Mobile-friendly flex-wrap */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 p-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 max-w-4xl mx-auto shadow-lg">
          {SPEC_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={group.category}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,180,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span>{group.category.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Glassmorphism Table Container */}
        <div className="rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-blue-500/30 via-white/10 to-transparent border border-blue-500/35 shadow-[0_0_40px_rgba(0,71,255,0.2)] overflow-hidden">
          <div className="rounded-[15px] sm:rounded-[22px] bg-slate-950/85 backdrop-blur-2xl p-4 sm:p-8">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                  {React.createElement(SPEC_GROUPS[activeTab].icon, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight">
                    {SPEC_GROUPS[activeTab].category}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono">Teladu V1 Cloud ePhone Reference Specification</p>
                </div>
              </div>

              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-cyan-300 text-xs font-mono">
                Verified Benchmark
              </span>
            </div>

            {/* Spec Rows */}
            <div className="divide-y divide-white/5 font-sans">
              {SPEC_GROUPS[activeTab].specs.map((row) => (
                <div key={row.label} className="py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline sm:items-center">
                  <div className="sm:col-span-4 text-xs font-semibold text-slate-200">
                    {row.label}
                  </div>
                  <div className="sm:col-span-4 text-xs sm:text-sm font-bold text-cyan-300 font-mono tabular-nums">
                    {row.value}
                  </div>
                  <div className="sm:col-span-4 text-[10px] sm:text-[11px] text-slate-400 font-light">
                    {row.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Proof Strip with Clear Glassy, Smaller Button */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>100% web-native deployment. No local install or GPU hardware requirements.</span>
              </div>

              <button
                onClick={onOpenPreOrder}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Reserve Teladu V1 · $29</span>
                <ArrowRight className="w-3 h-3 text-cyan-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecsGlassTable;
