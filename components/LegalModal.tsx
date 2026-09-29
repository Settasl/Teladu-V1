import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#070b16] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,71,255,0.35)] text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-300 border border-blue-500/30">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {type === 'privacy' ? 'Teladu Privacy Policy' : 'Teladu Terms of Service'}
              </h2>
              <p className="text-xs text-slate-400 font-mono">Last Updated: September 2026 · Official Legal Notice</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Prose */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-5 text-xs text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">1. Overview & Commitment</h3>
                <p>
                  Teladu Technologies Inc. (&quot;Teladu&quot;) is committed to complete digital sovereignty. The Teladu V1 Cloud ePhone
                  operates with zero local telemetry and runs within an isolated cloud-encrypted enclave. We do not sell your personal
                  information, browsing history, voice calls, or camera media to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">2. Data Collection & Isolation</h3>
                <p>
                  When you register for a Teladu V1 Cloud account, we store your email address, virtual eSIM assignment, and cloud storage
                  partition. User content—including contacts, media gallery items, messages, and application state—is encrypted with
                  AES-256-GCM encryption keys controlled solely by your account credentials.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">3. Virtual eSIM & Telephony Privacy</h3>
                <p>
                  Call routing and SMS messages through the Teladu Virtual SIM protocol are handled via encrypted WebRTC gateways.
                  Teladu complies with international telecommunication standards while ensuring that metadata logs are purged after
                  72 hours.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">4. Contact & Inquiries</h3>
                <p>
                  For data requests, deletion requests, or privacy inquiries, contact our legal and privacy team directly at{' '}
                  <a href="mailto:teladuv1@gmail.com" className="text-cyan-400 underline font-semibold">
                    teladuv1@gmail.com
                  </a>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">1. Acceptance of Agreement</h3>
                <p>
                  By accessing or purchasing an early bird reservation for the Teladu V1 Cloud ePhone (&quot;Service&quot;), you agree
                  to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">2. Early Bird Reservation ($29)</h3>
                <p>
                  The Early Bird order ($29) provides priority activation for the Teladu V1 Cloud ePhone, lifetime cloud account access,
                  128GB of cloud storage, and a global virtual eSIM profile with 5GB complimentary international roaming. All pre-order
                  fees are backed by a 14-day money-back refund guarantee prior to final account activation.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">3. Permitted Use</h3>
                <p>
                  You agree to use the Teladu V1 Cloud ePhone for lawful personal or business communications. You may not use the virtual
                  device or eSIM routing for automated bulk spamming, distributed denial-of-service activities, or unauthorized network
                  penetration testing.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">4. Contact & Notices</h3>
                <p>
                  Legal notices, billing support, and customer inquiries must be sent to{' '}
                  <a href="mailto:teladuv1@gmail.com" className="text-cyan-400 underline font-semibold">
                    teladuv1@gmail.com
                  </a>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">Questions? Reach out to teladuv1@gmail.com</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 rounded-full transition-all shadow-[0_0_12px_rgba(0,71,255,0.35)] cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
