import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X, Check, ArrowRight, ShieldCheck, Lock, CreditCard,
  Smartphone, Building, Coins, Mail, Copy, CheckCircle2,
  Globe, Sparkles, ChevronRight
} from 'lucide-react';
import { triggerHaptic } from '../services/soundService';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethodType = 'card' | 'mobile_money' | 'bank_transfer' | 'crypto';

interface CountryOption {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  recommendedPayment: PaymentMethodType;
}

const COUNTRIES: CountryOption[] = [
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', recommendedPayment: 'card' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', recommendedPayment: 'card' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', recommendedPayment: 'card' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', recommendedPayment: 'card' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', recommendedPayment: 'card' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪', recommendedPayment: 'mobile_money' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬', recommendedPayment: 'bank_transfer' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭', recommendedPayment: 'mobile_money' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', recommendedPayment: 'card' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', recommendedPayment: 'card' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷', recommendedPayment: 'card' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵', recommendedPayment: 'card' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', recommendedPayment: 'card' },
  { name: 'Global / Other', code: 'WW', dialCode: '+', flag: '🌐', recommendedPayment: 'card' },
];

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [mobileCarrier, setMobileCarrier] = useState('M-Pesa');
  const [cryptoCurrency, setCryptoCurrency] = useState('USDT (TRC20 / ERC20)');
  const [notes, setNotes] = useState('');

  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleCountryChange = (countryName: string) => {
    const c = COUNTRIES.find((item) => item.name === countryName) || COUNTRIES[0];
    setSelectedCountry(c);
    setPaymentMethod(c.recommendedPayment);
    triggerHaptic(10);
  };

  const handleCopyEmail = () => {
    triggerHaptic(15);
    navigator.clipboard.writeText('teladuv1@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyCode = () => {
    triggerHaptic(15);
    navigator.clipboard.writeText(reservationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getMailtoUrl = (resCode: string) => {
    const subject = encodeURIComponent(`Teladu V1 Early Bird Payment Confirmation [${resCode}]`);
    const paymentDetail =
      paymentMethod === 'mobile_money'
        ? `Mobile Money (${mobileCarrier})`
        : paymentMethod === 'crypto'
        ? `Crypto (${cryptoCurrency})`
        : paymentMethod === 'bank_transfer'
        ? 'Bank Wire (SWIFT / SEPA)'
        : 'Credit Card / Apple Pay';

    const body = encodeURIComponent(
      `Hello Teladu Team,\n\nI would like to complete my Teladu V1 Cloud ePhone Early Bird Order ($29).\n\n` +
      `Reservation ID: ${resCode}\n` +
      `Full Name: ${name}\n` +
      `Email: ${email}\n` +
      `Country: ${selectedCountry.name} (${selectedCountry.flag})\n` +
      `Phone: ${phone ? `${selectedCountry.dialCode} ${phone}` : 'N/A'}\n` +
      `Preferred Payment System: ${paymentDetail}\n` +
      `Order Notes: ${notes || 'None'}\n\n` +
      `Please reply with my official payment invoice and cloud activation credentials.\n\n` +
      `Thank you!`
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
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#0038ff', '#00f0ff', '#ffffff', '#38bdf8'],
        });
      } catch {}
    }, 550);
  };

  const handleDone = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#070b18] border border-blue-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,71,255,0.4)] text-slate-100 font-sans">
        
        {/* Close Button */}
        <button
          onClick={handleDone}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {submitted ? (
          /* World-Class Interactive Confirmation Step */
          <div className="py-2 sm:py-4 text-center space-y-4 sm:space-y-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600/20 text-cyan-300 mx-auto flex items-center justify-center border border-blue-500/50 shadow-[0_0_30px_#0038ff]">
              <Check className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300" />
            </div>

            <div>
              <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                Reservation Active
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Reservation Confirmed
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-light">
                To complete your early bird reservation for <strong className="text-white">$29</strong>, send a direct email to{' '}
                <strong className="text-cyan-300">teladuv1@gmail.com</strong> for your instant invoice and activation key.
              </p>
            </div>

            {/* Interactive Reservation Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30 max-w-sm mx-auto text-left text-[11px] sm:text-xs font-mono space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>RESERVATION ID:</span>
                <button
                  onClick={handleCopyCode}
                  className="text-cyan-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  title="Copy Code"
                >
                  <span>{reservationCode}</span>
                  <Copy className="w-3 h-3 text-cyan-300" />
                </button>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CLIENT:</span>
                <span className="text-white truncate max-w-[180px]">{name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>COUNTRY:</span>
                <span className="text-white">{selectedCountry.flag} {selectedCountry.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>AMOUNT:</span>
                <span className="text-emerald-400 font-bold">$29.00 Early Bird</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 border-t border-white/10 pt-2">
                <span>PAYMENT EMAIL:</span>
                <span className="text-cyan-300 font-bold">teladuv1@gmail.com</span>
              </div>
            </div>

            {/* Direct Email Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <a
                href={getMailtoUrl(reservationCode)}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-300" />
                <span>Send Direct Email for Payment Confirmation</span>
              </a>

              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-slate-200 border border-white/15 flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copiedEmail ? 'Copied teladuv1@gmail.com' : 'Copy teladuv1@gmail.com'}</span>
                </button>

                <button
                  onClick={handleDone}
                  className="px-3.5 py-1.5 rounded-full text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* World-Class Interactive Form */
          <div className="space-y-5">
            {/* Header & Pricing */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-[10px] font-mono text-cyan-300 mb-1">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  <span>GLOBAL EARLY BIRD</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Teladu V1 — Cloud ePhone
                </h2>
              </div>
              <div className="text-right">
                <div className="text-[10px] sm:text-xs line-through text-slate-500 font-mono">$99.00 MSRP</div>
                <div className="font-mono text-xl sm:text-2xl font-extrabold text-cyan-300">$29</div>
              </div>
            </div>

            {/* Inclusions Micro-Pills */}
            <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Lifetime Cloud OS</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Global Virtual eSIM</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">128GB Cloud NVMe</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Run on PC / Mac</span>
              </div>
            </div>

            {/* Step Navigation Pill */}
            <div className="flex items-center justify-between p-1 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(10);
                  setStep(1);
                }}
                className={`flex-1 py-1 px-3 rounded-lg font-semibold transition-all text-center cursor-pointer ${
                  step === 1 ? 'bg-white/15 text-white border border-cyan-400/40 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Account Details
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(10);
                  setStep(2);
                }}
                className={`flex-1 py-1 px-3 rounded-lg font-semibold transition-all text-center cursor-pointer ${
                  step === 2 ? 'bg-white/15 text-white border border-cyan-400/40 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Payment Method
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                /* Step 1: User & Country Information */
                <div className="space-y-3 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Email Address (for Invoice) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Select Country *
                      </label>
                      <select
                        value={selectedCountry.name}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900/90 text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Mobile Phone (Optional)
                      </label>
                      <div className="flex gap-1.5">
                        <span className="px-2.5 py-2.5 text-xs font-mono bg-slate-800 rounded-xl border border-white/10 text-cyan-300 shrink-0">
                          {selectedCountry.dialCode}
                        </span>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic(15);
                      setStep(2);
                    }}
                    className="w-full py-2.5 mt-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Payment Options</span>
                    <ChevronRight className="w-4 h-4 text-cyan-300" />
                  </button>
                </div>
              ) : (
                /* Step 2: Interactive Payment Systems */
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300 block">
                      Choose Payment System
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'card', label: 'Credit Card', sub: 'Visa / MC / Apple', icon: CreditCard },
                        { id: 'mobile_money', label: 'Mobile Money', sub: 'M-Pesa / MTN', icon: Smartphone },
                        { id: 'bank_transfer', label: 'Bank Wire', sub: 'SWIFT / SEPA', icon: Building },
                        { id: 'crypto', label: 'Crypto', sub: 'USDT / BTC / ETH', icon: Coins },
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
                            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600/30 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,71,255,0.4)]'
                                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                            <span className="text-[11px] font-bold">{tab.label}</span>
                            <span className="text-[9px] text-slate-400 font-mono">{tab.sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Interactive Channel Options */}
                  {paymentMethod === 'mobile_money' && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/25 space-y-2 text-xs">
                      <div className="text-[11px] font-mono text-cyan-300 font-semibold">
                        Select Mobile Carrier:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['M-Pesa', 'MTN MoMo', 'Airtel Money'].map((carrier) => (
                          <button
                            key={carrier}
                            type="button"
                            onClick={() => setMobileCarrier(carrier)}
                            className={`py-1.5 px-2 rounded-lg border text-center cursor-pointer transition-all ${
                              mobileCarrier === carrier
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {carrier}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/25 space-y-2 text-xs">
                      <div className="text-[11px] font-mono text-cyan-300 font-semibold">
                        Select Preferred Crypto:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['USDT (TRC20)', 'Bitcoin (BTC)', 'Ethereum (ETH)'].map((coin) => (
                          <button
                            key={coin}
                            type="button"
                            onClick={() => setCryptoCurrency(coin)}
                            className={`py-1.5 px-2 rounded-lg border text-center cursor-pointer transition-all text-[11px] ${
                              cryptoCurrency.includes(coin.split(' ')[0])
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <textarea
                    rows={2}
                    placeholder="Additional notes or questions (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-900/90 text-white placeholder-slate-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />

                  {/* Payment Info Notice */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      Encrypted Reservation
                    </span>
                    <span>Payment Email: teladuv1@gmail.com</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-full text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || !name || !email}
                      className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isProcessing ? 'Generating Reservation...' : `Confirm Teladu V1 · $29`}</span>
                      <ArrowRight className="w-4 h-4 text-cyan-300" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreOrderModal;
