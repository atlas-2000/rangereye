import { useEffect, useRef, useState } from 'react';

export type SoundEvent = 
  | 'mission_start'
  | 'drone_takeoff'
  | 'drone_landing'
  | 'fire_detected'
  | 'alert_critical'
  | 'alert_warning'
  | 'navigation_beep'
  | 'system_startup'
  | 'radar_sweep'
  | 'thermal_scan'
  | 'communication_established'
  | 'battery_low'
  | 'weather_warning'
  | 'mission_complete'
  | 'emergency_override'
  | 'ground_station_connect'
  | 'data_sync'
  | 'waypoint_reached'
  | 'perimeter_sweep'
  | 'fire_suppression_mode'
  | 'evacuation_alert'
  | 'weather_storm_warning'
  | 'search_and_rescue'
  | 'autonomous_patrol'
  | 'hotspot_confirmation'
  | 'signal_lost'
  | 'signal_restored'
  | 'charging_complete'
  | 'maintenance_required';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: 'sine' | 'square' | 'sawtooth' | 'triangle';
  volume: number;
  fadeIn?: number;
  fadeOut?: number;
  modulation?: {
    frequency: number;
    depth: number;
  };
}

const SOUND_LIBRARY: Record<SoundEvent, SoundConfig[]> = {
  mission_start: [
    { frequency: 440, duration: 300, type: 'sine', volume: 0.3 },
    { frequency: 554.37, duration: 300, type: 'sine', volume: 0.25 },
    { frequency: 659.25, duration: 500, type: 'sine', volume: 0.2 }
  ],
  drone_takeoff: [
    { 
      frequency: 80, 
      duration: 2000, 
      type: 'sawtooth', 
      volume: 0.15,
      modulation: { frequency: 0.5, depth: 0.1 }
    }
  ],
  perimeter_sweep: [
    { frequency: 200, duration: 150, type: 'sine', volume: 0.2 },
    { frequency: 250, duration: 150, type: 'sine', volume: 0.15 },
    { frequency: 200, duration: 150, type: 'sine', volume: 0.1 }
  ],
  fire_suppression_mode: [
    { frequency: 1000, duration: 200, type: 'square', volume: 0.4 },
    { frequency: 800, duration: 200, type: 'square', volume: 0.35 },
    { frequency: 1200, duration: 400, type: 'sine', volume: 0.3 }
  ],
  evacuation_alert: [
    { frequency: 880, duration: 500, type: 'square', volume: 0.5 },
    { frequency: 440, duration: 500, type: 'square', volume: 0.5 },
    { frequency: 880, duration: 500, type: 'square', volume: 0.5 }
  ],
  weather_storm_warning: [
    { 
      frequency: 150, 
      duration: 1000, 
      type: 'triangle', 
      volume: 0.25,
      modulation: { frequency: 2, depth: 0.3 }
    }
  ],
  search_and_rescue: [
    { frequency: 523.25, duration: 400, type: 'sine', volume: 0.3 },
    { frequency: 659.25, duration: 400, type: 'sine', volume: 0.25 },
    { frequency: 783.99, duration: 600, type: 'sine', volume: 0.2 }
  ],
  autonomous_patrol: [
    { frequency: 300, duration: 100, type: 'sine', volume: 0.15 },
    { frequency: 350, duration: 100, type: 'sine', volume: 0.1 }
  ],
  hotspot_confirmation: [
    { frequency: 1500, duration: 100, type: 'sine', volume: 0.4 },
    { frequency: 1200, duration: 100, type: 'sine', volume: 0.3 },
    { frequency: 1500, duration: 200, type: 'sine', volume: 0.35 }
  ],
  signal_lost: [
    { 
      frequency: 400, 
      duration: 800, 
      type: 'sine', 
      volume: 0.3,
      fadeOut: 400
    }
  ],
  signal_restored: [
    { frequency: 400, duration: 200, type: 'sine', volume: 0.25 },
    { frequency: 600, duration: 300, type: 'sine', volume: 0.3 }
  ],
  charging_complete: [
    { frequency: 523.25, duration: 200, type: 'sine', volume: 0.2 },
    { frequency: 659.25, duration: 200, type: 'sine', volume: 0.25 },
    { frequency: 783.99, duration: 400, type: 'sine', volume: 0.3 }
  ],
  maintenance_required: [
    { frequency: 220, duration: 300, type: 'triangle', volume: 0.25 },
    { frequency: 200, duration: 300, type: 'triangle', volume: 0.2 }
  ],
  drone_landing: [
    { 
      frequency: 120, 
      duration: 1500, 
      type: 'sawtooth', 
      volume: 0.12,
      fadeOut: 1000
    }
  ],
  fire_detected: [
    { frequency: 800, duration: 150, type: 'square', volume: 0.4 },
    { frequency: 1000, duration: 150, type: 'square', volume: 0.4 },
    { frequency: 800, duration: 150, type: 'square', volume: 0.4 }
  ],
  alert_critical: [
    { frequency: 1200, duration: 200, type: 'square', volume: 0.5 },
    { frequency: 900, duration: 200, type: 'square', volume: 0.5 },
    { frequency: 1200, duration: 200, type: 'square', volume: 0.5 },
    { frequency: 900, duration: 200, type: 'square', volume: 0.5 }
  ],
  alert_warning: [
    { frequency: 600, duration: 300, type: 'triangle', volume: 0.3 },
    { frequency: 800, duration: 300, type: 'triangle', volume: 0.3 }
  ],
  navigation_beep: [
    { frequency: 1000, duration: 50, type: 'sine', volume: 0.2 }
  ],
  system_startup: [
    { frequency: 200, duration: 100, type: 'sine', volume: 0.2 },
    { frequency: 300, duration: 100, type: 'sine', volume: 0.2 },
    { frequency: 400, duration: 100, type: 'sine', volume: 0.2 },
    { frequency: 500, duration: 200, type: 'sine', volume: 0.25 }
  ],
  radar_sweep: [
    { 
      frequency: 150, 
      duration: 1000, 
      type: 'sine', 
      volume: 0.1,
      modulation: { frequency: 2, depth: 0.3 }
    }
  ],
  thermal_scan: [
    { 
      frequency: 300, 
      duration: 800, 
      type: 'triangle', 
      volume: 0.15,
      modulation: { frequency: 1.5, depth: 0.2 }
    }
  ],
  communication_established: [
    { frequency: 523.25, duration: 200, type: 'sine', volume: 0.2 },
    { frequency: 659.25, duration: 200, type: 'sine', volume: 0.2 },
    { frequency: 783.99, duration: 300, type: 'sine', volume: 0.25 }
  ],
  battery_low: [
    { frequency: 400, duration: 200, type: 'triangle', volume: 0.3 },
    { frequency: 350, duration: 200, type: 'triangle', volume: 0.3 },
    { frequency: 300, duration: 300, type: 'triangle', volume: 0.3 }
  ],
  weather_warning: [
    { 
      frequency: 250, 
      duration: 1000, 
      type: 'sawtooth', 
      volume: 0.2,
      modulation: { frequency: 0.8, depth: 0.4 }
    }
  ],
  mission_complete: [
    { frequency: 523.25, duration: 300, type: 'sine', volume: 0.3 },
    { frequency: 659.25, duration: 300, type: 'sine', volume: 0.25 },
    { frequency: 783.99, duration: 300, type: 'sine', volume: 0.2 },
    { frequency: 1046.5, duration: 500, type: 'sine', volume: 0.15 }
  ],
  emergency_override: [
    { frequency: 1500, duration: 100, type: 'square', volume: 0.6 },
    { frequency: 1200, duration: 100, type: 'square', volume: 0.6 },
    { frequency: 1500, duration: 100, type: 'square', volume: 0.6 },
    { frequency: 1200, duration: 100, type: 'square', volume: 0.6 },
    { frequency: 1500, duration: 200, type: 'square', volume: 0.6 }
  ],
  ground_station_connect: [
    { frequency: 880, duration: 150, type: 'sine', volume: 0.25 },
    { frequency: 1108.73, duration: 150, type: 'sine', volume: 0.2 }
  ],
  data_sync: [
    { frequency: 2000, duration: 50, type: 'sine', volume: 0.15 },
    { frequency: 2500, duration: 50, type: 'sine', volume: 0.15 },
    { frequency: 3000, duration: 50, type: 'sine', volume: 0.15 }
  ],
  waypoint_reached: [
    { frequency: 1760, duration: 100, type: 'sine', volume: 0.2 }
  ]
};

export function useSoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    // Initialize AudioContext on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        setIsEnabled(true);
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playSound = async (event: SoundEvent, delay: number = 0) => {
    if (!audioContextRef.current || !isEnabled) return;

    const sounds = SOUND_LIBRARY[event];
    if (!sounds) return;

    const audioContext = audioContextRef.current;
    let currentTime = audioContext.currentTime + delay;

    for (const sound of sounds) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const masterGain = audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      masterGain.connect(audioContext.destination);

      // Configure oscillator
      oscillator.type = sound.type;
      oscillator.frequency.setValueAtTime(sound.frequency, currentTime);

      // Apply modulation if specified
      if (sound.modulation) {
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        
        lfo.frequency.setValueAtTime(sound.modulation.frequency, currentTime);
        lfoGain.gain.setValueAtTime(sound.modulation.depth * sound.frequency, currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        
        lfo.start(currentTime);
        lfo.stop(currentTime + sound.duration / 1000);
      }

      // Configure volume
      const finalVolume = sound.volume * volume;
      masterGain.gain.setValueAtTime(finalVolume, currentTime);

      // Apply fade in/out
      if (sound.fadeIn) {
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(1, currentTime + sound.fadeIn / 1000);
      } else {
        gainNode.gain.setValueAtTime(1, currentTime);
      }

      if (sound.fadeOut) {
        const fadeStartTime = currentTime + (sound.duration - sound.fadeOut) / 1000;
        gainNode.gain.setValueAtTime(1, fadeStartTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + sound.duration / 1000);
      }

      // Start and stop oscillator
      oscillator.start(currentTime);
      oscillator.stop(currentTime + sound.duration / 1000);

      currentTime += sound.duration / 1000 + 0.05; // Small gap between sounds
    }
  };

  const playSoundSequence = async (events: { event: SoundEvent; delay: number }[]) => {
    for (const { event, delay } of events) {
      await new Promise(resolve => setTimeout(resolve, delay));
      playSound(event);
    }
  };

  const toggleSound = () => {
    setIsEnabled(prev => !prev);
  };

  const setMasterVolume = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  return {
    playSound,
    playSoundSequence,
    isEnabled,
    toggleSound,
    volume,
    setMasterVolume
  };
}