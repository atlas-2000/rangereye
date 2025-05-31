import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSoundEffects, type SoundEvent } from '@/hooks/useSoundEffects';
import { Volume2, VolumeX, Play, RotateCw } from 'lucide-react';

interface SoundControllerProps {
  className?: string;
}

export default function SoundController({ className = "" }: SoundControllerProps) {
  const { playSound, isEnabled, toggleSound, volume, setMasterVolume } = useSoundEffects();
  const [isPlaying, setIsPlaying] = useState(false);

  const missionScenarios = [
    { 
      name: "Mission Start", 
      event: "mission_start" as SoundEvent,
      description: "System initialization and preflight checks"
    },
    { 
      name: "Drone Takeoff", 
      event: "drone_takeoff" as SoundEvent,
      description: "Autonomous takeoff sequence"
    },
    { 
      name: "Fire Detected", 
      event: "fire_detected" as SoundEvent,
      description: "Thermal anomaly alert"
    },
    { 
      name: "Critical Alert", 
      event: "alert_critical" as SoundEvent,
      description: "Emergency situation detected"
    },
    { 
      name: "Radar Sweep", 
      event: "radar_sweep" as SoundEvent,
      description: "Active terrain scanning"
    },
    { 
      name: "Ground Station Connect", 
      event: "ground_station_connect" as SoundEvent,
      description: "Communication link established"
    },
    { 
      name: "Waypoint Reached", 
      event: "waypoint_reached" as SoundEvent,
      description: "Navigation milestone"
    },
    { 
      name: "Mission Complete", 
      event: "mission_complete" as SoundEvent,
      description: "Successful mission completion"
    }
  ];

  const playMissionSequence = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    const sequence = [
      { event: "system_startup" as SoundEvent, delay: 0 },
      { event: "drone_takeoff" as SoundEvent, delay: 1000 },
      { event: "ground_station_connect" as SoundEvent, delay: 3000 },
      { event: "radar_sweep" as SoundEvent, delay: 4000 },
      { event: "waypoint_reached" as SoundEvent, delay: 6000 },
      { event: "fire_detected" as SoundEvent, delay: 7000 },
      { event: "alert_warning" as SoundEvent, delay: 8000 },
      { event: "data_sync" as SoundEvent, delay: 9000 },
      { event: "mission_complete" as SoundEvent, delay: 10000 }
    ];

    for (const { event, delay } of sequence) {
      setTimeout(() => playSound(event), delay);
    }

    setTimeout(() => setIsPlaying(false), 11000);
  };

  return (
    <Card className={`border-gray-800 bg-gray-900/50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-bold text-white">Mission Audio</h3>
            <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
              CONTEXTUAL
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleSound}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={playMissionSequence}
              disabled={isPlaying || !isEnabled}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
            >
              {isPlaying ? (
                <RotateCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span className="ml-2 text-xs">Demo</span>
            </Button>
          </div>
        </div>

        {/* Volume Control */}
        {isEnabled && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Volume</span>
              <span className="text-sm text-gray-400 font-mono">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}

        {/* Sound Scenarios */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white mb-3">Mission Scenarios</h4>
          <div className="grid grid-cols-2 gap-2">
            {missionScenarios.map((scenario, index) => (
              <Button
                key={index}
                onClick={() => playSound(scenario.event)}
                disabled={!isEnabled}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 text-xs p-2 h-auto flex-col items-start"
              >
                <span className="font-semibold">{scenario.name}</span>
                <span className="text-xs text-gray-500 mt-1">{scenario.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Audio System</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`${isEnabled ? 'text-green-400' : 'text-red-400'}`}>
                {isEnabled ? 'ACTIVE' : 'DISABLED'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}