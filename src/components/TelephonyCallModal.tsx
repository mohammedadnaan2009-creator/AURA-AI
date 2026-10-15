import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  ShieldCheck, 
  MapPin, 
  Signal, 
  User, 
  X 
} from 'lucide-react';
import { AudioWaveform } from './AudioWaveform';

interface TelephonyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  phoneNumber: string;
}

export const TelephonyCallModal: React.FC<TelephonyCallModalProps> = ({
  isOpen,
  onClose,
  contactName,
  phoneNumber,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      setCallStatus('connecting');
      return;
    }

    const connectTimeout = setTimeout(() => {
      setCallStatus('connected');
    }, 1500);

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectTimeout);
      clearInterval(timer);
    };
  }, [isOpen]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-950/95 border border-cyan-400 dark:border-cyan-500/40 p-5 shadow-[0_0_50px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col items-center text-center transition-colors">
        {/* Laser glow accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={handleEndCall}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Tag */}
        <div className="flex items-center gap-1.5 text-xs font-mono-hud text-cyan-800 dark:text-cyan-400 mb-4 bg-cyan-100/60 dark:bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-300 dark:border-cyan-800/40">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span>07. Telephony Co-Pilot Active</span>
        </div>

        {/* Holographic Avatar Core */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-cyan-100 to-blue-200/50 dark:from-cyan-500/20 dark:to-blue-600/10 border-2 border-cyan-500/60 dark:border-cyan-400/60 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.35)]">
            <User className="w-12 h-12 text-cyan-700 dark:text-cyan-300 opacity-90" />
          </div>
          {/* Rotating Pulse Rings */}
          <div className="absolute -inset-2 rounded-full border border-dashed border-cyan-500/40 dark:border-cyan-400/40 animate-spin-slow" />
          <div className="absolute -inset-4 rounded-full border border-teal-500/20 dark:border-teal-400/20 animate-spin-reverse" />
        </div>

        {/* Contact Info */}
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mt-1 transition-colors">
          {contactName}
        </h2>
        <p className="text-cyan-700 dark:text-cyan-400 font-mono-hud text-sm mt-0.5 tracking-wider font-semibold">
          {phoneNumber}
        </p>

        {/* Network & Location Metadata Pills */}
        <div className="flex items-center gap-2 mt-3 text-[10px] font-mono-hud text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            Verified Safe
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
            <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            Direct Channel
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
            <Signal className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            Opus HD
          </span>
        </div>

        {/* Live Audio Transcript Box */}
        <div className="w-full mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-900/50 text-left transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AudioWaveform barCount={8} heightClass="h-3" color="bg-cyan-600 dark:bg-cyan-400" />
              <span className="text-[11px] font-mono-hud font-semibold text-cyan-800 dark:text-cyan-300">
                Live Voice Stream
              </span>
            </div>
            <span className="text-xs font-mono-hud text-emerald-700 dark:text-emerald-400 font-bold">
              {callStatus === 'connected' ? formatTimer(seconds) : 'Dialing...'}
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono-hud">
            {callStatus === 'connecting'
              ? `[HANDSHAKE] Routing encrypted SIP trunk to ${phoneNumber}...`
              : `"AURA OS Telephony Co-Pilot active with ${contactName}. Voice channel secured."`}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6 w-full justify-center">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full border transition-all cursor-pointer ${
              isMuted
                ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-500'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:border-cyan-400 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:border-cyan-400'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={handleEndCall}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider font-heading flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
