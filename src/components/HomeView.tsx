import React from 'react';
import { 
  Palette, 
  Database, 
  Radio, 
  Share2, 
  Sparkles, 
  Terminal
} from 'lucide-react';
import { CyberOrb } from './CyberOrb';

interface HomeViewProps {
  onNavigateEngines: () => void;
  onNavigateMemory: () => void;
  onNavigateSettings: () => void;
  onOpenTerminal: () => void;
  onlineCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateEngines,
  onNavigateMemory,
  onOpenTerminal,
  onlineCount,
}) => {
  return (
    <div className="space-y-3 px-3 sm:px-4 py-2 pb-24">
      {/* AI Assistant Quick Card */}
      <div 
        onClick={onOpenTerminal}
        className="hud-glass rounded-2xl p-4 cursor-pointer hover:border-cyan-400/50 transition-all flex items-center justify-between gap-3 border border-cyan-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 flex items-center justify-center flex-shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white text-sm">
                AI Assistant
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-400">
              Online • Tap to chat
            </p>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-cyan-500" />
      </div>

      {/* Core Hub Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div 
          onClick={onNavigateEngines}
          className="hud-glass rounded-xl p-3 cursor-pointer hover:border-cyan-400/50 transition-all border border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="w-8 h-8 rounded-lg bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-400/30 flex items-center justify-center mb-2">
            <Palette className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-semibold text-slate-900 dark:text-white text-sm">Creative</h4>
        </div>

        <div 
          onClick={onNavigateMemory}
          className="hud-glass rounded-xl p-3 cursor-pointer hover:border-cyan-400/50 transition-all border border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 flex items-center justify-center mb-2">
            <Database className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-semibold text-slate-900 dark:text-white text-sm">Memory</h4>
        </div>

        <div 
          onClick={onNavigateEngines}
          className="hud-glass rounded-xl p-3 cursor-pointer hover:border-cyan-400/50 transition-all border border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-400/30 flex items-center justify-center mb-2">
            <Radio className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-semibold text-slate-900 dark:text-white text-sm">Radios</h4>
        </div>

        <div 
          onClick={onNavigateEngines}
          className="hud-glass rounded-xl p-3 cursor-pointer hover:border-cyan-400/50 transition-all border border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-400/30 flex items-center justify-center mb-2">
            <Share2 className="w-4 h-4" />
          </div>
          <h4 className="font-heading font-semibold text-slate-900 dark:text-white text-sm">Mesh</h4>
        </div>
      </div>
    </div>
  );
};
