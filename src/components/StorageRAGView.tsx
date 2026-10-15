import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Music, 
  FileText, 
  Play, 
  Pause, 
  Share2, 
  Sliders, 
  HardDrive,
  Cloud,
  CheckCircle,
  Sparkles,
  Globe,
  ExternalLink
} from 'lucide-react';
import { AudioWaveform } from './AudioWaveform';

export const StorageRAGView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'audio' | 'docs' | 'images'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [webSearchResult, setWebSearchResult] = useState<{ title: string; summary: string; url?: string } | null>(null);

  const handleSearchInternet = async (q: string) => {
    if (!q.trim()) return;
    setIsSearchingWeb(true);
    setWebSearchResult(null);
    try {
      const res = await fetch('/api/aura/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: q.trim() }),
      });
      const data = await res.json();
      setWebSearchResult({
        title: data.sources?.[0]?.title || q,
        summary: data.message || data.terminalLog || 'Knowledge retrieved.',
        url: data.sources?.[0]?.uri,
      });
    } catch (err) {
      console.warn(err);
    } finally {
      setIsSearchingWeb(false);
    }
  };

  const files = [
    { id: '1', name: 'hook_master_v2.wav', type: 'audio', meta: 'BPM 142 • 3:24 • Vocals', size: '48.2 MB', match: '98%' },
    { id: '2', name: 'beat_final_mix.wav', type: 'audio', meta: 'BPM 128 • 2:48 • Instrumental', size: '36.5 MB', match: '89%' },
    { id: '3', name: 'vocal_chop_stem.wav', type: 'audio', meta: 'BPM 140 • 1:12 • Vocals', size: '18.1 MB', match: '84%' },
    { id: '4', name: 'Project_Aura_Specs.pdf', type: 'docs', meta: 'Architecture Specification', size: '2.4 MB', match: '95%' },
    { id: '5', name: 'AI_Research_Notes.md', type: 'docs', meta: 'Dual-Brain Hybrid Matrix Notes', size: '1.2 MB', match: '91%' },
  ];

  const filtered = files.filter(f => {
    if (activeFilter === 'audio') return f.type === 'audio';
    if (activeFilter === 'docs') return f.type === 'docs';
    return true;
  }).filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-4 px-3 sm:px-4 py-2 pb-24">
      {/* RAG Header */}
      <div className="hud-glass rounded-2xl p-4 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Storage RAG</h2>
          </div>
          <p className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-300">Search • Explore • Retrieve</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Your files, knowledge and memories — instantly.</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-hud">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <HardDrive className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-slate-700 dark:text-slate-300">2.4 TB / 4 TB</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <Cloud className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Sync Online</span>
          </div>
        </div>
      </div>

      {/* Search Bar with Internet & Resource Answering */}
      <div className="space-y-2">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchInternet(searchQuery);
                }
              }}
              placeholder="Search local files, or ask anything using internet..."
              className="w-full bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-mono-hud"
            />
          </div>
          {searchQuery.trim() && (
            <button
              onClick={() => handleSearchInternet(searchQuery)}
              disabled={isSearchingWeb}
              className="px-3 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isSearchingWeb ? 'Searching...' : 'Ask Web'}</span>
            </button>
          )}
        </div>

        {/* Live Web & Internet Answer Result Card */}
        {webSearchResult && (
          <div className="p-3.5 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-700 text-xs font-mono-hud space-y-2 transition-all">
            <div className="flex items-center justify-between text-cyan-800 dark:text-cyan-300">
              <span className="font-bold flex items-center gap-1.5 text-sm font-heading">
                <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{webSearchResult.title}</span>
              </span>
              <button
                onClick={() => setWebSearchResult(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-xs">
              {webSearchResult.summary}
            </p>
            {webSearchResult.url && (
              <div className="pt-1">
                <a
                  href={webSearchResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-700 dark:text-cyan-400 hover:underline"
                >
                  <span>Verified Source Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        {(['all', 'audio', 'docs'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3 py-1 rounded-full text-xs font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-cyan-100 text-cyan-900 border border-cyan-500 font-bold dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-400'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Audio Stem Feature Player */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white dark:text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>
            <div>
              <div className="font-heading font-bold text-slate-900 dark:text-white text-sm">hook_master_v2.wav</div>
              <div className="text-[11px] font-mono-hud text-cyan-700 dark:text-cyan-400 font-semibold">BPM 142 • 3:24 • Vocals • 48.2 MB</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-hud text-slate-500 dark:text-slate-400">3:24</span>
            <AudioWaveform barCount={12} heightClass="h-4" active={isPlaying} color="bg-cyan-500 dark:bg-cyan-400" />
          </div>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono-hud font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Semantic Vector Match 98%
          </span>
          <span className="text-[11px] font-mono-hud text-slate-500">Indexed via Engine 16</span>
        </div>
      </div>

      {/* File List */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono-hud text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          Indexed Storage Files ({filtered.length})
        </h3>
        {filtered.map(file => (
          <div
            key={file.id}
            className="hud-glass rounded-xl p-3 flex items-center justify-between border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                {file.type === 'audio' ? <Music className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">{file.name}</div>
                <div className="text-[10px] font-mono-hud text-slate-500 dark:text-slate-400">{file.meta} • {file.size}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-hud bg-cyan-100 text-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-300 px-2 py-0.5 rounded border border-cyan-300 dark:border-cyan-800/40 font-bold">
                {file.match}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
