import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Palette, 
  Settings2, 
  MessageSquare, 
  Database, 
  Radio, 
  Layers,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { EngineCategory } from '../types/aura';

interface FilterPillsProps {
  selectedCategory: EngineCategory;
  onSelectCategory: (category: EngineCategory) => void;
  categoryCounts: Record<EngineCategory, number>;
}

interface PillConfig {
  name: EngineCategory;
  icon: React.ComponentType<{ className?: string }>;
}

const PILLS: PillConfig[] = [
  { name: 'All Engines', icon: Layers },
  { name: 'Asimov Safe', icon: ShieldCheck },
  { name: 'Quarantined', icon: AlertTriangle },
  { name: 'Core', icon: Cpu },
  { name: 'Creative', icon: Palette },
  { name: 'System', icon: Settings2 },
  { name: 'Communication', icon: MessageSquare },
  { name: 'RAG', icon: Database },
  { name: 'Hardware', icon: Radio },
];

export const FilterPills: React.FC<FilterPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full px-3 sm:px-4 py-2">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {PILLS.map(pill => {
          const Icon = pill.icon;
          const isActive = selectedCategory === pill.name;
          const count = categoryCounts[pill.name] ?? 0;

          return (
            <button
              key={pill.name}
              onClick={() => onSelectCategory(pill.name)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-200 select-none ${
                isActive
                  ? 'bg-cyan-100 text-cyan-900 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-semibold dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-400 dark:shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                  : 'bg-white/80 text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:border-cyan-400 hover:bg-cyan-50/50 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-white dark:border-slate-800/80 dark:hover:border-cyan-500/40 dark:hover:bg-slate-900/90'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`} />
              <span>{pill.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-hud ${
                  isActive
                    ? 'bg-cyan-200/70 text-cyan-900 dark:bg-cyan-500/20 dark:text-cyan-200'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
