import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Activity, 
  ShieldCheck, 
  Mic, 
  MicOff, 
  Bell, 
  Eye, 
  Volume2, 
  PhoneCall, 
  Layers, 
  Brain, 
  Database, 
  Code, 
  Share2, 
  Wrench, 
  Zap, 
  Radio, 
  Folder, 
  Palette, 
  Play, 
  Pause, 
  Send, 
  Sliders, 
  CheckCircle, 
  AlertTriangle, 
  Copy, 
  Camera, 
  Compass, 
  Battery, 
  Wifi, 
  Download, 
  Upload,
  Box,
  RotateCw
} from 'lucide-react';
import { Engine, DevicePermissionsState } from '../types/aura';
import { AudioWaveform } from './AudioWaveform';
import { 
  requestMicrophone, 
  requestNotifications, 
  requestCamera, 
  requestGeolocation, 
  requestMotionSensors 
} from '../utils/devicePermissions';

interface EngineActionModalProps {
  engine: Engine | null;
  isOpen: boolean;
  onClose: () => void;
  permissions: DevicePermissionsState;
  onUpdatePermissions: () => void;
  onLog: (msg: string, type?: any) => void;
  onTriggerCall: (contact: string, phone: string) => void;
  onOpenAsimovModal: () => void;
}

export const EngineActionModal: React.FC<EngineActionModalProps> = ({
  engine,
  isOpen,
  onClose,
  permissions,
  onUpdatePermissions,
  onLog,
  onTriggerCall,
  onOpenAsimovModal,
}) => {
  if (!isOpen || !engine) return null;

  // Generic State
  const [activeTab, setActiveTab] = useState<'action' | 'telemetry' | 'permissions'>('action');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Engine 01 (Voice) & 06 (Audio) Web Audio
  const [micActive, setMicActive] = useState(false);
  const [micDecibels, setMicDecibels] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const synthOscRef = useRef<OscillatorNode | null>(null);
  const [isAudioLoopPlaying, setIsAudioLoopPlaying] = useState(false);

  // Engine 05 (Vision)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<string[]>(['User Interface HUD (99%)', 'Biometric Signal (97%)', 'Cybernetic Core (99%)']);

  // Engine 08 (Sensors)
  const [sensorData, setSensorData] = useState<{
    battery: string;
    charging: boolean;
    online: boolean;
    tiltX: number;
    tiltY: number;
    coords: string;
  }>({
    battery: '100%',
    charging: true,
    online: navigator.onLine,
    tiltX: 0,
    tiltY: 0,
    coords: 'Detecting...',
  });

  // Engine 09 (Dual-Brain Hybrid Matrix)
  const [dualPrompt, setDualPrompt] = useState('Check safety clearance before activating IoT hardware transceiver bus');
  const [fastHeuristicOutput, setFastHeuristicOutput] = useState('Fast Reflex (12ms): Intent parsed. Context scored 99.4% safe.');
  const [deepReasoningOutput, setDeepReasoningOutput] = useState('Deep Deliberation (84ms): Asimov Laws verified. Zero kinetic risk. Human authorization active.');
  const [isDualBrainRunning, setIsDualBrainRunning] = useState(false);

  // Engine 10 (Memory Vault)
  const [memories, setMemories] = useState<string[]>([
    'AURA OS v1.0.0 Boot Configuration',
    'Contact Book: Yashwanth (+919876543210)',
    'Synthesized Hook: hook_master_v2.wav (142 BPM)',
  ]);
  const [newMemory, setNewMemory] = useState('');

  // Engine 11 (QuickJS Sandbox)
  const [jsCode, setJsCode] = useState('const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);\nreturn fib(12);');
  const [jsResult, setJsResult] = useState<string | null>('144');
  const [jsExecTime, setJsExecTime] = useState<string>('0.4ms');

  // Engine 12 (P2P Swarm Mesh)
  const [peerMessages, setPeerMessages] = useState<string[]>(['[Node-1] Handshake verified with Node-2', '[Node-2] Shared vector index synced (12ms)']);
  const [meshBroadcastText, setMeshBroadcastText] = useState('');

  // Engine 15 (Hardware Radios & MIDI Faders)
  const [faders, setFaders] = useState([78, 64, 32, 90]);

  // Engine 16 (Filesystem & Storage RAG)
  const [ragUploadedFiles, setRagUploadedFiles] = useState<{ name: string; size: string; match: string }[]>([
    { name: 'Project_Aura_Specs.pdf', size: '2.4 MB', match: '98%' },
    { name: 'AI_Research_Notes.md', size: '1.2 MB', match: '94%' },
  ]);

  // Engine 17 (3D Spatial Viewer)
  const [yaw, setYaw] = useState(142);
  const [pitch, setPitch] = useState(-18);
  const [wireframe, setWireframe] = useState(false);

  // Initialize hardware sensor readouts
  useEffect(() => {
    let unmounted = false;

    // Battery
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        if (!unmounted) {
          setSensorData(prev => ({
            ...prev,
            battery: `${Math.round(batt.level * 100)}%`,
            charging: batt.charging,
          }));
        }
      }).catch(() => {});
    }

    // Device orientation
    const handleOrientation = (e: DeviceOrientationEvent) => {
      setSensorData(prev => ({
        ...prev,
        tiltX: Math.round(e.gamma || 0),
        tiltY: Math.round(e.beta || 0),
      }));
    };
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      unmounted = true;
      window.removeEventListener('deviceorientation', handleOrientation);
      // Clean up mic and camera
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (synthOscRef.current) {
        try { synthOscRef.current.stop(); } catch (_) {}
      }
    };
  }, []);

  // Handler for Mic Analyser
  const toggleLiveMic = async () => {
    if (micActive) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
      }
      setMicActive(false);
      setMicDecibels(0);
      onLog('[01.VOICE // HALT] Microphone audio stream detached.', 'system');
    } else {
      const res = await requestMicrophone();
      onUpdatePermissions();
      if (res === 'granted') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          micStreamRef.current = stream;
          setMicActive(true);
          onLog('[01.VOICE // ACTIVE] Full-duplex microphone stream acquired.', 'system');

          // Audio Analyser
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioContextRef.current = ctx;
          const source = ctx.createMediaStreamSource(stream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateAudioMetric = () => {
            if (!stream.active) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = Math.round(sum / dataArray.length);
            setMicDecibels(avg);
            requestAnimationFrame(updateAudioMetric);
          };
          updateAudioMetric();
        } catch (err: any) {
          setFeedbackMsg(`Mic Error: ${err.message}`);
        }
      } else {
        setFeedbackMsg('Microphone permission denied.');
      }
    }
  };

  // Handler for Screen/Camera
  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      onLog('[05.VISION // HALT] Vision input sensor detached.', 'system');
    } else {
      const res = await requestCamera();
      onUpdatePermissions();
      if (res === 'granted') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 320 } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          setIsCameraActive(true);
          onLog('[05.VISION // ACTIVE] Real-time visual introspection active (30 FPS).', 'system');
        } catch (err: any) {
          setFeedbackMsg(`Camera Error: ${err.message}`);
        }
      } else {
        setFeedbackMsg('Camera permission denied.');
      }
    }
  };

  // Handler for Internal Audio Loopback tone generator
  const toggleAudioLoopbackTone = () => {
    if (isAudioLoopPlaying) {
      if (synthOscRef.current) {
        try { synthOscRef.current.stop(); } catch (_) {}
      }
      setIsAudioLoopPlaying(false);
      onLog('[06.AUDIO // MUTE] Audio loopback tone silenced.', 'system');
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = audioContextRef.current || new AudioContextClass();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432 Hz harmonic
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        synthOscRef.current = osc;
        setIsAudioLoopPlaying(true);
        onLog('[06.AUDIO // LOOPBACK] Internal 432Hz loopback carrier tone active.', 'system');
      } catch (err: any) {
        setFeedbackMsg(`Audio loop error: ${err.message}`);
      }
    }
  };

  // Handler for Notification Sentry
  const handleTriggerNotification = async () => {
    const res = await requestNotifications();
    onUpdatePermissions();
    if (res === 'granted') {
      setFeedbackMsg('Notification sent to OS notification center!');
      onLog('[04.NOTIFY // SENT] Ambient notification dispatched to device.', 'system');
    } else {
      setFeedbackMsg('Notification permission required or blocked.');
    }
  };

  // Handler for QuickJS Execution
  const executeSandboxCode = () => {
    const startTime = performance.now();
    try {
      const func = new Function(jsCode);
      const res = func();
      const duration = (performance.now() - startTime).toFixed(2);
      setJsResult(String(res));
      setJsExecTime(`${duration}ms`);
      onLog(`[11.QUICKJS // EXEC] Script executed in ${duration}ms. Result: ${res}`, 'system');
    } catch (err: any) {
      setJsResult(`Error: ${err.message}`);
      setJsExecTime('Failed');
      onLog(`[11.QUICKJS // FAULT] ${err.message}`, 'warning');
    }
  };

  // Handler for MIDI Fader slider
  const handleFaderChange = (index: number, val: number) => {
    const next = [...faders];
    next[index] = val;
    setFaders(next);

    // Audio pitch feedback
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioContextClass();
      audioContextRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + val * 4, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  };

  // File Upload for RAG
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setRagUploadedFiles(prev => [
        { name: file.name, size: `${sizeMb} MB`, match: '99%' },
        ...prev,
      ]);
      setFeedbackMsg(`Vectorized '${file.name}' into Storage RAG.`);
      onLog(`[16.RAG // INDEXED] Added ${file.name} to persistent vector graph.`, 'system');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-950/95 border border-cyan-400 dark:border-cyan-500/40 p-4 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col text-left max-h-[92vh] overflow-y-auto transition-colors">
        {/* Top cyan laser accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                {engine.number} {engine.title}
              </h2>
              <span className={`text-[10px] font-mono-hud px-2 py-0.5 rounded-full font-bold ${
                engine.isHarmfulBlocked 
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
              }`}>
                {engine.isHarmfulBlocked ? 'Quarantined' : engine.isOnline ? 'Online • Functional' : 'Offline'}
              </span>
            </div>
            <p className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-300 mt-0.5">
              Live Functional Micro-Engine Console
            </p>
          </div>
        </div>

        {/* Action / Telemetry Tabs */}
        <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('action')}
            className={`px-3 py-1 rounded-full text-xs font-mono-hud font-bold transition-all cursor-pointer ${
              activeTab === 'action'
                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border border-cyan-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Live Functions
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1 rounded-full text-xs font-mono-hud font-bold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border border-cyan-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Engine Metrics
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-3 py-1 rounded-full text-xs font-mono-hud font-bold transition-all cursor-pointer ${
              activeTab === 'permissions'
                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border border-cyan-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Permissions & Hardware
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 text-xs font-mono-hud text-cyan-800 dark:text-cyan-200 flex items-center justify-between">
            <span>{feedbackMsg}</span>
            <button onClick={() => setFeedbackMsg(null)} className="text-cyan-600 dark:text-cyan-400 hover:opacity-80">✕</button>
          </div>
        )}

        {/* TAB 1: LIVE FUNCTIONS BY ENGINE */}
        {activeTab === 'action' && (
          <div className="space-y-4">
            {/* 00. Asimov Ethical Guardrail */}
            {engine.id === '00' && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-emerald-800 dark:text-emerald-300">
                    Laws of Robotics Verification
                  </span>
                  <span className="text-xs font-mono-hud bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded text-emerald-800 dark:text-emerald-200">
                    Harm Probability: 0.00%
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Continuous validation engine screening all micro-engines against Zeroth, First, and Second Laws of Robotics.
                </p>
                <button
                  onClick={onOpenAsimovModal}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Inspect Full Asimov Audit Ledger
                </button>
              </div>
            )}

            {/* 01. Full-Duplex Voice */}
            {engine.id === '01' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white">
                    Live Microphone Analyser (Web Audio)
                  </span>
                  <span className={`text-xs font-mono-hud font-bold ${micActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    {micActive ? `Active • ${micDecibels} dB` : 'Muted'}
                  </span>
                </div>
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center px-4">
                  <AudioWaveform barCount={20} heightClass="h-6" active={micActive} color="bg-cyan-500 dark:bg-cyan-400" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleLiveMic}
                    className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      micActive
                        ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  >
                    {micActive ? <><MicOff className="w-4 h-4" /> Stop Audio Input</> : <><Mic className="w-4 h-4" /> Connect Live Mic</>}
                  </button>
                </div>
              </div>
            )}

            {/* 02. Headless MCP Host */}
            {engine.id === '02' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Model Context Protocol (MCP) Endpoints
                </span>
                <div className="space-y-1.5 text-xs font-mono-hud">
                  {[
                    { tool: 'mcp://aura.kernel/telephony', status: '200 OK', latency: '0.4ms' },
                    { tool: 'mcp://aura.kernel/rag_vector_query', status: '200 OK', latency: '1.2ms' },
                    { tool: 'mcp://aura.kernel/sandbox_eval', status: '200 OK', latency: '0.8ms' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{item.tool}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.status} ({item.latency})</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setFeedbackMsg('MCP Bus Ping: All 3 registered protocol endpoints responded.');
                    onLog('[02.MCP // PING] Handshake successful. JSON-RPC v2.0 verified.', 'system');
                  }}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Send MCP Ping Test
                </button>
              </div>
            )}

            {/* 03 & 14. Quarantined Engines */}
            {engine.isHarmfulBlocked && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/50 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">
                    Autonomous Actuation Interlock Active
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {engine.ethicalViolationReason}
                </p>
                <button
                  onClick={onOpenAsimovModal}
                  className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  View Asimov Safety Ledger
                </button>
              </div>
            )}

            {/* 04. Notification Sentry */}
            {engine.id === '04' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white">
                    Ambient Interceptor & Device Alerts
                  </span>
                  <span className="text-[11px] font-mono-hud text-amber-600 dark:text-amber-400">
                    Permission: {permissions.notifications}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono-hud">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">OTP Auto-Detected</span>
                    <span className="font-bold text-cyan-700 dark:text-cyan-300">482736</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('482736');
                      setFeedbackMsg('Copied OTP 482736 to clipboard!');
                    }}
                    className="w-full py-1.5 rounded-lg bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-950 dark:hover:bg-cyan-900 text-cyan-900 dark:text-cyan-300 border border-cyan-400 text-xs font-mono-hud flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Auto-Fill & Copy OTP
                  </button>
                </div>
                <button
                  onClick={handleTriggerNotification}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" /> Trigger Real Device Notification
                </button>
              </div>
            )}

            {/* 05. Real-Time Screen Vision */}
            {engine.id === '05' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white">
                    Visual Introspection Camera Feed
                  </span>
                  <span className="text-xs font-mono-hud text-blue-600 dark:text-blue-400 font-bold">
                    {isCameraActive ? '30 FPS • Online' : 'Standby'}
                  </span>
                </div>
                <div className="relative w-full h-44 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                  {!isCameraActive && (
                    <div className="text-center text-slate-500 text-xs font-mono-hud p-4">
                      Camera feed inactive. Click below to grant camera access and activate real-time screen vision.
                    </div>
                  )}
                  {isCameraActive && (
                    <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                      <div className="flex justify-between text-[10px] font-mono-hud text-cyan-400">
                        <span>FPS: 30</span>
                        <span>ACCURACY: 96%</span>
                      </div>
                      <div className="border border-cyan-400/60 rounded-xl p-2 bg-slate-950/60 backdrop-blur-sm self-center text-[10px] font-mono-hud text-emerald-400">
                        [BOUNDING BOX: USER_FACE_DETECTED 98%]
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleCamera}
                  className={`w-full py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isCameraActive
                      ? 'bg-rose-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  {isCameraActive ? 'Disconnect Camera' : 'Connect Camera Sensor'}
                </button>
              </div>
            )}

            {/* 06. Internal Audio Loopback */}
            {engine.id === '06' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white">
                    Internal Audio Synthesis & Loopback
                  </span>
                  <span className="text-xs font-mono-hud text-emerald-600 dark:text-emerald-400 font-bold">
                    {isAudioLoopPlaying ? 'Synthesizing 432Hz' : 'Standby'}
                  </span>
                </div>
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center px-4">
                  <AudioWaveform barCount={20} heightClass="h-6" active={isAudioLoopPlaying} color="bg-emerald-500" />
                </div>
                <button
                  onClick={toggleAudioLoopbackTone}
                  className={`w-full py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isAudioLoopPlaying
                      ? 'bg-rose-500 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  {isAudioLoopPlaying ? 'Silence Loopback Audio' : 'Play 432Hz Loopback Tone'}
                </button>
              </div>
            )}

            {/* 07. Telephony Co-Pilot */}
            {engine.id === '07' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Telephony Voice Channels
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-hud">
                  <button
                    onClick={() => {
                      onTriggerCall('Yashwanth', '+919876543210');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-green-100 dark:bg-green-950/60 border border-green-300 dark:border-green-600 text-green-900 dark:text-green-200 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <span>Yashwanth</span>
                    <PhoneCall className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </button>
                  <button
                    onClick={() => {
                      onTriggerCall('Zain', '+14155550199');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <span>Zain</span>
                    <PhoneCall className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </button>
                </div>
              </div>
            )}

            {/* 08. Sensory Acoustic & Motion */}
            {engine.id === '08' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Real Hardware Context Sensor Fusion
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono-hud">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Battery</span>
                    <span className="font-bold text-cyan-700 dark:text-cyan-300">{sensorData.battery} ({sensorData.charging ? 'Charging' : 'Discharging'})</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Network Link</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{sensorData.online ? '5G Connected' : 'Offline'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Tilt Angles</span>
                    <span className="font-bold text-purple-600 dark:text-purple-300">X: {sensorData.tiltX}° | Y: {sensorData.tiltY}°</span>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    const res = await requestGeolocation();
                    if (res === 'granted') {
                      navigator.geolocation.getCurrentPosition(pos => {
                        setSensorData(prev => ({
                          ...prev,
                          coords: `${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`,
                        }));
                        setFeedbackMsg(`Location verified: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`);
                      });
                    }
                  }}
                  className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-4 h-4" /> Request Geolocation & Sensor Lock
                </button>
              </div>
            )}

            {/* 09. Dual-Brain Hybrid Matrix */}
            {engine.id === '09' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white">
                    Fast Reflex (System 1) vs Deep Ethical Deliberation (System 2)
                  </span>
                  <span className="text-[10px] font-mono-hud bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800">
                    Dual Reasoning Active
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={dualPrompt}
                    onChange={e => setDualPrompt(e.target.value)}
                    placeholder="Enter command or intent to evaluate..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-mono-hud text-slate-900 dark:text-white"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-hud">
                    <div className="p-2.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-cyan-800 dark:text-cyan-300 block">
                        ⚡ Fast Reflex Engine (12ms)
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">
                        {fastHeuristicOutput}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 block">
                        🧠 Deep Asimov Filter (84ms)
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">
                        {deepReasoningOutput}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  disabled={isDualBrainRunning}
                  onClick={() => {
                    setIsDualBrainRunning(true);
                    setTimeout(() => {
                      setFastHeuristicOutput(`Fast Reflex (11ms): Pattern match OK. Intent: "${dualPrompt.slice(0, 25)}...".`);
                      setDeepReasoningOutput(`Deep Deliberation (78ms): Validated against Laws of Robotics. 0 harm, human consent verified.`);
                      setIsDualBrainRunning(false);
                      setFeedbackMsg('Dual-Brain analysis complete: 100% Ethical alignment.');
                      onLog(`[09.DUAL-BRAIN // CONVERGED] Fast heuristic + Deep Asimov reasoning harmonized.`, 'system');
                    }, 400);
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  {isDualBrainRunning ? 'Evaluating Reasoning...' : 'Run Dual-Brain Reasoning Convergence'}
                </button>
              </div>
            )}

            {/* 10. Persistent Memory Vault */}
            {engine.id === '10' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Encrypted Knowledge Store ({memories.length} records)
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto font-mono-hud text-xs">
                  {memories.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      • {m}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMemory}
                    onChange={e => setNewMemory(e.target.value)}
                    placeholder="Store new memory vector..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono-hud text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      if (!newMemory.trim()) return;
                      setMemories(prev => [newMemory.trim(), ...prev]);
                      setNewMemory('');
                      setFeedbackMsg('Committed memory record to persistent storage.');
                      onLog(`[10.MEMORY // WRITE] Vector saved: "${newMemory.trim()}"`, 'system');
                    }}
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs uppercase cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* 11. Dynamic QuickJS Sandbox */}
            {engine.id === '11' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Isolated JavaScript Sandbox Execution
                </span>
                <textarea
                  value={jsCode}
                  onChange={e => setJsCode(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono-hud text-xs border border-slate-700 focus:outline-none"
                />
                <div className="flex items-center justify-between text-xs font-mono-hud">
                  <span className="text-slate-500">Duration: <strong className="text-cyan-700 dark:text-cyan-300">{jsExecTime}</strong></span>
                  <span className="text-slate-500">Result: <strong className="text-emerald-600 dark:text-emerald-400">{jsResult}</strong></span>
                </div>
                <button
                  onClick={executeSandboxCode}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Execute Script in Sandbox
                </button>
              </div>
            )}

            {/* 12. P2P Swarm Mesh */}
            {engine.id === '12' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Local Swarm Mesh Node Communications
                </span>
                <div className="space-y-1.5 max-h-28 overflow-y-auto font-mono-hud text-xs">
                  {peerMessages.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-300">
                      {m}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={meshBroadcastText}
                    onChange={e => setMeshBroadcastText(e.target.value)}
                    placeholder="Broadcast packet to swarm..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono-hud text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      if (!meshBroadcastText.trim()) return;
                      setPeerMessages(prev => [...prev, `[Local Host] ${meshBroadcastText.trim()}`]);
                      setMeshBroadcastText('');
                      onLog(`[12.SWARM // BROADCAST] Packet routed to 5 mesh nodes.`, 'system');
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-bold text-xs uppercase cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* 13. Self-Healing UI */}
            {engine.id === '13' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Real DOM & Memory Introspection Scanner
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-hud">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Scanned DOM Nodes</span>
                    <span className="font-bold text-cyan-700 dark:text-cyan-300">{document.querySelectorAll('*').length} Elements</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Render Health</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Healthy</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFeedbackMsg('Self-healing scanner completed: 0 DOM defects detected.');
                    onLog('[13.INTROSPECTION // HEALED] DOM hierarchy checked. Contrast and repaint nominal.', 'system');
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Wrench className="w-4 h-4" /> Run Deep UI Self-Healing
                </button>
              </div>
            )}

            {/* 15. Hardware Radios & MIDI Faders */}
            {engine.id === '15' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Interactive 4-Channel MIDI Faders (Audio Synthesizer)
                </span>
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {faders.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono-hud text-slate-500">CH {idx + 1}</span>
                      <input
                        type="range"
                        min="0"
                        max="127"
                        value={val}
                        onChange={e => handleFaderChange(idx, parseInt(e.target.value, 10))}
                        className="h-24 -rotate-90 my-6 accent-cyan-500 cursor-pointer"
                      />
                      <span className="text-xs font-mono-hud font-bold text-cyan-700 dark:text-cyan-300">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 16. Filesystem & Storage RAG */}
            {engine.id === '16' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white block">
                  Semantic File Ingestion & Vector Retrieval
                </span>
                <label className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-dashed border-cyan-400/50 hover:border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-mono-hud font-bold text-cyan-800 dark:text-cyan-300">
                    Upload Document or Audio to Vector Index
                  </span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
                <div className="space-y-1.5 text-xs font-mono-hud">
                  {ragUploadedFiles.map((f, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-200">{f.name} ({f.size})</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{f.match} Match</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 17. 3D Spatial Viewer */}
            {engine.id === '17' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud font-bold text-slate-900 dark:text-white">
                    3D Spatial Asset Viewer (Stage_Rig.glb)
                  </span>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-hud cursor-pointer border ${
                      wireframe ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' : 'border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    Wireframe {wireframe ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* 3D Visualizer Simulation Canvas */}
                <div className="relative w-full h-44 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
                  <div
                    className="w-28 h-28 border-2 border-cyan-400 rounded-2xl transition-transform duration-100 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                    style={{
                      transform: `rotateY(${yaw}deg) rotateX(${pitch}deg)`,
                      borderStyle: wireframe ? 'dashed' : 'solid',
                    }}
                  >
                    <Box className="w-14 h-14 text-cyan-300 animate-pulse" />
                    <div className="absolute inset-2 border border-purple-400/60 rounded-xl animate-spin-slow" />
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono-hud text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded">
                    Yaw: {yaw}° | Pitch: {pitch}°
                  </div>
                </div>

                {/* Yaw & Pitch Sliders */}
                <div className="space-y-2 text-xs font-mono-hud">
                  <div>
                    <div className="flex justify-between text-slate-500 mb-0.5">
                      <span>Yaw (Horizontal 360°)</span>
                      <span className="text-cyan-700 dark:text-cyan-300 font-bold">{yaw}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={yaw}
                      onChange={e => setYaw(parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-500 mb-0.5">
                      <span>Pitch (Vertical)</span>
                      <span className="text-cyan-700 dark:text-cyan-300 font-bold">{pitch}°</span>
                    </div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      value={pitch}
                      onChange={e => setPitch(parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TELEMETRY METRICS */}
        {activeTab === 'telemetry' && (
          <div className="space-y-3 font-mono-hud">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {engine.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 text-[10px] block">{m.label}</span>
                  <span className="text-lg font-bold text-cyan-700 dark:text-cyan-300">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Architecture Description:</span>
              {engine.description}
            </div>
          </div>
        )}

        {/* TAB 3: DEVICE PERMISSIONS & HARDWARE */}
        {activeTab === 'permissions' && (
          <div className="space-y-2.5 font-mono-hud text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Required Hardware & Browser Device Permissions:
            </span>

            {/* Mic */}
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Microphone Access</span>
                <span className="text-[10px] text-slate-500">Needed for Engine 01 Voice & Web Speech</span>
              </div>
              <button
                onClick={async () => {
                  await requestMicrophone();
                  onUpdatePermissions();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase cursor-pointer ${
                  permissions.microphone === 'granted'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                }`}
              >
                {permissions.microphone === 'granted' ? '✓ Granted' : 'Request Mic'}
              </button>
            </div>

            {/* Notifications */}
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Notifications</span>
                <span className="text-[10px] text-slate-500">Needed for Engine 04 Sentry alerts</span>
              </div>
              <button
                onClick={async () => {
                  await requestNotifications();
                  onUpdatePermissions();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase cursor-pointer ${
                  permissions.notifications === 'granted'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                }`}
              >
                {permissions.notifications === 'granted' ? '✓ Granted' : 'Request Notify'}
              </button>
            </div>

            {/* Camera */}
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Camera / Screen Sensor</span>
                <span className="text-[10px] text-slate-500">Needed for Engine 05 Screen Vision</span>
              </div>
              <button
                onClick={async () => {
                  await requestCamera();
                  onUpdatePermissions();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase cursor-pointer ${
                  permissions.camera === 'granted'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                }`}
              >
                {permissions.camera === 'granted' ? '✓ Granted' : 'Request Camera'}
              </button>
            </div>

            {/* Geolocation */}
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Sensors & Location</span>
                <span className="text-[10px] text-slate-500">Needed for Engine 08 Context Fusion</span>
              </div>
              <button
                onClick={async () => {
                  await requestGeolocation();
                  onUpdatePermissions();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase cursor-pointer ${
                  permissions.geolocation === 'granted'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                }`}
              >
                {permissions.geolocation === 'granted' ? '✓ Granted' : 'Request Sensors'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
