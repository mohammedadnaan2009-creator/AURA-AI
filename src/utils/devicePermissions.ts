import { DevicePermissionsState } from '../types/aura';

export async function checkInitialPermissions(): Promise<DevicePermissionsState> {
  const result: DevicePermissionsState = {
    microphone: 'prompt',
    notifications: 'default',
    camera: 'prompt',
    geolocation: 'prompt',
    motion: 'prompt',
  };

  // 1. Notification
  if (typeof window !== 'undefined' && 'Notification' in window) {
    result.notifications = Notification.permission;
  } else {
    result.notifications = 'unsupported';
  }

  // 2. Query permissions API if available
  if (typeof navigator !== 'undefined' && 'permissions' in navigator && navigator.permissions.query) {
    try {
      const micStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      result.microphone = micStatus.state as any;
    } catch (_) {
      // Browsers might restrict
    }

    try {
      const camStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
      result.camera = camStatus.state as any;
    } catch (_) {}

    try {
      const geoStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      result.geolocation = geoStatus.state as any;
    } catch (_) {}
  }

  return result;
}

export async function requestMicrophone(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return 'unsupported';
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return 'granted';
  } catch (err: any) {
    console.warn('Microphone permission request error:', err);
    return 'denied';
  }
}

export async function requestCamera(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return 'unsupported';
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(track => track.stop());
    return 'granted';
  } catch (err: any) {
    console.warn('Camera permission request error:', err);
    return 'denied';
  }
}

export async function requestNotifications(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        new Notification('AURA OS // Notification Sentry', {
          body: 'Hardware & system interceptor online. 0 threats detected.',
          icon: '/favicon.ico',
        });
      } catch (_) {}
    }
    return permission === 'granted' ? 'granted' : 'denied';
  } catch (err) {
    console.warn('Notification permission request error:', err);
    return 'denied';
  }
}

export async function requestGeolocation(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
    return 'unsupported';
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => resolve('granted'),
      () => resolve('denied'),
      { timeout: 8000 }
    );
  });
}

export async function requestMotionSensors(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof window === 'undefined') return 'unsupported';

  // iOS 13+ permission flow
  if (typeof (DeviceMotionEvent as any)?.requestPermission === 'function') {
    try {
      const response = await (DeviceMotionEvent as any).requestPermission();
      return response === 'granted' ? 'granted' : 'denied';
    } catch (_) {
      return 'denied';
    }
  }

  // Standard browsers with motion support
  if ('ondevicemotion' in window || 'ondeviceorientation' in window) {
    return 'granted';
  }

  return 'unsupported';
}
