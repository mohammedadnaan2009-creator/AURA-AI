import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Volume2, 
  ShieldCheck, 
  HardDrive, 
  Wifi, 
  CheckCircle,
  Sparkles,
  Sliders,
  Sun,
  Moon,
  Key,
  Mic,
  Camera,
  Bell,
  Compass,
  Globe
} from 'lucide-react';
import { DevicePermissionsState } from '../types/aura';
import {
  requestMicrophone,
  requestCamera,
  requestNotifications,
  requestGeolocation,
  requestMotionSensors
} from '../utils/devicePermissions';

interface SettingsViewProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  permissions?: DevicePermissionsState;
  onUpdatePermissions?: () => void;
  onOpenPermissionsModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  theme = 'dark',
  onToggleTheme,
  permissions,
  onUpdatePermissions,
  onOpenPermissionsModal,
}) => {
  const [model, setModel] = useState('Gemini 2.5 Flash (AURA Kernel)');
  const [temperature, setTemperature] = useState(0.7);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [volume, setVolume] = useState(80);
  const [autoDial, setAutoDial] = useState(true);

  return (
    <div className="space-y-4 px-3 sm:px-4 py-2 pb-24">
      {/* Settings Header */}
      <div className="hud-glass rounded-2xl p-4 border border-cyan-500/30">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Settings</h2>
        </div>
      </div>

      {/* Appearance / Theme Settings */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Appearance & Theme</span>
          </div>
          <span className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-300 font-bold uppercase">
            {theme} Mode
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-xs font-mono-hud text-slate-800 dark:text-slate-200 font-semibold">
              Dark Mode (Pitch-Black Cyberpunk HUD)
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Toggle between deep-space neon contrast and clean high-tech light lab interface.
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className={`w-11 h-6 rounded-full border transition-colors p-0.5 cursor-pointer ${
              theme === 'dark' ? 'bg-cyan-950 border-cyan-400' : 'bg-slate-200 border-slate-400'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full transition-transform ${
                theme === 'dark' ? 'translate-x-5 bg-cyan-400 shadow-[0_0_6px_#38bdf8]' : 'translate-x-0 bg-slate-600'
              }`}
            />
          </button>
        </div>
      </div>

      {/* AI & LLM Settings */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>AI & Tool Calling Engine</span>
        </div>

        <div>
          <label className="text-xs font-mono-hud text-slate-700 dark:text-slate-300 block mb-1">Model Architecture</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono-hud text-cyan-800 dark:text-cyan-300 focus:outline-none focus:border-cyan-400"
          >
            <option>Gemini 2.5 Flash (Recommended)</option>
            <option>Gemini Flash Latest</option>
            <option>Dual-Brain Hybrid Matrix (Local + Cloud)</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono-hud text-slate-700 dark:text-slate-300 mb-1">
            <span>Reasoning Temperature</span>
            <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{temperature}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono-hud text-slate-700 dark:text-slate-300">Telephony Tool Auto-Dispatch</span>
          <button
            onClick={() => setAutoDial(!autoDial)}
            className={`w-9 h-5 rounded-full border transition-colors p-0.5 cursor-pointer ${
              autoDial ? 'bg-cyan-100 border-cyan-500 dark:bg-cyan-950 dark:border-cyan-400' : 'bg-slate-200 border-slate-400 dark:bg-slate-900 dark:border-slate-700'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full transition-transform ${
                autoDial ? 'translate-x-4 bg-cyan-500 dark:bg-cyan-400' : 'translate-x-0 bg-slate-500'
              }`}
            />
          </button>
        </div>
      </div>

      {/* English Grammar & Simple Reply Engine */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>English Grammar & Simple Responses</span>
          </div>
          <span className="text-[10px] font-mono-hud text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40 font-bold uppercase">
            Active
          </span>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-400">
          The assistant is trained to use basic English grammar and answer all questions simply without confusing jargon.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono-hud text-cyan-700 dark:text-cyan-400 font-semibold mb-0.5">
              1. Basic Grammar
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Subject + Verb + Object structure with correct capitalization and punctuation.
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono-hud text-emerald-700 dark:text-emerald-400 font-semibold mb-0.5">
              2. Simple Words
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Clear, everyday language. No confusing technical or robotic jargon.
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono-hud text-purple-700 dark:text-purple-400 font-semibold mb-0.5">
              3. Short Replies
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Concise answers limited to 1 to 3 easy sentences for immediate comprehension.
            </div>
          </div>
        </div>

        {/* Live Example Box */}
        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-mono-hud text-cyan-600 dark:text-cyan-300 font-bold mb-1">
            <span>Sample Question & Answer:</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 italic mb-1">
            User: "Why is the sky blue?"
          </p>
          <p className="text-xs text-slate-900 dark:text-white font-medium bg-white/70 dark:bg-slate-900/90 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
            "Sunlight is made of all colors. Air particles scatter blue light more than other colors because blue travels in smaller waves. This is why the sky looks blue."
          </p>
        </div>
      </div>

      {/* Multi-Source Internet Knowledge & Cross-Source Consensus Engine */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white">
            <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Multi-Source Internet Knowledge & Consensus</span>
          </div>
          <span className="text-[10px] font-mono-hud text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-400/40 font-bold uppercase">
            98% Consensus Engine
          </span>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-400">
          The assistant consults independent internet knowledge sources simultaneously. It compares definitions, extracts verified shared facts, and delivers the consensus answer agreed upon across sources.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-hud text-cyan-700 dark:text-cyan-400 font-semibold mb-0.5">
              <span>🌐 Wikipedia Graph</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Global encyclopedic knowledge graph, science, historical records, and biographies.
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-hud text-emerald-700 dark:text-emerald-400 font-semibold mb-0.5">
              <span>🦆 DuckDuckGo Knowledge</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Concise instant answer abstracts, multi-topic indexing, and verified definitions.
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-hud text-purple-700 dark:text-purple-400 font-semibold mb-0.5">
              <span>🔍 Google Grounding</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Live web indexing, real-time world events, and multi-source cross-verification.
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono-hud text-emerald-600 dark:text-emerald-300 font-bold mb-1">
            <span>Cross-Source Consensus Principle:</span>
            <span className="text-[10px] text-emerald-400">✓ Verified Factual Consensus</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
            When asked any question, the assistant verifies what independent sources report in common. If all sources agree, the identical or similar consensus fact is formulated and returned in simple, clear English.
          </p>
        </div>
      </div>

      {/* Voice & Audio Settings */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
          <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Full-Duplex Voice & Speech Synthesis</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono-hud text-slate-700 dark:text-slate-300 mb-1">
            <span>Speech Feedback Volume</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono-hud text-slate-700 dark:text-slate-300 mb-1">
            <span>Voice Speed</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{speechSpeed}x</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.5"
            step="0.05"
            value={speechSpeed}
            onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Hardware & Device Permissions */}
      <div className="hud-glass-card rounded-2xl p-4 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white">
            <Key className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Hardware Sensors & Device Permissions</span>
          </div>
          {onOpenPermissionsModal && (
            <button
              onClick={onOpenPermissionsModal}
              className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-300 font-bold hover:underline cursor-pointer"
            >
              Open Manager ➔
            </button>
          )}
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Authorize sensory inputs for Full-Duplex Voice, Vision, Notifications, and Acoustic Sensor Fusion.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-hud">
          {/* Mic */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Microphone</span>
            </div>
            <button
              onClick={async () => {
                await requestMicrophone();
                onUpdatePermissions?.();
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                permissions?.microphone === 'granted'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {permissions?.microphone === 'granted' ? '✓ Granted' : 'Authorize'}
            </button>
          </div>

          {/* Camera */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Camera Vision</span>
            </div>
            <button
              onClick={async () => {
                await requestCamera();
                onUpdatePermissions?.();
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                permissions?.camera === 'granted'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {permissions?.camera === 'granted' ? '✓ Granted' : 'Authorize'}
            </button>
          </div>

          {/* Notifications */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Notifications</span>
            </div>
            <button
              onClick={async () => {
                await requestNotifications();
                onUpdatePermissions?.();
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                permissions?.notifications === 'granted'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {permissions?.notifications === 'granted' ? '✓ Granted' : 'Authorize'}
            </button>
          </div>

          {/* Geolocation */}
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Location Context</span>
            </div>
            <button
              onClick={async () => {
                await requestGeolocation();
                onUpdatePermissions?.();
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                permissions?.geolocation === 'granted'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {permissions?.geolocation === 'granted' ? '✓ Granted' : 'Authorize'}
            </button>
          </div>
        </div>
      </div>

      {/* System Health Telemetry */}
      <div className="hud-glass rounded-2xl p-4 border border-cyan-500/30">
        <h3 className="text-xs font-mono-hud text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Hardware & Kernel Telemetry
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono-hud">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Kernel CPU</span>
            <span className="text-cyan-700 dark:text-cyan-300 font-bold">4.2%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">RAM Allocation</span>
            <span className="text-purple-700 dark:text-purple-300 font-bold">62% (4.8GB)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Storage RAG</span>
            <span className="text-amber-700 dark:text-amber-300 font-bold">68%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Swarm Mesh</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-bold">5 Nodes OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
