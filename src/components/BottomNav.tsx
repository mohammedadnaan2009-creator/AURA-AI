import React from 'react';
import { Home, Layers, Database, Settings, Sparkles } from 'lucide-react';
import { CyberOrb } from './CyberOrb';
import { NavTab } from '../types/aura';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onToggleTerminal,
  isTerminalOpen,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200/80 dark:border-cyan-900/30 pb-safe transition-colors">
      <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-between relative">
        {/* Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          title="Home"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Engines */}
        <button
          onClick={() => onSelectTab('engines')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'engines'
              ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          title="Engines"
          aria-label="Engines"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Engines</span>
        </button>

        {/* Center AI Chat Button */}
        <div className="relative -top-2 flex flex-col items-center">
          <button
            onClick={onToggleTerminal}
            className="group relative flex items-center justify-center p-1 rounded-full focus:outline-none transition-transform active:scale-95 cursor-pointer shadow-lg"
            title="AI Chat"
            aria-label="Toggle AI Chat"
          >
            <div
              className={`absolute -inset-1.5 rounded-full border border-cyan-400/40 ${
                isTerminalOpen
                  ? 'border-cyan-500 dark:border-cyan-300 scale-110 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                  : 'group-hover:scale-105'
              } transition-all duration-200`}
            />
            <CyberOrb size="md" pulsing={true} />
          </button>
          <span className="text-[9px] font-mono-hud text-cyan-700 dark:text-cyan-400 font-bold mt-0.5">
            AI
          </span>
        </div>

        {/* Memory */}
        <button
          onClick={() => onSelectTab('memory')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'memory'
              ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          title="Memory"
          aria-label="Memory"
        >
          <Database className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Memory</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => onSelectTab('settings')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'settings'
              ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Settings</span>
        </button>
      </div>
    </nav>
  );
};
