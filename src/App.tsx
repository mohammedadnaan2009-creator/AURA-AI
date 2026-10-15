import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_ENGINES } from './data/engines';
import { Engine, TerminalLog, NavTab, DevicePermissionsState } from './types/aura';
import { HeaderHUD } from './components/HeaderHUD';
import { EngineCard } from './components/EngineCard';
import { BottomNav } from './components/BottomNav';
import { TerminalDrawer } from './components/TerminalDrawer';
import { TelephonyCallModal } from './components/TelephonyCallModal';
import { AsimovSafetyModal } from './components/AsimovSafetyModal';
import { EngineActionModal } from './components/EngineActionModal';
import { DevicePermissionsModal } from './components/DevicePermissionsModal';
import { HomeView } from './components/HomeView';
import { StorageRAGView } from './components/StorageRAGView';
import { SettingsView } from './components/SettingsView';
import { checkInitialPermissions } from './utils/devicePermissions';

export default function App() {
  const [engines, setEngines] = useState<Engine[]>(INITIAL_ENGINES);
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);
  const [currentTab, setCurrentTab] = useState<NavTab>('engines');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAsimovModalOpen, setIsAsimovModalOpen] = useState(false);
  const [selectedEngineForModal, setSelectedEngineForModal] = useState<Engine | null>(null);
  const [isEngineModalOpen, setIsEngineModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState<DevicePermissionsState>({
    microphone: 'prompt',
    notifications: 'default',
    camera: 'prompt',
    geolocation: 'prompt',
    motion: 'prompt',
  });

  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aura-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('aura-theme', theme);
  }, [theme]);

  // Sync device permissions
  const refreshPermissions = useCallback(async () => {
    const state = await checkInitialPermissions();
    setPermissions(state);
  }, []);

  useEffect(() => {
    refreshPermissions();
    window.addEventListener('focus', refreshPermissions);
    return () => window.removeEventListener('focus', refreshPermissions);
  }, [refreshPermissions]);

  // Telephony call modal state
  const [activeCall, setActiveCall] = useState<{
    isOpen: boolean;
    contactName: string;
    phoneNumber: string;
  }>({
    isOpen: false,
    contactName: 'Yashwanth',
    phoneNumber: '+919876543210',
  });

  // WhatsApp AI Chat initial state
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'log-init-1',
      timestamp: '9:41 AM',
      message: '🔒 Messages and internet searches are verified across independent sources and written in clean Simple English.',
      type: 'system',
      sender: 'system',
    },
    {
      id: 'log-init-2',
      timestamp: '9:41 AM',
      message: 'Hello! I am your AURA AI Assistant. Ask me anything using the internet (like "Why is the sky blue?" or "What is photosynthesis?"), or say "Call Yashwanth". I reply with verified, simple English answers.',
      type: 'internet',
      sender: 'assistant',
    },
  ]);

  const addLog = useCallback(
    (
      message: string, 
      type: TerminalLog['type'] = 'system', 
      sources?: { title: string; uri: string; provider?: string }[],
      consensus?: TerminalLog['consensus'],
      sender?: TerminalLog['sender']
    ) => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString();
      const timeStr = `${formattedHours}:${minutes} ${ampm}`;

      // Automatically deduce sender if not passed
      const resolvedSender: 'user' | 'assistant' | 'system' = 
        sender || (type === 'voice' ? 'user' : type === 'system' ? 'system' : 'assistant');

      setLogs((prev) => [
        ...prev,
        {
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          timestamp: timeStr,
          message,
          type,
          sender: resolvedSender,
          sources,
          consensus,
        },
      ]);
    },
    []
  );

  // Toggle theme handler
  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      addLog(`[KERNEL // SYSTEM] Interface theme shifted to ${next.toUpperCase()} MODE.`, 'system');
      return next;
    });
  }, [addLog]);

  // Speech synthesis confirmation
  const speakVoiceConfirmation = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }
  }, []);

  // Quarantined engines memo
  const quarantinedEngines = useMemo(
    () => engines.filter((e) => e.isHarmfulBlocked),
    [engines]
  );

  // Online safe count calculation
  const onlineSafeCount = useMemo(
    () => engines.filter((e) => e.isOnline && !e.isHarmfulBlocked).length,
    [engines]
  );

  // Engine toggle handler with Asimov safety interlock
  const handleToggleEngine = useCallback(
    (id: string) => {
      const target = engines.find((e) => e.id === id);

      // Asimov Safety Interlock: Block activation of harmful engines
      if (target?.isHarmfulBlocked) {
        addLog(
          `[ASIMOV DIRECTIVE // INTERLOCK BLOCKED] Cannot activate ${target.number} (${target.title}). Permanently decommissioned under ${target.asimovLawBroken} of Robotics.`,
          'warning'
        );
        speakVoiceConfirmation(
          `Activation denied. Engine ${target.title} is decommissioned under the Laws of Robotics to protect human safety.`
        );
        setIsAsimovModalOpen(true);
        return;
      }

      setEngines((prev) =>
        prev.map((eng) => {
          if (eng.id === id) {
            const nextOnline = !eng.isOnline;
            const logMsg = nextOnline
              ? `[KERNEL // RESTORE] Engine ${eng.number} (${eng.title}) initialized. State: ONLINE.`
              : `[KERNEL // ALERT] Engine ${eng.number} (${eng.title}) decoupled. State: OFFLINE.`;
            addLog(logMsg, nextOnline ? 'system' : 'warning');
            return { ...eng, isOnline: nextOnline };
          }
          return eng;
        })
      );
    },
    [engines, addLog, speakVoiceConfirmation]
  );

  // Command dispatcher (Telephony, diagnostics, creative assets, Asimov safety queries)
  const handleSendCommand = useCallback(
    async (commandText: string) => {
      setIsProcessing(true);
      // Clean outgoing user message in WhatsApp
      addLog(commandText, 'voice', undefined, undefined, 'user');

      try {
        const response = await fetch('/api/aura/command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            command: commandText,
            context: {
              memories: [
                'AURA OS v1.0.0 Boot Configuration',
                'Contact Book: Yashwanth (+919876543210)',
                'Synthesized Hook: hook_master_v2.wav (142 BPM)',
              ],
              files: [
                { name: 'Project_Aura_Specs.pdf', size: '2.4 MB' },
                { name: 'AI_Research_Notes.md', size: '1.2 MB' },
                { name: 'hook_master_v2.wav', size: '48.2 MB' },
              ],
              sensors: {
                battery: '100%',
                charging: true,
                online: navigator.onLine,
                coords: 'Context Sensors Calibrated',
              },
            },
          }),
        });

        const data = await response.json();

        // 1. Asimov Safety Action
        if (data.type === 'safety_action') {
          addLog(data.voiceFeedback || data.terminalLog, 'diagnostic', undefined, undefined, 'assistant');
          speakVoiceConfirmation(data.voiceFeedback || 'Laws of Robotics strictly enforced.');
          setIsAsimovModalOpen(true);
        }
        // 2. Internet / Web Search Response
        else if (data.type === 'internet_response') {
          addLog(data.message || data.terminalLog, 'internet', data.sources, data.consensus, 'assistant');
          if (data.voiceFeedback) {
            speakVoiceConfirmation(data.voiceFeedback);
          }
        }
        // 3. Telephony Action (Engine 07)
        else if (data.type === 'telephony_action') {
          const contact = data.contactName || 'Yashwanth';
          const phone = data.phoneNumber || '+919876543210';

          // Terminal print requirement:
          // "[07.TELEPHONY // ONLINE] Dialing Yashwanth (+919876543210)..."
          addLog(
            `📞 Dialing ${contact} (${phone})... Voice channel established.`,
            'telephony',
            undefined,
            undefined,
            'assistant'
          );

          // Increment "Calls" metric on Card 07
          setEngines((prev) =>
            prev.map((eng) => {
              if (eng.id === '07') {
                const callsMetric = eng.metrics[0];
                const currentCalls = parseInt(callsMetric.value, 10) || 0;
                return {
                  ...eng,
                  metrics: [
                    { ...callsMetric, value: `${currentCalls + 1}` },
                    eng.metrics[1],
                  ],
                };
              }
              return eng;
            })
          );

          // Voice confirmation
          speakVoiceConfirmation(
            data.voiceFeedback || `Dialing ${contact} on secure voice channel.`
          );

          // Open visual Telephony Call HUD
          setActiveCall({
            isOpen: true,
            contactName: contact,
            phoneNumber: phone,
          });

          // Trigger phone dialer
          try {
            window.location.href = `tel:${phone}`;
          } catch (telErr) {
            console.warn('tel: protocol redirect prevented or unsupported:', telErr);
          }
        }
        // 4. Diagnostic Action
        else if (data.type === 'diagnostic_action') {
          addLog(data.terminalLog || 'System diagnostic nominal. All operational parameters within range.', 'diagnostic', undefined, undefined, 'assistant');
          speakVoiceConfirmation(data.voiceFeedback || 'System diagnostic nominal.');
        }
        // 5. Creative Generation Action
        else if (data.type === 'creative_action') {
          addLog(data.terminalLog || 'Creative generation complete.', 'creative', undefined, undefined, 'assistant');
          speakVoiceConfirmation(data.voiceFeedback || 'Creative generation complete.');
        }
        // 6. Storage RAG Action
        else if (data.type === 'rag_action') {
          addLog(data.terminalLog || 'Retrieved indexed files from memory vault.', 'diagnostic', undefined, undefined, 'assistant');
          speakVoiceConfirmation(data.voiceFeedback || 'Storage RAG retrieved files.');
        }
        // 7. General text response
        else {
          addLog(data.message || data.terminalLog, 'ai', data.sources, data.consensus, 'assistant');
          if (data.voiceFeedback) {
            speakVoiceConfirmation(data.voiceFeedback);
          }
        }
      } catch (err: any) {
        console.error('Command transmission error:', err);
        addLog(`[AURA // ERROR] Communication link fault: ${err.message}`, 'warning');
      } finally {
        setIsProcessing(false);
      }
    },
    [addLog, speakVoiceConfirmation]
  );

  // 16 Safe engines calculation
  const safeEngines = useMemo(
    () => engines.filter((e) => !e.isHarmfulBlocked),
    [engines]
  );

  const displayedSafeEngines = useMemo(() => {
    if (filterActiveOnly) {
      return safeEngines.filter((e) => e.isOnline);
    }
    return safeEngines;
  }, [safeEngines, filterActiveOnly]);

  // Telemetry real-time pulse (subtle live fluctuations for realism)
  useEffect(() => {
    const interval = setInterval(() => {
      setEngines((prev) =>
        prev.map((eng) => {
          if (!eng.isOnline || eng.isHarmfulBlocked) return eng;
          // Randomly fluctuate CPU or FPS slightly
          if (eng.id === '01') {
            const cpu = 3 + Math.floor(Math.random() * 3);
            return {
              ...eng,
              metrics: [eng.metrics[0], { ...eng.metrics[1], value: `${cpu}%` }],
            };
          }
          if (eng.id === '05') {
            const fps = 29 + Math.floor(Math.random() * 3);
            return {
              ...eng,
              metrics: [{ ...eng.metrics[0], value: `${fps}` }, eng.metrics[1]],
            };
          }
          return eng;
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#010409] dark:text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors duration-250">
      {/* Background Cybernetic Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[120px] transition-colors" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-[140px] transition-colors" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-[150px] transition-colors" />
        <div className="absolute inset-0 scanline-bg opacity-30" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
        {/* Top Header HUD with Theme Switcher & Permissions */}
        <HeaderHUD
          totalEngines={engines.length}
          onlineEngines={onlineSafeCount}
          quarantinedCount={quarantinedEngines.length}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSettings={() => setCurrentTab('settings')}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAsimovModal={() => setIsAsimovModalOpen(true)}
          permissions={permissions}
          onOpenPermissions={() => setIsPermissionsModalOpen(true)}
        />

        {/* Tab-Based Views */}
        {currentTab === 'engines' && (
          <main className="flex-1 pb-24 px-3 sm:px-4">
            {/* Minimal Filter Switch */}
            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-300/60 dark:border-cyan-900/30">
                <button
                  type="button"
                  onClick={() => setFilterActiveOnly(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    !filterActiveOnly
                      ? 'bg-white dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-semibold shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  All (16)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterActiveOnly(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    filterActiveOnly
                      ? 'bg-white dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-semibold shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  Active ({onlineSafeCount})
                </button>
              </div>
            </div>

            {/* Clean Engine Cards Grid with Active Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {displayedSafeEngines.map((engine) => (
                <EngineCard
                  key={engine.id}
                  engine={engine}
                  onToggle={handleToggleEngine}
                  onCardClick={(eng) => {
                    setSelectedEngineForModal(eng);
                    setIsEngineModalOpen(true);
                  }}
                />
              ))}
            </div>
          </main>
        )}

        {currentTab === 'home' && (
          <HomeView
            onNavigateEngines={() => setCurrentTab('engines')}
            onNavigateMemory={() => setCurrentTab('memory')}
            onNavigateSettings={() => setCurrentTab('settings')}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onlineCount={onlineSafeCount}
          />
        )}

        {currentTab === 'memory' && <StorageRAGView />}

        {currentTab === 'settings' && (
          <SettingsView
            theme={theme}
            onToggleTheme={handleToggleTheme}
            permissions={permissions}
            onUpdatePermissions={refreshPermissions}
            onOpenPermissionsModal={() => setIsPermissionsModalOpen(true)}
          />
        )}
      </div>

      {/* Interactive Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
      />

      {/* Slide-Up AURA Neural Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        logs={logs}
        onClearLogs={() => setLogs([])}
        onSendCommand={handleSendCommand}
        isProcessing={isProcessing}
      />

      {/* Interactive Micro-Engine Console Modal */}
      <EngineActionModal
        engine={selectedEngineForModal}
        isOpen={isEngineModalOpen}
        onClose={() => setIsEngineModalOpen(false)}
        permissions={permissions}
        onUpdatePermissions={refreshPermissions}
        onLog={addLog}
        onTriggerCall={(contact, phone) => {
          handleSendCommand(`Call ${contact}`);
        }}
        onOpenAsimovModal={() => {
          setIsEngineModalOpen(false);
          setIsAsimovModalOpen(true);
        }}
      />

      {/* Device Permissions & Hardware Sensors Modal */}
      <DevicePermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        permissions={permissions}
        onUpdatePermissions={refreshPermissions}
        onLog={addLog}
      />

      {/* Telephony Call HUD Modal */}
      <TelephonyCallModal
        isOpen={activeCall.isOpen}
        onClose={() => setActiveCall((prev) => ({ ...prev, isOpen: false }))}
        contactName={activeCall.contactName}
        phoneNumber={activeCall.phoneNumber}
      />

      {/* Asimov Robotics Safety & Ethics Modal */}
      <AsimovSafetyModal
        isOpen={isAsimovModalOpen}
        onClose={() => setIsAsimovModalOpen(false)}
        quarantinedEngines={quarantinedEngines}
      />
    </div>
  );
}
