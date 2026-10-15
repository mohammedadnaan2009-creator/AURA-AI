import React from 'react';
import {
  Mic,
  Network,
  Hand,
  Bell,
  Eye,
  AudioWaveform,
  Phone,
  Activity,
  Brain,
  Database,
  Code,
  Share2,
  Wrench,
  Zap,
  Radio,
  Folder,
  Layers,
  Cpu,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Monitor,
  PhoneCall,
  Users,
  HardDrive,
  LucideIcon,
} from 'lucide-react';
import { Engine } from '../types/aura';

interface EngineCardProps {
  engine: Engine;
  onToggle: (id: string) => void;
  onCardClick?: (engine: Engine) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Mic,
  Network,
  Hand,
  Bell,
  Eye,
  AudioWaveform,
  Phone,
  Activity,
  Brain,
  Database,
  Code,
  Share2,
  Wrench,
  Zap,
  Radio,
  Folder,
  Layers,
  Cpu,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Monitor,
  PhoneCall,
  Users,
  HardDrive,
};

export const EngineCard: React.FC<EngineCardProps> = ({
  engine,
  onToggle,
  onCardClick,
}) => {
  const IconComponent = ICON_MAP[engine.iconName] || Cpu;

  return (
    <div
      onClick={() => onCardClick?.(engine)}
      className={`rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 relative overflow-hidden transition-all duration-200 cursor-pointer select-none border ${
        engine.isOnline
          ? 'hud-glass bg-white/70 dark:bg-slate-900/60 border-cyan-500/30 hover:border-cyan-400/60 shadow-sm dark:shadow-[0_0_12px_rgba(6,182,212,0.12)]'
          : 'bg-white/40 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800/60 opacity-60 hover:opacity-80'
      }`}
    >
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
            engine.isOnline
              ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                engine.isOnline
                  ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                  : 'bg-slate-400 dark:bg-slate-600'
              }`}
            />
            <h3 className="font-heading text-sm font-semibold text-slate-900 dark:text-white tracking-tight truncate">
              {engine.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Right: Active Toggle Switch */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(engine.id);
          }}
          disabled={engine.isHarmfulBlocked}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
            engine.isOnline
              ? 'border-cyan-500 bg-cyan-500 dark:border-cyan-400 dark:bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
              : 'border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800'
          }`}
          role="switch"
          aria-checked={engine.isOnline}
          aria-label={`Toggle ${engine.title}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
              engine.isOnline ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
