import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Phone, MessageSquare, Globe, Camera, Image as ImageIcon, ShoppingBag,
  Users, Calendar, Mail, Folder, Wifi, Settings, Cpu, Shield,
  Volume2, VolumeX, Power, RotateCw, Sparkles, ChevronLeft,
  X, Check, Send, Search, Plus, Trash2, ArrowUpRight, Radio,
  Battery, BatteryCharging, Sliders, Moon, Sun, Bell, Flashlight, CheckCircle2
} from 'lucide-react';
import { TeladuIcon } from './TeladuLogo';
import { playButtonHaptic, playBootChime, playShutterSound, playDtmfTone, triggerHaptic } from '../services/soundService';
import { useBattery } from '../services/batteryService';

export interface VirtualEPhoneProps {
  className?: string;
  initialApp?: string | null;
  enableFloating?: boolean;
}

interface PhoneToastData {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export const VirtualEPhone: React.FC<VirtualEPhoneProps> = ({
  className = '',
  initialApp = null,
  enableFloating = true,
}) => {
  // Real-time Device Battery Hook
  const battery = useBattery();

  // Device Power & Lifecycle States
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [activeApp, setActiveApp] = useState<string | null>(initialApp);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  // Notification Toast State
  const [phoneToast, setPhoneToast] = useState<PhoneToastData | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  const showToast = (title: string, subtitle: string, icon?: React.ReactNode) => {
    triggerHaptic(12);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setPhoneToast({ title, subtitle, icon });
    toastTimeoutRef.current = setTimeout(() => {
      setPhoneToast(null);
    }, 2400);
  };

  // Quick settings toggles
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);

  // Wallpaper
  const [activeWallpaper, setActiveWallpaper] = useState<'mountain' | 'nebula' | 'glass'>('mountain');

  // Interactive App States
  const [dialedNumber, setDialedNumber] = useState('');
  const [inCall, setInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'teladu'; text: string; time: string }>>([
    { sender: 'teladu', text: 'Welcome to your Teladu V1 Cloud ePhone! Your account is active.', time: '9:41 AM' },
    { sender: 'teladu', text: 'All features run live in your browser with zero local CPU load.', time: '9:42 AM' },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const [browserInput, setBrowserInput] = useState('https://cloud.teladu.com');
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [activeEsim, setActiveEsim] = useState('Teladu Global 5G (Default)');
  const [esimRoaming, setEsimRoaming] = useState(true);

  // Framer Motion 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Glassy Animated Boot-Up Sequence with Progress Bar
  useEffect(() => {
    let progressTimer: any;
    if (isBooting) {
      playBootChime();
      setBootProgress(0);

      const startTime = Date.now();
      const duration = 2400;

      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.round((elapsed / duration) * 100));
        setBootProgress(progress);

        if (progress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsBooting(false);
            setIsPoweredOn(true);
            setIsLocked(true);
            showToast('Teladu OS 3.2 Loaded', 'Cloud Enclave Active · 5G Connected', <TeladuIcon size={16} />);
          }, 300);
        }
      }, 40);
    }
    return () => clearInterval(progressTimer);
  }, [isBooting]);

  // Call duration timer
  useEffect(() => {
    let interval: any;
    if (inCall) {
      interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  const handlePowerButton = () => {
    playButtonHaptic();
    if (!isPoweredOn) {
      setIsBooting(true);
    } else {
      setIsLocked(!isLocked);
      setShowQuickSettings(false);
      showToast(isLocked ? 'Phone Unlocked' : 'Screen Locked', isLocked ? 'Swipe to explore apps' : 'Display sleep mode', <Power className="w-3.5 h-3.5 text-cyan-400" />);
    }
  };

  const handleVolumeChange = (delta: number) => {
    playButtonHaptic();
    const newVol = Math.max(0, Math.min(100, volume + delta));
    setVolume(newVol);
    showToast(`Volume ${newVol}%`, delta > 0 ? 'Audio level increased' : 'Audio level decreased', <Volume2 className="w-3.5 h-3.5 text-cyan-400" />);
  };

  const handleRotateToggle = () => {
    playButtonHaptic();
    const nextState = !isLandscape;
    setIsLandscape(nextState);
    showToast('Display Rotation', nextState ? 'Switched to Landscape Mode' : 'Switched to Portrait Mode', <RotateCw className="w-3.5 h-3.5 text-cyan-400" />);
  };

  // Camera stream
  useEffect(() => {
    if (activeApp === 'camera') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(() => {});
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [activeApp]);

  const handleCapturePhoto = () => {
    playShutterSound();
    const newPhoto = `photo_${Date.now()}`;
    setCapturedPhotos([newPhoto, ...capturedPhotos]);
    setActiveApp('gallery');
    showToast('Photo Saved', 'Uploaded to 128GB Cloud Gallery', <Camera className="w-3.5 h-3.5 text-cyan-400" />);
  };

  const handleDialKey = (key: string) => {
    playDtmfTone(key);
    setDialedNumber((prev) => prev + key);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    playButtonHaptic();
    const userMsg = messageInput.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Now' },
    ]);
    setMessageInput('');
    showToast('Message Sent', 'Routed via Teladu Cloud RCS', <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />);

    setTimeout(() => {
      let reply = "Your Teladu V1 Cloud ePhone is connected with sub-12ms latency.";
      if (userMsg.toLowerCase().includes('hello') || userMsg.toLowerCase().includes('hi')) {
        reply = "Hello! I am your Teladu Assistant. How can I assist you on your Cloud ePhone today?";
      } else if (userMsg.toLowerCase().includes('esim') || userMsg.toLowerCase().includes('sim')) {
        reply = "Your virtual eSIM is connected to Teladu 5G Standalone. 5GB roaming available.";
      } else if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cost')) {
        reply = "The Teladu V1 Cloud ePhone early bird reservation is only $29! Email teladuv1@gmail.com for instant confirmation.";
      } else {
        reply = `Received: "${userMsg}". Your preferences are synced to the Teladu Cloud.`;
      }
      setMessages((prev) => [
        ...prev,
        { sender: 'teladu', text: reply, time: 'Now' },
      ]);
    }, 600);
  };

  const wallpaperGradients = {
    mountain: 'from-[#0b162c] via-[#ea580c]/85 to-[#facc15]/90',
    nebula: 'from-[#030712] via-[#0038ff]/75 to-[#00f0ff]/60',
    glass: 'from-[#0a0f1d] via-[#1e293b] to-[#04060d]',
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center select-none py-6 ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Outer Atmospheric Glow */}
      <div className="absolute inset-0 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Motion Floating Wrapper */}
      <motion.div
        animate={enableFloating ? { y: [0, -10, 0] } : undefined}
        transition={enableFloating ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex items-center"
      >
        {/* Left Hardware Buttons: Glowing Electric Blue with Neon Halo */}
        <div className="flex flex-col gap-6 mr-[-2px] z-30">
          <button
            onClick={() => handleVolumeChange(10)}
            title="Volume Up"
            className="w-2.5 h-12 rounded-l-md bg-blue-600 hover:bg-cyan-400 active:bg-white shadow-[0_0_15px_#0047ff] transition-all cursor-pointer border-y border-l border-cyan-300/60"
            aria-label="Volume Up"
          />
          <button
            onClick={() => handleVolumeChange(-10)}
            title="Volume Down"
            className="w-2.5 h-12 rounded-l-md bg-blue-600 hover:bg-cyan-400 active:bg-white shadow-[0_0_15px_#0047ff] transition-all cursor-pointer border-y border-l border-cyan-300/60"
            aria-label="Volume Down"
          />
          <button
            onClick={handleRotateToggle}
            title="Rotate Device"
            className="w-2.5 h-8 rounded-l-md bg-cyan-500 hover:bg-white shadow-[0_0_12px_#00f0ff] transition-all cursor-pointer border-y border-l border-cyan-200/60"
            aria-label="Rotate Orientation"
          />
        </div>

        {/* The Crystal Glass Phone Body (Matching T-V1.png) */}
        <div
          className={`relative rounded-[50px] p-[10px] bg-gradient-to-b from-white/35 via-slate-400/20 to-white/15 backdrop-blur-3xl border-2 border-white/50 shadow-[0_25px_60px_-15px_rgba(0,56,255,0.45),0_0_35px_rgba(255,255,255,0.2)] transition-all duration-300 ${
            isLandscape ? 'w-[680px] h-[360px]' : 'w-[340px] sm:w-[380px] h-[720px]'
          }`}
        >
          {/* Polished Chrome Inner Rim */}
          <div className="w-full h-full rounded-[40px] p-[3px] bg-gradient-to-b from-slate-200 via-slate-700 to-slate-400 shadow-inner relative overflow-hidden">
            {/* Screen Glass Surface */}
            <div className="relative w-full h-full rounded-[37px] bg-[#050811] overflow-hidden flex flex-col justify-between text-white font-sans">

              {/* GLASSY NEON-BLUE NOTIFICATION TOAST COMPONENT */}
              <AnimatePresence>
                {phoneToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute top-10 inset-x-4 z-50 p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_0_25px_rgba(0,210,255,0.45)] flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_#00f0ff]">
                      {phoneToast.icon || <Bell className="w-4 h-4 text-cyan-300" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white tracking-tight truncate flex items-center gap-1.5">
                        <span>{phoneToast.title}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                      <div className="text-[10px] text-cyan-200/80 truncate font-mono mt-0.5">
                        {phoneToast.subtitle}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Settings Panel (Android Dropdown) */}
              {showQuickSettings && (
                <div className="absolute inset-x-0 top-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/30 p-5 space-y-4 animate-in slide-in-from-top-6 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                      Android 15 Quick Settings
                    </span>
                    <button
                      onClick={() => setShowQuickSettings(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <button
                      onClick={() => {
                        setWifiEnabled(!wifiEnabled);
                        showToast('Wi-Fi Network', !wifiEnabled ? 'Connected to Teladu Cloud Fiber' : 'Wi-Fi Disconnected');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        wifiEnabled ? 'bg-blue-600 border-cyan-400 text-white' : 'bg-slate-900 border-white/5 text-slate-500'
                      }`}
                    >
                      <Wifi className="w-4 h-4" />
                      <span>Wi-Fi</span>
                    </button>
                    <button
                      onClick={() => {
                        setBluetoothEnabled(!bluetoothEnabled);
                        showToast('eSIM Radio', !bluetoothEnabled ? 'Teladu 5G Enabled' : 'Radio Standby');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        bluetoothEnabled ? 'bg-blue-600 border-cyan-400 text-white' : 'bg-slate-900 border-white/5 text-slate-500'
                      }`}
                    >
                      <Radio className="w-4 h-4" />
                      <span>eSIM 5G</span>
                    </button>
                    <button
                      onClick={() => {
                        setDarkMode(!darkMode);
                        showToast('Display Mode', !darkMode ? 'Dark Theme Activated' : 'Light Theme Activated');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        darkMode ? 'bg-blue-600 border-cyan-400 text-white' : 'bg-slate-900 border-white/5 text-slate-500'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                    </button>
                    <button
                      onClick={() => {
                        setFlashlightOn(!flashlightOn);
                        showToast('Flashlight Torch', !flashlightOn ? 'Rear LED Torch ON' : 'Torch OFF');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        flashlightOn ? 'bg-amber-500 border-amber-300 text-slate-950' : 'bg-slate-900 border-white/5 text-slate-500'
                      }`}
                    >
                      <Flashlight className="w-4 h-4" />
                      <span>Torch</span>
                    </button>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 font-mono">
                    <span>Battery Status: {battery.level}% {battery.charging ? '(Charging)' : ''}</span>
                    <span className="text-cyan-400">{battery.isReal ? 'Hardware Synced' : 'Cloud Simulated'}</span>
                  </div>
                </div>
              )}

              {/* State 1: Glassy Animated Boot Sequence with Sleek Neon-Cyan Progress Bar */}
              {isBooting ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-black p-6 space-y-6 animate-in fade-in duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center border border-blue-500/50 shadow-[0_0_35px_#0038ff] animate-pulse">
                    <TeladuIcon size={56} />
                  </div>
                  
                  <div className="text-center space-y-1">
                    <div className="font-sans text-xl font-bold tracking-tight text-white">teladu</div>
                    <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                      Android 15 · Cloud OS
                    </div>
                  </div>

                  {/* Sleek Neon-Cyan Animated Progress Bar Container */}
                  <div className="w-48 space-y-2">
                    <div className="h-1.5 w-full bg-slate-900/90 border border-cyan-500/30 rounded-full overflow-hidden p-[1px] shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white rounded-full transition-all duration-75 shadow-[0_0_12px_#00f0ff]"
                        style={{ width: `${bootProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-cyan-300">
                      <span>Booting Enclave</span>
                      <span className="font-bold tabular-nums">{bootProgress}%</span>
                    </div>
                  </div>
                </div>
              ) : !isPoweredOn ? (
                /* State 2: Power Off Screen */
                <div
                  onClick={() => setIsBooting(true)}
                  className="flex-1 flex flex-col items-center justify-center bg-black cursor-pointer group"
                >
                  <Power className="w-8 h-8 text-slate-700 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[11px] text-slate-600 group-hover:text-slate-400 mt-2 font-mono">
                    Click to Power On
                  </span>
                </div>
              ) : isLocked ? (
                /* State 3: Lock Screen (Matching T-V1.png with Mountain Sunset) */
                <div
                  onClick={() => {
                    playButtonHaptic();
                    setIsLocked(false);
                    showToast('Welcome to Teladu V1', 'Swipe gestures active');
                  }}
                  className={`flex-1 flex flex-col justify-between p-6 bg-gradient-to-b ${wallpaperGradients[activeWallpaper]} relative cursor-pointer overflow-hidden`}
                >
                  {/* Status Bar */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowQuickSettings(true);
                    }}
                    className="flex items-center justify-between text-xs text-white/95 pt-1 font-mono hover:bg-black/20 p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-2">
                      <Radio className="w-3 h-3 text-cyan-300 animate-pulse" />
                      <span className="text-[10px] text-cyan-200">Teladu 5G</span>
                      <Wifi className="w-3.5 h-3.5" />
                      <div className="flex items-center gap-1">
                        {battery.charging ? (
                          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Battery className="w-3.5 h-3.5 text-white" />
                        )}
                        <span className="text-[10px] tabular-nums">{battery.level}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Punch Hole Camera at Top Center */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/20 shadow-sm" />

                  {/* Lock Screen Clock & Date matching T-V1.png */}
                  <div className="text-center my-auto">
                    <h1 className="text-6xl sm:text-7xl font-display font-extrabold text-white tracking-tight drop-shadow-xl">
                      9:41
                    </h1>
                    <p className="text-sm font-medium text-slate-100 mt-1 drop-shadow">
                      Mon, Sep 22
                    </p>

                    <div className="mt-8 flex flex-col items-center opacity-85">
                      <TeladuIcon size={44} />
                      <span className="text-xs font-semibold tracking-wide text-white/90 mt-1">
                        teladu
                      </span>
                    </div>
                  </div>

                  {/* Bottom Unlock Prompt */}
                  <div className="text-center pb-4">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/80 animate-bounce">
                      <span>Swipe or Click to Unlock</span>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300 mt-2">
                      V1 - Cloud ePhone
                    </div>
                  </div>
                </div>
              ) : activeApp ? (
                /* State 4: Active Open App View */
                <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
                  <div className="p-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setActiveApp(null)}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 py-1 px-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                    <span className="font-semibold capitalize text-white">{activeApp}</span>
                    <button
                      onClick={() => setActiveApp(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 text-xs">
                    {/* Calls App */}
                    {activeApp === 'calls' && (
                      <div className="h-full flex flex-col justify-between">
                        {inCall ? (
                          <div className="text-center py-12 space-y-4">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 animate-pulse">
                              <Phone className="w-8 h-8" />
                            </div>
                            <div>
                              <div className="text-lg font-bold text-white">{dialedNumber || 'Teladu Cloud Voice'}</div>
                              <div className="font-mono text-cyan-400 text-sm mt-1">
                                {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setInCall(false);
                                showToast('Call Terminated', 'Voice session ended');
                              }}
                              className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold shadow-lg shadow-red-600/30 cursor-pointer"
                            >
                              End Call
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-center font-mono text-2xl h-10 text-white font-bold tracking-widest border-b border-white/10 pb-2">
                              {dialedNumber || <span className="text-slate-600 text-sm font-normal">Enter phone number...</span>}
                            </div>
                            <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
                              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                                <button
                                  key={k}
                                  onClick={() => handleDialKey(k)}
                                  className="w-14 h-14 rounded-full bg-slate-900 border border-white/10 text-lg font-bold hover:bg-blue-600 hover:border-blue-400 transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
                                >
                                  {k}
                                </button>
                              ))}
                            </div>
                            <div className="flex justify-center gap-4 pt-2">
                              <button
                                onClick={() => {
                                  if (dialedNumber) {
                                    setInCall(true);
                                    showToast('Calling Gateway', `Routing to ${dialedNumber}`, <Phone className="w-3.5 h-3.5 text-emerald-400" />);
                                  }
                                }}
                                className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center active:scale-95 cursor-pointer"
                              >
                                <Phone className="w-6 h-6" />
                              </button>
                              {dialedNumber && (
                                <button
                                  onClick={() => setDialedNumber('')}
                                  className="w-14 h-14 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Messages App */}
                    {activeApp === 'messages' && (
                      <div className="h-full flex flex-col justify-between">
                        <div className="space-y-3 overflow-y-auto max-h-[440px] pr-1">
                          {messages.map((m, i) => (
                            <div
                              key={i}
                              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                              <div
                                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                                  m.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                                    : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none'
                                }`}
                              >
                                {m.text}
                              </div>
                              <span className="text-[9px] text-slate-500 mt-0.5 px-1 font-mono">{m.time}</span>
                            </div>
                          ))}
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                          }}
                          className="pt-2 flex gap-2"
                        >
                          <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Message Teladu Assistant..."
                            className="flex-1 px-3 py-2 bg-slate-900 rounded-xl border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="submit"
                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    )}

                    {/* Browser App */}
                    {activeApp === 'browser' && (
                      <div className="h-full flex flex-col">
                        <div className="flex gap-1.5 pb-3">
                          <input
                            type="text"
                            value={browserInput}
                            onChange={(e) => setBrowserInput(e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-white font-mono text-[11px]"
                          />
                          <button
                            onClick={() => showToast('Navigating', browserInput, <Globe className="w-3.5 h-3.5 text-cyan-400" />)}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs cursor-pointer"
                          >
                            Go
                          </button>
                        </div>
                        <div className="flex-1 rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-4">
                          <div className="flex items-center gap-2 text-cyan-400 font-semibold border-b border-white/10 pb-2">
                            <Globe className="w-4 h-4" />
                            <span>Teladu Cloud Gateway Active</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">
                            Encrypted 5G Cloud Proxy with zero local browsing cache.
                          </p>
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            {['Teladu Portal', 'Wikipedia', 'TechCrunch', 'HackerNews'].map((site) => (
                              <button
                                key={site}
                                onClick={() => {
                                  setBrowserInput(`https://${site.toLowerCase().replace(' ', '')}.com`);
                                  showToast('Bookmark Opened', site);
                                }}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-left text-slate-200 cursor-pointer"
                              >
                                {site}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Camera App */}
                    {activeApp === 'camera' && (
                      <div className="h-full flex flex-col justify-between items-center">
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black border border-cyan-500/30 flex items-center justify-center">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 border border-cyan-400/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                            <div className="flex justify-between text-[10px] font-mono text-cyan-400">
                              <span>200MP OPTICS</span>
                              <span>TELADU V1</span>
                            </div>
                            <div className="w-16 h-16 border border-cyan-400/50 rounded-lg self-center flex items-center justify-center animate-pulse">
                              <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                            </div>
                            <div className="text-center text-[10px] text-white/70 font-mono">
                              AUTO-FOCUS LOCKED
                            </div>
                          </div>
                        </div>
                        <div className="py-4">
                          <button
                            onClick={handleCapturePhoto}
                            className="w-16 h-16 rounded-full border-4 border-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-[0_0_20px_#0047ff] flex items-center justify-center cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-full bg-white" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Gallery App */}
                    {activeApp === 'gallery' && (
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-white">Your Cloud Media</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-square rounded-xl bg-gradient-to-tr from-blue-900 to-cyan-500 p-3 flex flex-col justify-between border border-white/10 shadow-sm">
                            <span className="text-[10px] font-mono text-cyan-200">SAMPLE 01</span>
                            <span className="font-semibold text-white">Sunset Glacier</span>
                          </div>
                          <div className="aspect-square rounded-xl bg-gradient-to-tr from-indigo-900 to-purple-600 p-3 flex flex-col justify-between border border-white/10 shadow-sm">
                            <span className="text-[10px] font-mono text-purple-200">SAMPLE 02</span>
                            <span className="font-semibold text-white">Neon Horizon</span>
                          </div>
                          {capturedPhotos.map((p, i) => (
                            <div key={i} className="aspect-square rounded-xl bg-slate-800 p-3 border border-cyan-500/40 flex flex-col justify-between">
                              <span className="text-[10px] font-mono text-cyan-400">CAPTURED</span>
                              <Camera className="w-6 h-6 text-white self-center" />
                              <span className="text-[9px] text-slate-400">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* eSIM Manager */}
                    {activeApp === 'esim' && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">Teladu Cloud eSIM</div>
                            <div className="text-[10px] text-cyan-300 font-mono mt-0.5">5G Standalone Ultra</div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            Active
                          </span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase">Available Profiles</label>
                          {[
                            'Teladu Global 5G (Default)',
                            'US Cloud Mobile (eSIM 2)',
                            'EuroCloud Traveler (eSIM 3)',
                          ].map((profile) => (
                            <div
                              key={profile}
                              onClick={() => {
                                playButtonHaptic();
                                setActiveEsim(profile);
                                showToast('eSIM Profile Switched', profile, <Radio className="w-3.5 h-3.5 text-cyan-400" />);
                              }}
                              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                activeEsim === profile
                                  ? 'bg-slate-900 border-cyan-400 text-white'
                                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <span>{profile}</span>
                              {activeEsim === profile && <Check className="w-4 h-4 text-cyan-400" />}
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                          <span>Global Cloud Roaming</span>
                          <input
                            type="checkbox"
                            checked={esimRoaming}
                            onChange={(e) => {
                              setEsimRoaming(e.target.checked);
                              showToast('Cloud Roaming', e.target.checked ? '5GB Global Data Active' : 'Roaming Disabled');
                            }}
                            className="accent-blue-500 w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* Settings App */}
                    {activeApp === 'settings' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase">Wallpaper Theme</div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'mountain', label: 'Sunset Mtn' },
                              { id: 'nebula', label: 'Nebula Blue' },
                              { id: 'glass', label: 'Cyber Glass' },
                            ].map((w) => (
                              <button
                                key={w.id}
                                onClick={() => {
                                  setActiveWallpaper(w.id as any);
                                  showToast('Wallpaper Updated', w.label);
                                }}
                                className={`p-2 rounded-xl text-center border text-[11px] font-medium transition-all cursor-pointer ${
                                  activeWallpaper === w.id
                                    ? 'bg-blue-600 border-cyan-400 text-white'
                                    : 'bg-slate-900 border-white/5 text-slate-400'
                                }`}
                              >
                                {w.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2 text-xs">
                          <div className="font-semibold text-white">About Teladu V1</div>
                          <div className="flex justify-between text-slate-400">
                            <span>OS Architecture:</span>
                            <span className="text-white font-mono">Android 15 Virtualized</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Device Battery:</span>
                            <span className="text-cyan-400 font-mono">{battery.level}% ({battery.isReal ? 'Hardware Synced' : 'Cloud Simulated'})</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Inquiries:</span>
                            <span className="text-cyan-300 font-mono">teladuv1@gmail.com</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Other App Placeholders */}
                    {['appstore', 'contacts', 'calendar', 'email', 'files', 'assistant'].includes(activeApp) && (
                      <div className="py-8 text-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/30">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-white capitalize">{activeApp} App</h4>
                        <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">
                          Synchronized to your Teladu Cloud profile with sub-12ms response latency.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* State 5: Main Android Home Screen */
                <div
                  className={`flex-1 flex flex-col justify-between p-4 bg-gradient-to-b ${wallpaperGradients[activeWallpaper]} overflow-hidden`}
                >
                  {/* Status Bar */}
                  <div
                    onClick={() => setShowQuickSettings(true)}
                    className="flex items-center justify-between text-xs text-white/95 font-mono pt-1 hover:bg-black/20 p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="font-bold">9:41</span>
                    <div className="flex items-center gap-2">
                      <Radio className="w-3 h-3 text-cyan-300 animate-pulse" />
                      <span className="text-[10px] text-cyan-200 font-semibold">Teladu 5G</span>
                      <Wifi className="w-3 h-3" />
                      <div className="flex items-center gap-1">
                        {battery.charging ? (
                          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Battery className="w-3.5 h-3.5 text-white" />
                        )}
                        <span className="text-[10px] font-bold tabular-nums">{battery.level}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Punch Hole Camera */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/20 shadow-sm" />

                  {/* Widget: Clock + Date */}
                  <div className="mt-3 p-4 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/15 shadow-xl">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="font-display text-4xl font-extrabold text-white tracking-tight">9:41</div>
                        <div className="text-xs text-slate-200 mt-0.5">Mon, Sep 22 · 72° Sunny</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Cloud 5G Active</div>
                        <div className="text-[9px] text-slate-300">San Francisco, CA</div>
                      </div>
                    </div>
                  </div>

                  {/* Grid of 12 Small Futuristic Neon Apps */}
                  <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-auto px-1 py-2">
                    {[
                      { id: 'calls', label: 'Calls', icon: Phone, color: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40' },
                      { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'bg-blue-500/25 text-blue-300 border-blue-400/40' },
                      { id: 'browser', label: 'Internet', icon: Globe, color: 'bg-cyan-500/25 text-cyan-300 border-cyan-400/40' },
                      { id: 'camera', label: 'Camera', icon: Camera, color: 'bg-purple-500/25 text-purple-300 border-purple-400/40' },
                      { id: 'gallery', label: 'Gallery', icon: ImageIcon, color: 'bg-pink-500/25 text-pink-300 border-pink-400/40' },
                      { id: 'appstore', label: 'App Store', icon: ShoppingBag, color: 'bg-sky-500/25 text-sky-300 border-sky-400/40' },
                      { id: 'contacts', label: 'Contacts', icon: Users, color: 'bg-amber-500/25 text-amber-300 border-amber-400/40' },
                      { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'bg-rose-500/25 text-rose-300 border-rose-400/40' },
                      { id: 'email', label: 'Email', icon: Mail, color: 'bg-orange-500/25 text-orange-300 border-orange-400/40' },
                      { id: 'files', label: 'Cloud Drive', icon: Folder, color: 'bg-teal-500/25 text-teal-300 border-teal-400/40' },
                      { id: 'esim', label: 'Virtual SIM', icon: Radio, color: 'bg-indigo-500/25 text-indigo-300 border-indigo-400/40' },
                      { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-slate-500/25 text-slate-200 border-slate-400/40' },
                    ].map((app) => {
                      const Icon = app.icon;
                      return (
                        <button
                          key={app.id}
                          onClick={() => {
                            playButtonHaptic();
                            setActiveApp(app.id);
                            showToast(`Launching ${app.label}`, 'Teladu Cloud OS Stream');
                          }}
                          className="flex flex-col items-center gap-1 group focus-visible:outline-none cursor-pointer"
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl backdrop-blur-md border ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-transform`}
                          >
                            <Icon className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" />
                          </div>
                          <span className="text-[10px] text-white/90 font-medium tracking-tight truncate max-w-[64px]">
                            {app.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Fixed Bottom Dock */}
                  <div className="p-2.5 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/20 flex items-center justify-around shadow-2xl">
                    <button
                      onClick={() => {
                        playButtonHaptic();
                        setActiveApp('calls');
                        showToast('Launching Calls', 'Voice & Video Dialer');
                      }}
                      className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        playButtonHaptic();
                        setActiveApp('messages');
                        showToast('Launching Messages', 'RCS & Cloud Chat');
                      }}
                      className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        playButtonHaptic();
                        setActiveApp('messages');
                        showToast('Assistant Connected', 'Voice & Text Active');
                      }}
                      className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        playButtonHaptic();
                        setActiveApp('browser');
                        showToast('Launching Browser', 'Encrypted Gateway');
                      }}
                      className="p-2.5 rounded-xl bg-sky-500/20 text-sky-300 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Globe className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Gesture Bar */}
              <div
                onClick={() => {
                  playButtonHaptic();
                  setActiveApp(null);
                  setShowQuickSettings(false);
                }}
                className="w-full py-2 bg-black/70 backdrop-blur-sm flex justify-center cursor-pointer hover:bg-black/90 transition-colors"
              >
                <div className="w-28 h-1 bg-white/70 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Hardware Button: Glowing Electric Blue Power Button */}
        <div className="flex flex-col ml-[-2px] z-30">
          <button
            onClick={handlePowerButton}
            title={isPoweredOn ? 'Turn Off / Lock Screen' : 'Power On Device'}
            className="w-2.5 h-16 rounded-r-md bg-blue-600 hover:bg-cyan-400 active:bg-white shadow-[0_0_20px_#0047ff] transition-all cursor-pointer border-y border-r border-cyan-300/60 flex items-center justify-center"
            aria-label="Power Button"
          />
        </div>
      </motion.div>

      {/* Realistic Reflective Ground Plane below the phone (from T-V1.png) */}
      <div className="w-72 sm:w-80 h-10 mt-[-15px] bg-gradient-to-t from-blue-600/20 via-white/5 to-transparent blur-md rounded-full pointer-events-none transform scale-y-50" />
    </div>
  );
};

export default VirtualEPhone;
