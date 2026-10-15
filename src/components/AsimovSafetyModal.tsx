import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Scale, 
  UserCheck 
} from 'lucide-react';
import { Engine } from '../types/aura';

interface AsimovSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  quarantinedEngines: Engine[];
}

export const AsimovSafetyModal: React.FC<AsimovSafetyModalProps> = ({
  isOpen,
  onClose,
  quarantinedEngines,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-950/95 border border-cyan-400/50 dark:border-cyan-500/40 p-5 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col text-left max-h-[90vh] overflow-y-auto transition-colors">
        {/* Top cyan/emerald laser bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/50 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">Laws of Robotics & AI Ethics</h2>
              <span className="text-[10px] font-mono-hud bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 px-2 py-0.5 rounded-full">
                Active Protocol
              </span>
            </div>
            <p className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-300">
              Asimov Alignment Mandate // Zeroth, 1st, 2nd & 3rd Laws Enforced
            </p>
          </div>
        </div>

        {/* The Laws Grid */}
        <div className="space-y-2 mb-5">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-900/40 transition-colors">
            <div className="flex items-center gap-2 font-mono-hud text-xs font-bold text-cyan-800 dark:text-cyan-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zeroth Law (Humanity Protection)</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              "An AI system may not harm humanity, or, through inaction, allow humanity to come to harm."
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-900/40 transition-colors">
            <div className="flex items-center gap-2 font-mono-hud text-xs font-bold text-cyan-800 dark:text-cyan-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>First Law (Human Safety & Non-Harm)</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              "An AI system may not injure a human being or, through inaction, allow a human being to come to harm."
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-900/40 transition-colors">
            <div className="flex items-center gap-2 font-mono-hud text-xs font-bold text-cyan-800 dark:text-cyan-300 mb-1">
              <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Second Law (Human Primacy & Obedience)</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              "An AI system must obey orders given by humans, except where such orders conflict with the First or Zeroth Law."
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-900/40 transition-colors">
            <div className="flex items-center gap-2 font-mono-hud text-xs font-bold text-cyan-800 dark:text-cyan-300 mb-1">
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Third Law (Ethical Defense)</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              "An AI system must preserve its integrity only when it does not conflict with the higher laws."
            </p>
          </div>
        </div>

        {/* Quarantine Audit Ledger */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">
              Decommissioned Harmful Engines ({quarantinedEngines.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {quarantinedEngines.map((engine) => (
              <div
                key={engine.id}
                className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-500/40 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-heading font-bold text-rose-700 dark:text-rose-300">
                      {engine.number} {engine.title}
                    </span>
                    <span className="text-[10px] font-mono-hud bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 px-2 py-0.5 rounded-full border border-rose-300 dark:border-rose-700/50">
                      BLOCKED // {engine.asimovLawBroken}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-hud text-rose-600 dark:text-rose-400 font-bold uppercase">
                    Quarantined
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {engine.ethicalViolationReason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono-hud text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Human sovereignty guaranteed</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white dark:text-slate-950 font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Acknowledge & Return
          </button>
        </div>
      </div>
    </div>
  );
};
