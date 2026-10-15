import React from 'react';
import { 
  Settings, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';
import { DevicePermissionsState } from '../types/aura';
import { CyberOrb } from './CyberOrb';

interface HeaderHUDProps {
  totalEngines: number;
  onlineEngines: number;
  quarantinedCount?: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenTerminal: () => void;
  onOpenAsimovModal?: () => void;
  permissions?: DevicePermissionsState;
  onOpenPermissions?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  totalEngines,
  onlineEngines,
  quarantinedCount = 2,
  theme,
  onToggleTheme,
  onOpenSettings,
  onOpenTerminal,
}) => {
  const safeEnginesCount = totalEngines - quarantinedCount;

  return (
    <header className="w-full relative z-20 px-3 sm:px-4 pt-3 pb-2">
      <div className="flex items-center justify-between hud-glass rounded-2xl px-4 py-3 border border-cyan-500/20 shadow-sm transition-colors">
        {/* Left: Core Orb + Title "16 safe engines" */}
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenTerminal}
            className="cursor-pointer group relative p-0.5 rounded-full transition-transform active:scale-95"
            title="Open AI Assistant"
          >
            <CyberOrb size="sm" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-heading font-bold tracking-tight text-slate-900 dark:text-white">
                {safeEnginesCount} safe engines
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono-hud font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{onlineEngines} active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Essential Action Icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-xl text-slate-600 dark:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-950/40 hover:text-cyan-500 transition-colors cursor-pointer"
            title="Open AI Chat"
            aria-label="Open AI Chat"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-950/40 hover:text-cyan-500 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-950/40 transition-colors cursor-pointer"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
