import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X, Check, ArrowRight, ShieldCheck, Lock, CreditCard,
  Smartphone, Building, Coins, Mail, Copy, Send
} from 'lucide-react';
import { triggerHaptic } from '../services/soundService';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethodType = 'card' | 'mobile_money' | 'bank_transfer' | 'crypto';

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [notes, setNotes] = useState('');

  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    triggerHaptic(15);
    navigator.clipboard.writeText('teladuv1@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getMailtoUrl = (resCode: string) => {
    const subject = encodeURIComponent(`Teladu V1 Early Bird Payment Confirmation [${resCode}]`);
    const body = encodeURIComponent(
      `Hello Teladu Team,\n\nI would like to complete my Teladu V1 Cloud ePhone Early Bird Order ($29).\n\nReservation ID: ${resCode}\nName: ${name}\nEmail: ${email}\nCountry: ${country}\nPhone: ${phone || 'N/A'}\nPreferred Payment System: ${paymentMethod.toUpperCase()}\nAdditional Notes: ${notes || 'None'}\n\nPlease reply with my official payment invoice and activation link.\n\nThank you!`
    );
    return `mailto:teladuv1@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    triggerHaptic(30);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newCode = `TEL-V1-${Math.floor(100000 + Math.random() * 900000)}`;
      setReservationCode(newCode);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0038ff', '#00f0ff', '#ffffff', '#38bdf8'],
        });
      } catch {}
    }, 600);
  };

  const handleDone = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#070b18] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,71,255,0.4)] text-slate-100 font-sans">
        
        {/* Close Button */}
        <button
          onClick={handleDone}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-4 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-blue-600/20 text-cyan-300 mx-auto flex items-center justify-center border border-blue-500/50 shadow-[0_0_30px_#0038ff]">
              <Check className="w-8 h-8 text-cyan-300" />
            </div>

            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                Reservation Created
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">
                Reservation #{reservationCode}
              </h3>
              <p className="mt-2 text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-light">
                To complete payment for your Teladu V1 Cloud ePhone ($29), please send your direct email to{' '}
                <strong className="text-white">teladuv1@gmail.com</strong> for your payment gateway invoice and instant payment confirmation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30 max-w-sm mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>RESERVATION ID:</span>
                <span className="text-cyan-400 font-bold">{reservationCode}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CLIENT:</span>
                <span className="text-white">{name} ({email})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>AMOUNT:</span>
                <span className="text-emerald-400 font-bold">$29.00 Early Bird</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-white/10 pt-2">
                <span>PAYMENT EMAIL:</span>
                <span className="text-cyan-300 font-bold">teladuv1@gmail.com</span>
              </div>
            </div>

            {/* Direct Email Action Button */}
            <div className="space-y-3 pt-2">
              <a
                href={getMailtoUrl(reservationCode)}
                className="w-full py-4 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,56,255,0.7)] hover:shadow-[0_0_35px_rgba(0,56,255,0.95)] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#0038ff]" />
                <span>Send Direct Email for Payment Confirmation</span>
              </a>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-white/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copiedEmail ? 'Copied teladuv1@gmail.com' : 'Copy teladuv1@gmail.com'}</span>
                </button>

                <button
                  onClick={handleDone}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Teladu V1 — Cloud ePhone
                  </h2>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">Early Bird Order · $29</p>
                </div>
                <div className="text-right">
                  <div className="text-xs line-through text-slate-500 font-mono">$99.00</div>
                  <div className="font-mono text-2xl font-extrabold text-cyan-300">$29</div>
                </div>
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/25 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Lifetime Cloud ePhone OS</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Global Virtual eSIM (5GB Roaming)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>128GB Cloud NVMe Storage</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Browser Run on Any PC / Mac</span>
              </div>
            </div>

            {/* Direct Email Payment Notice Banner */}
            <div className="p-3.5 rounded-2xl bg-blue-600/15 border border-cyan-400/40 flex items-start gap-3">
              <Mail className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Direct Email Payment Confirmation:</strong> Payment info and confirmation instructions are dispatched directly via{' '}
                <a href="mailto:teladuv1@gmail.com" className="text-cyan-300 underline font-mono font-bold">
                  teladuv1@gmail.com
                </a>.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email (for Payment Invoice)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="px-4 py-3 text-xs bg-slate-900/90 text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Global / Other">Global / Other</option>
                </select>
                <input
                  type="tel"
                  placeholder="Mobile Phone (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-3 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Preferred Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">
                  Select Preferred Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'mobile_money', label: 'Mobile Money', icon: Smartphone },
                    { id: 'bank_transfer', label: 'Bank Wire', icon: Building },
                    { id: 'crypto', label: 'Crypto Wallet', icon: Coins },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = paymentMethod === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic(15);
                          setPaymentMethod(tab.id as PaymentMethodType);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/30 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,71,255,0.4)]'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                        <span className="text-[11px] font-semibold">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Order Notes or Special Request (Optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-slate-300">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  Encrypted Reservation
                </span>
                <span>Payment Email: teladuv1@gmail.com</span>
              </div>

              {/* White Button with Blue Text & Neon Blue Halo */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,56,255,0.7)] hover:shadow-[0_0_35px_rgba(0,56,255,0.95)] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isProcessing ? 'Routing Reservation...' : `Reserve Teladu V1 · $29`}</span>
                <ArrowRight className="w-4 h-4 text-[#0038ff]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreOrderModal;
