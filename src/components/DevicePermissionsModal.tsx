import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mic, 
  Camera, 
  Bell, 
  Compass, 
  Activity, 
  BatteryCharging, 
  Wifi, 
  CheckCircle, 
  AlertTriangle,
  RotateCw,
  Copy,
  ExternalLink
} from 'lucide-react';
import { DevicePermissionsState } from '../types/aura';
import { 
  requestMicrophone, 
  requestNotifications, 
  requestCamera, 
  requestGeolocation, 
  requestMotionSensors 
} from '../utils/devicePermissions';

interface DevicePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  permissions: DevicePermissionsState;
  onUpdatePermissions: () => void;
  onLog: (msg: string, type?: any) => void;
}

export const DevicePermissionsModal: React.FC<DevicePermissionsModalProps> = ({
  isOpen,
  onClose,
  permissions,
  onUpdatePermissions,
  onLog,
}) => {
  if (!isOpen) return null;

  const [activeTestMessage, setActiveTestMessage] = useState<string | null>(null);
  const [deviceStats, setDeviceStats] = useState({
    battery: '100%',
    charging: true,
    online: navigator.onLine,
    coords: 'Pending permission',
  });

  useEffect(() => {
    // Battery check
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        setDeviceStats(prev => ({
          ...prev,
          battery: `${Math.round(b.level * 100)}%`,
          charging: b.charging,
        }));
      }).catch(() => {});
    }
  }, []);

  const handleRequestMic = async () => {
    const res = await requestMicrophone();
    onUpdatePermissions();
    if (res === 'granted') {
      setActiveTestMessage('Microphone access granted. Full-Duplex Voice (Eng 01) & Web Speech are operational.');
      onLog('[PERMISSION // GRANTED] Audio microphone stream verified.', 'system');
    } else {
      setActiveTestMessage('Microphone access denied or blocked in browser settings.');
    }
  };

  const handleRequestCamera = async () => {
    const res = await requestCamera();
    onUpdatePermissions();
    if (res === 'granted') {
      setActiveTestMessage('Camera access granted. Real-Time Screen Vision (Eng 05) sensor activated.');
      onLog('[PERMISSION // GRANTED] Video optical sensor verified.', 'system');
    } else {
      setActiveTestMessage('Camera access denied or blocked in browser settings.');
    }
  };

  const handleRequestNotifications = async () => {
    const res = await requestNotifications();
    onUpdatePermissions();
    if (res === 'granted') {
      setActiveTestMessage('Notifications active. Notification Sentry (Eng 04) can now send ambient security alerts.');
      onLog('[PERMISSION // GRANTED] System notification dispatcher verified.', 'system');
    } else {
      setActiveTestMessage('Notifications denied or blocked.');
    }
  };

  const handleRequestGeo = async () => {
    const res = await requestGeolocation();
    onUpdatePermissions();
    if (res === 'granted') {
      navigator.geolocation.getCurrentPosition(pos => {
        const coordStr = `${pos.coords.latitude.toFixed(3)}°N, ${pos.coords.longitude.toFixed(3)}°E`;
        setDeviceStats(prev => ({ ...prev, coords: coordStr }));
        setActiveTestMessage(`Geolocation acquired: ${coordStr}. Sensory Fusion (Eng 08) locked.`);
        onLog(`[PERMISSION // GRANTED] Geolocation context lock: ${coordStr}`, 'system');
      });
    } else {
      setActiveTestMessage('Geolocation access denied.');
    }
  };

  const handleRequestMotion = async () => {
    const res = await requestMotionSensors();
    onUpdatePermissions();
    if (res === 'granted') {
      setActiveTestMessage('Inertial measurement unit (gyro/accel) active.');
      onLog('[PERMISSION // GRANTED] Inertial motion sensors active.', 'system');
    } else {
      setActiveTestMessage('Motion sensors not supported or denied.');
    }
  };

  const items = [
    {
      name: 'Microphone & Web Audio',
      desc: 'Required by Engine 01 (Full-Duplex Voice) and AURA Terminal voice commands.',
      status: permissions.microphone,
      onRequest: handleRequestMic,
      icon: Mic,
      engine: 'Eng 01 & 06',
    },
    {
      name: 'Camera & Optical Sensor',
      desc: 'Required by Engine 05 (Real-Time Screen Vision) for on-device visual introspection.',
      status: permissions.camera,
      onRequest: handleRequestCamera,
      icon: Camera,
      engine: 'Eng 05',
    },
    {
      name: 'System Notifications',
      desc: 'Required by Engine 04 (Notification Sentry) to push alerts and OTP detections.',
      status: permissions.notifications,
      onRequest: handleRequestNotifications,
      icon: Bell,
      engine: 'Eng 04',
    },
    {
      name: 'Sensors & Geolocation',
      desc: 'Required by Engine 08 (Sensory Acoustic & Motion) for context & ergonomic fusion.',
      status: permissions.geolocation,
      onRequest: handleRequestGeo,
      icon: Compass,
      engine: 'Eng 08',
    },
    {
      name: 'Inertial Motion & Orientation',
      desc: 'Device tilt, orientation & gesture recognition.',
      status: permissions.motion,
      onRequest: handleRequestMotion,
      icon: Activity,
      engine: 'Eng 08',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-950/95 border border-cyan-400 dark:border-cyan-500/40 p-5 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col text-left max-h-[90vh] overflow-y-auto transition-colors">
        {/* Top cyan gradient line */}
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
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
              Device Permissions & Hardware
            </h2>
            <p className="text-xs font-mono-hud text-cyan-700 dark:text-cyan-300 mt-0.5">
              AURA OS Hardware Integration Center
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-sans">
          To enable full functionality for all 17 micro-engines, grant browser permissions below. Every requested sensor strictly follows Asimov Ethical Guardrails (zero exfiltration, zero background hijacking).
        </p>

        {/* Alert message if any */}
        {activeTestMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 text-xs font-mono-hud text-cyan-800 dark:text-cyan-200 flex items-center justify-between">
            <span>{activeTestMessage}</span>
            <button onClick={() => setActiveTestMessage(null)} className="text-cyan-600 dark:text-cyan-400 font-bold ml-2">✕</button>
          </div>
        )}

        {/* Permissions List */}
        <div className="space-y-2.5 mb-5 font-mono-hud">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isGranted = item.status === 'granted';
            return (
              <div 
                key={idx} 
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isGranted ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-200 dark:border-cyan-900">
                        {item.engine}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={item.onRequest}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase cursor-pointer whitespace-nowrap flex-shrink-0 transition-all ${
                    isGranted
                      ? 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-400/80'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm'
                  }`}
                >
                  {isGranted ? '✓ Active' : 'Authorize ➔'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Hardware Telemetry Bar */}
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 font-mono-hud text-xs">
          <span className="font-bold text-[11px] text-slate-700 dark:text-slate-300 block">
            Real Hardware Sensor Readouts:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 block text-[9px]">Battery</span>
              <span className="font-bold text-cyan-700 dark:text-cyan-300">{deviceStats.battery} ({deviceStats.charging ? 'Plugged In' : 'Discharging'})</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 block text-[9px]">Network Connection</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{deviceStats.online ? 'Online (5G / WiFi)' : 'Offline'}</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-500 block text-[9px]">Coordinates</span>
              <span className="font-bold text-purple-600 dark:text-purple-300 truncate block">{deviceStats.coords}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-heading font-bold text-xs uppercase cursor-pointer"
          >
            Close Center
          </button>
        </div>
      </div>
    </div>
  );
};
