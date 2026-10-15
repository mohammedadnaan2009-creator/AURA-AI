import React from 'react';
import { Palette, Image, Video, Music, Box, Sparkles, CheckCircle } from 'lucide-react';
import { Engine } from '../types/aura';

interface CreativeSuiteCardProps {
  engine: Engine;
  onToggle: (id: string) => void;
  onGenerateQuickAsset?: (modality: 'image' | 'video' | 'audio' | '3d') => void;
  onOpenStudio?: () => void;
}

export const CreativeSuiteCard: React.FC<CreativeSuiteCardProps> = ({
  engine,
  onToggle,
  onGenerateQuickAsset,
  onOpenStudio,
}) => {
  const subPills = [
    { 
      type: 'image' as const, 
      label: 'Image', 
      status: 'Ready', 
      icon: Image, 
      border: 'border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-500/40 dark:text-cyan-300 dark:bg-cyan-950/40' 
    },
    { 
      type: 'video' as const, 
      label: 'Video', 
      status: 'Ready', 
      icon: Video, 
      border: 'border-purple-300 bg-purple-50 text-purple-900 dark:border-purple-500/40 dark:text-purple-300 dark:bg-purple-950/40' 
    },
    { 
      type: 'audio' as const, 
      label: 'Audio', 
      status: 'Ready', 
      icon: Music, 
      border: 'border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-500/40 dark:text-blue-300 dark:bg-blue-950/40' 
    },
    { 
      type: '3d' as const, 
      label: '3D', 
      status: 'Ready', 
      icon: Box, 
      border: 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:text-emerald-300 dark:bg-emerald-950/40' 
    },
  ];

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-300 col-span-full ${
        engine.isOnline ? 'hud-glass-card' : 'hud-glass-card-offline'
      }`}
    >
      {/* Top subtle cyan laser glow line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
              engine.isOnline
                ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300 dark:bg-fuchsia-500/15 dark:text-fuchsia-300 dark:border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.25)]'
                : 'bg-slate-200 text-slate-500 border-slate-300 dark:bg-slate-800/50 dark:border-slate-700/50'
            }`}
          >
            <Palette className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
                {engine.number} {engine.title}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  engine.isOnline
                    ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                    : 'bg-slate-400 dark:bg-slate-600'
                }`}
              />
              <span
                className={`text-xs font-mono-hud font-medium ${
                  engine.isOnline ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-slate-500'
                }`}
              >
                {engine.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Cybernetic Toggle */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-xs font-mono-hud text-slate-500 dark:text-slate-400 hidden sm:inline">
            {engine.isOnline ? 'Active Pipeline' : 'Engine Idle'}
          </span>
          <button
            type="button"
            onClick={() => onToggle(engine.id)}
            className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
              engine.isOnline
                ? 'border-cyan-500 bg-cyan-100 shadow-[0_0_8px_rgba(6,182,212,0.3)] dark:border-cyan-400 dark:bg-cyan-950/80 dark:shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                : 'border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-900'
            }`}
            role="switch"
            aria-checked={engine.isOnline}
            aria-label="Toggle Creative Generation Suite"
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full transition duration-200 ease-in-out ${
                engine.isOnline
                  ? 'translate-x-5 bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_6px_#38bdf8]'
                  : 'translate-x-0 bg-slate-400 dark:bg-slate-500'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400/90 leading-relaxed mb-4 transition-colors">
        {engine.description}
      </p>

      {/* Sub-Pills Container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/90 dark:border-slate-800/80 transition-colors">
        {subPills.map(pill => {
          const Icon = pill.icon;
          return (
            <button
              key={pill.label}
              onClick={() => onGenerateQuickAsset?.(pill.type)}
              disabled={!engine.isOnline}
              className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono-hud transition-all group ${
                engine.isOnline
                  ? `${pill.border} hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm`
                  : 'border-slate-200 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 bg-slate-100/50 dark:bg-slate-950/30 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{pill.label}:</span>
              </div>
              <span className="flex items-center gap-1 font-bold text-[11px] opacity-90">
                <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {pill.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Action Bar */}
      <div className="mt-3 pt-2.5 border-t border-dashed border-slate-200/90 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-[10px] font-mono-hud text-slate-500 dark:text-slate-400">
          Multimodal Pipeline • Click any modality to synthesize or launch 3D Asset Studio
        </span>
        {onOpenStudio && (
          <button
            type="button"
            onClick={onOpenStudio}
            disabled={!engine.isOnline}
            className={`px-3 py-1 rounded-lg text-xs font-mono-hud font-bold tracking-tight uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              engine.isOnline
                ? 'bg-fuchsia-50 hover:bg-fuchsia-100 dark:bg-fuchsia-950/60 dark:hover:bg-fuchsia-900 text-fuchsia-900 dark:text-fuchsia-200 border border-fuchsia-300 dark:border-fuchsia-700/60 shadow-sm hover:scale-[1.02]'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" />
            Launch 3D Spatial & Creative Studio ➔
          </button>
        )}
      </div>
    </div>
  );
};
