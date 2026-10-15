export type EngineCategory = 
  | 'All Engines' 
  | 'Asimov Safe'
  | 'Core' 
  | 'Creative' 
  | 'System' 
  | 'Communication' 
  | 'RAG' 
  | 'Hardware'
  | 'Quarantined';

export interface TelemetryMetric {
  label: string;
  value: string;
  iconName: string;
}

export interface Engine {
  id: string; // '01', '02', etc.
  number: string;
  title: string;
  category: EngineCategory[];
  description: string;
  isOnline: boolean;
  iconName: string;
  glowColor: 'cyan' | 'purple' | 'green' | 'amber' | 'blue' | 'rose' | 'emerald';
  metrics: [TelemetryMetric, TelemetryMetric];
  customSubPills?: { label: string; status: string; icon: string }[];
  isHarmfulBlocked?: boolean;
  ethicalViolationReason?: string;
  asimovLawBroken?: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'kernel' | 'telephony' | 'creative' | 'diagnostic' | 'warning' | 'voice' | 'system' | 'internet' | 'ai';
  sender?: 'user' | 'assistant' | 'system';
  sources?: { title: string; uri: string; provider?: string }[];
  consensus?: {
    agreementRate: string;
    verifiedSourcesCount: number;
    status: string;
    sourcesList: string[];
    keyFacts?: string[];
  };
}

export interface DevicePermissionsState {
  microphone: 'granted' | 'prompt' | 'denied' | 'unsupported';
  notifications: 'granted' | 'default' | 'denied' | 'unsupported';
  camera: 'granted' | 'prompt' | 'denied' | 'unsupported';
  geolocation: 'granted' | 'prompt' | 'denied' | 'unsupported';
  motion: 'granted' | 'prompt' | 'denied' | 'unsupported';
}

export type NavTab = 'home' | 'engines' | 'memory' | 'settings';
