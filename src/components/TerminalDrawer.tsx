import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  ShieldCheck, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  CheckCheck, 
  Terminal,
  Activity,
  AlignRight,
  Columns2,
  PhoneCall,
  Search,
  Check
} from 'lucide-react';
import { TerminalLog } from '../types/aura';
import { CyberOrb } from './CyberOrb';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: TerminalLog[];
  onClearLogs: () => void;
  onSendCommand: (command: string) => Promise<void>;
  isProcessing: boolean;
}

// Clean chat message text helper
function cleanChatMessage(rawMessage: string): string {
  if (!rawMessage) return '';
  const userMatch = rawMessage.match(/^\[USER \/\/ TRANSMIT\]\s*"?(.*?)"?$/s);
  if (userMatch) return userMatch[1].trim();

  let cleaned = rawMessage.replace(/^\[INTERNET\]\s*/i, '');
  cleaned = cleaned.replace(/^\[[0-9A-Z._\s\/-]+\]\s*/i, '');
  return cleaned.trim() || rawMessage;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  onSendCommand,
  isProcessing,
}) => {
  const [inputCommand, setInputCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  // Layout toggle: 'right' (user right, AI from right) vs 'dual' (user right, AI from left)
  const [aiAlignment, setAiAlignment] = useState<'right' | 'dual'>('right');

  const logsEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen, isProcessing]);

  // Web Speech API Voice Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputCommand(transcript);
          onSendCommand(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission blocked. Please grant access.');
        } else {
          setSpeechError(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onSendCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError('Web Speech API is not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim() || isProcessing) return;
    const cmd = inputCommand.trim();
    setInputCommand('');
    onSendCommand(cmd);
  };

  const handleQuickChip = (cmdText: string) => {
    onSendCommand(cmdText);
  };

  if (!isOpen) return null;

  // Filter logs if searching
  const filteredLogs = searchQuery.trim()
    ? logs.filter((l) => l.message.toLowerCase().includes(searchQuery.toLowerCase()))
    : logs;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none transition-all duration-300"
      aria-label="AURA Neural Terminal and AI Chat"
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Main Cyber Terminal HUD Window */}
      <div 
        className={`w-full max-w-4xl mx-auto pointer-events-auto flex flex-col hud-glass bg-slate-950/95 dark:bg-[#030712]/95 border-t border-x border-cyan-500/40 rounded-t-2xl sm:rounded-t-3xl shadow-[0_-10px_40px_rgba(6,182,212,0.2)] transition-all duration-300 overflow-hidden relative ${
          isExpanded ? 'h-[92vh]' : 'h-[80vh] sm:h-[75vh]'
        }`}
      >
        {/* Subtle Cyber Scanlines Overlay */}
        <div className="absolute inset-0 scanline-bg pointer-events-none opacity-25" />

        {/* ========================================================= */}
        {/* 1. AUTHENTIC AURA OS CYBERNETIC HUD HEADER */}
        {/* ========================================================= */}
        <header className="px-3.5 sm:px-5 py-3 border-b border-cyan-500/25 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md flex items-center justify-between gap-3 relative z-10 select-none">
          {/* Left: Terminal Identity & Status */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <CyberOrb size="sm" pulsing={isProcessing} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-slate-100 text-sm sm:text-base tracking-wide flex items-center gap-1.5 truncate">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>AURA // NEURAL TERMINAL</span>
                </h3>
                <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono-hud font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE CONSENSUS</span>
                </span>
              </div>
              <p className="text-[11px] font-mono-hud text-cyan-400/90 truncate flex items-center gap-1.5">
                {isProcessing ? (
                  <span className="text-amber-400 animate-pulse flex items-center gap-1">
                    <Activity className="w-3 h-3 animate-spin" />
                    <span>Searching internet sources & verifying agreement...</span>
                  </span>
                ) : (
                  <span>Verified across global sources • Simple English</span>
                )}
              </p>
            </div>
          </div>

          {/* Right: Controls & Alignment Switch */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Layout Toggle: Both on Right vs Dual-Sided */}
            <button
              onClick={() => setAiAlignment(aiAlignment === 'right' ? 'dual' : 'right')}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono-hud font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                aiAlignment === 'right'
                  ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
              title={
                aiAlignment === 'right'
                  ? 'AI answers showing on the right. Click for dual-sided (left/right).'
                  : 'Dual-sided layout (User right, AI left). Click to show both on the right.'
              }
            >
              {aiAlignment === 'right' ? (
                <>
                  <AlignRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">AI ON RIGHT</span>
                </>
              ) : (
                <>
                  <Columns2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">DUAL SIDED</span>
                </>
              )}
            </button>

            {/* Search Filter Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                showSearch
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title="Search logs"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Clear Terminal Logs */}
            <button
              onClick={onClearLogs}
              className="p-1.5 rounded-lg bg-slate-800/40 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
              title="Clear terminal stream"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Expand / Minimize Drawer */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer hidden xs:block"
              title={isExpanded ? 'Minimize drawer' : 'Maximize drawer'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Terminal Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Search Input Bar (if open) */}
        {showSearch && (
          <div className="bg-slate-900/90 border-b border-cyan-500/20 px-4 py-2 flex items-center gap-2 relative z-10">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter terminal stream..."
              className="bg-transparent flex-1 text-xs font-mono-hud text-slate-200 placeholder-slate-500 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-mono-hud text-slate-400 hover:text-slate-200"
              >
                CLEAR
              </button>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. CHAT STREAM / TERMINAL LOG FEED */}
        {/* ========================================================= */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 relative z-10 select-text">
          {/* Asimov Compliance & Simple English Banner */}
          <div className="mx-auto max-w-md bg-slate-900/80 border border-cyan-500/30 rounded-xl p-2.5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-cyan-300 text-[11px] font-mono-hud">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>AURA OS v1.0 // ASIMOV SAFEGUARD ACTIVE</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Replies verified across internet sources & written in basic English.
            </p>
          </div>

          {/* Messages Stream */}
          {filteredLogs.map((log) => {
            const isUser = log.sender === 'user' || log.type === 'voice';
            const isSystem = log.sender === 'system' || log.type === 'kernel' || log.type === 'system';
            const cleanText = cleanChatMessage(log.message);

            // ==========================================
            // SYSTEM / KERNEL BOOT LOGS (Centered Monospace)
            // ==========================================
            if (isSystem && !isUser) {
              return (
                <div key={log.id} className="flex justify-center my-1.5">
                  <div className="bg-slate-900/60 border border-slate-800 text-slate-400 text-[11px] font-mono-hud px-3 py-1 rounded-full shadow-xs max-w-lg text-center truncate">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold mr-1.5">
                      [{log.timestamp}]
                    </span>
                    <span>{log.message}</span>
                  </div>
                </div>
              );
            }

            // ==========================================
            // USER MESSAGE BUBBLE (Outgoing -> Right)
            // ==========================================
            if (isUser) {
              return (
                <div key={log.id} className="flex justify-end items-end gap-2 pl-8 animate-slide-in-right">
                  <div className="relative max-w-[88%] sm:max-w-[75%] rounded-2xl rounded-tr-xs bg-cyan-950/50 border border-cyan-400/40 text-cyan-50 px-4 py-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    {/* User Tag */}
                    <div className="flex items-center justify-between gap-3 text-[10px] font-mono-hud text-cyan-400 font-bold mb-1 select-none">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>YOU // TRANSMIT</span>
                      </span>
                    </div>

                    {/* Message Body */}
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans break-words text-slate-100">
                      {cleanText}
                    </p>

                    {/* Timestamp & Sent Checkmarks */}
                    <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] font-mono-hud text-cyan-400/80 select-none">
                      <span>{log.timestamp}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  </div>
                </div>
              );
            }

            // ==========================================
            // AI ASSISTANT ANSWER (Showing on Right or Dual-Left)
            // ==========================================
            const isRightAligned = aiAlignment === 'right';

            return (
              <div 
                key={log.id} 
                className={`flex items-start gap-2 animate-slide-in-right ${
                  isRightAligned ? 'justify-end pl-6 sm:pl-12' : 'justify-start pr-6 sm:pr-12'
                }`}
              >
                <div className="relative max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tl-xs bg-slate-900/90 border border-emerald-500/40 text-slate-100 px-4 py-3 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
                  {/* AI Assistant Tag & Header */}
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap select-none border-b border-emerald-500/20 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono-hud font-bold text-emerald-300">
                        AURA AI // ASSISTANT
                      </span>
                      <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono-hud font-bold border border-emerald-400/30">
                        ✓ VERIFIED FACT
                      </span>
                    </div>

                    <span className="text-[9px] font-mono-hud text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                      Simple English
                    </span>
                  </div>

                  {/* Main Answer Text in Simple English */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans break-words text-slate-100">
                    {cleanText}
                  </div>

                  {/* Cross-Source Internet Consensus Card */}
                  {log.consensus && (
                    <div className="mt-2.5 rounded-xl bg-slate-950/80 border-l-4 border-emerald-400 p-2.5 text-xs font-sans shadow-inner">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px] font-mono-hud">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Internet Consensus: {log.consensus.agreementRate || '100%'}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-hud font-semibold text-[9px] border border-emerald-400/30 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{log.consensus.status || 'Verified Across Sources'}</span>
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-300 mb-1.5 leading-normal">
                        Multiple independent internet sources were consulted and they report the identical factual answer.
                      </p>

                      {log.consensus.sourcesList && log.consensus.sourcesList.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1.5 border-t border-slate-800">
                          <span className="text-[9px] font-mono-hud text-slate-400">Agreed Sources:</span>
                          {log.consensus.sourcesList.map((srcName, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-mono-hud"
                            >
                              <span className="text-emerald-400 font-bold">✓</span> {srcName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* External Web Sources / Citations */}
                  {log.sources && log.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono-hud text-cyan-400 flex items-center gap-1 font-semibold">
                        <Globe className="w-3 h-3 text-cyan-400" />
                        <span>Sources:</span>
                      </span>
                      {log.sources.map((s, sIdx) => (
                        <a
                          key={sIdx}
                          href={s.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-hud bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-colors shadow-xs"
                        >
                          <span className="truncate max-w-[140px]">{s.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Timestamp Footer */}
                  <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] font-mono-hud text-slate-400 select-none">
                    <span>{log.timestamp}</span>
                    <span className="text-emerald-400 font-bold">AURA // AI</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Live AI Processing / Searching Feedback Indicator */}
          {isProcessing && (
            <div 
              className={`flex items-start gap-2 animate-slide-in-right ${
                aiAlignment === 'right' ? 'justify-end pl-6 sm:pl-12' : 'justify-start pr-6 sm:pr-12'
              }`}
            >
              <div className="rounded-2xl bg-slate-900/90 border border-cyan-400/50 p-3 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping delay-100" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping delay-200" />
                </div>
                <div>
                  <p className="text-xs font-mono-hud font-bold text-cyan-300">
                    AURA is searching internet sources...
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Comparing multiple authoritative sources for 100% agreement
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={logsEndRef} />
        </div>

        {/* ========================================================= */}
        {/* 3. QUICK SUGGESTION CHIPS BAR */}
        {/* ========================================================= */}
        <div className="px-3 sm:px-4 py-1.5 bg-slate-900/80 border-t border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar relative z-10">
          <span className="text-[9px] font-mono-hud text-cyan-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>TRY:</span>
          </span>
          <button
            onClick={() => handleQuickChip('Why is the sky blue?')}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono-hud bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
          >
            Why is the sky blue?
          </button>
          <button
            onClick={() => handleQuickChip('What is photosynthesis?')}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono-hud bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
          >
            What is photosynthesis?
          </button>
          <button
            onClick={() => handleQuickChip('What is quantum computing?')}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono-hud bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
          >
            What is quantum computing?
          </button>
          <button
            onClick={() => handleQuickChip('Call Yashwanth')}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono-hud bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 flex-shrink-0"
          >
            <PhoneCall className="w-2.5 h-2.5" />
            <span>Call Yashwanth</span>
          </button>
          <button
            onClick={() => handleQuickChip('Explain the First Law of Robotics')}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono-hud bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
          >
            Three Laws of Robotics
          </button>
        </div>

        {/* Speech Error Notice (if any) */}
        {speechError && (
          <div className="bg-rose-950/80 border-t border-rose-500/40 px-4 py-1.5 text-[11px] font-mono-hud text-rose-300 flex items-center justify-between relative z-10">
            <span>⚠️ {speechError}</span>
            <button 
              onClick={() => setSpeechError(null)}
              className="text-xs text-rose-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. CYBER TERMINAL PROMPT INPUT BAR */}
        {/* ========================================================= */}
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 bg-slate-900/95 border-t border-cyan-500/30 flex items-center gap-2 relative z-10"
        >
          {/* Prompt Symbol */}
          <div className="hidden xs:flex items-center text-cyan-400 font-mono-hud text-sm font-bold pl-1">
            <span>&gt;_</span>
          </div>

          {/* Text Input Pill */}
          <div className="flex-1 relative flex items-center bg-slate-950 border border-cyan-500/30 focus-within:border-cyan-400 rounded-xl px-3 py-2 shadow-inner transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Ask anything or type a command... (e.g. Why is the sky blue?)"
              className="w-full bg-transparent text-xs sm:text-sm font-sans text-slate-100 placeholder-slate-500 focus:outline-none"
              disabled={isProcessing}
            />
          </div>

          {/* Web Speech Voice Mic Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isListening
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'bg-slate-800/80 hover:bg-cyan-950/50 border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Voice input (Web Speech)'}
          >
            {isListening ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Command Button */}
          <button
            type="submit"
            disabled={!inputCommand.trim() || isProcessing}
            className={`px-3.5 py-2.5 rounded-xl font-mono-hud text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              inputCommand.trim() && !isProcessing
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
            title="Transmit command"
          >
            <span className="hidden sm:inline">SEND</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
