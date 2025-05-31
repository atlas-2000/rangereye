import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Radio, Battery, Signal, Wifi, Activity } from 'lucide-react';

interface GroundStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  batteryLevel: number;
  signalStrength: number;
  range: number;
  dronesConnected: number;
  lastUpdate: string;
}

interface DronePosition {
  id: string;
  callSign: string;
  lat: number;
  lng: number;
  altitude: number;
  status: 'active' | 'standby' | 'returning';
  battery: number;
  connectedStation: string;
  mission: string;
}

export default function GroundStationsMap() {
  const [drones, setDrones] = useState<DronePosition[]>([]);
  const [animationTime, setAnimationTime] = useState(0);
  const [selectedStation, setSelectedStation] = useState<GroundStation | null>(null);

  const groundStations: GroundStation[] = [
    {
      id: 'gs-001',
      name: 'YOSEMITE.ALPHA',
      lat: 37.8651,
      lng: -119.5383,
      status: 'online',
      batteryLevel: 89,
      signalStrength: 95,
      range: 50,
      dronesConnected: 1,
      lastUpdate: '2 min ago'
    },
    {
      id: 'gs-002',
      name: 'SEQUOIA.BRAVO',
      lat: 36.4864,
      lng: -118.5658,
      status: 'online',
      batteryLevel: 92,
      signalStrength: 88,
      range: 50,
      dronesConnected: 1,
      lastUpdate: '1 min ago'
    },
    {
      id: 'gs-003',
      name: 'DEATH.VALLEY.CHARLIE',
      lat: 36.2424,
      lng: -116.8169,
      status: 'online',
      batteryLevel: 76,
      signalStrength: 82,
      range: 50,
      dronesConnected: 1,
      lastUpdate: '3 min ago'
    },
    {
      id: 'gs-004',
      name: 'JOSHUA.TREE.DELTA',
      lat: 33.8734,
      lng: -115.9010,
      status: 'online',
      batteryLevel: 85,
      signalStrength: 78,
      range: 50,
      dronesConnected: 1,
      lastUpdate: '1 min ago'
    }
  ];

  // Initialize drones
  useEffect(() => {
    const initialDrones: DronePosition[] = groundStations.map((station, index) => ({
      id: `drone-${index}`,
      callSign: `RANGEREYE-${String.fromCharCode(65 + index)}`,
      lat: station.lat,
      lng: station.lng,
      altitude: 150,
      status: 'active' as const,
      battery: 85,
      connectedStation: station.id,
      mission: 'AUTONOMOUS.PATROL'
    }));
    setDrones(initialDrones);
  }, []);

  // Animate drones in patrol patterns
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 1);
      
      setDrones(prevDrones => prevDrones.map((drone, index) => {
        const station = groundStations[index];
        if (!station) return drone;
        
        // Circular patrol pattern
        const radius = 0.5; // Large radius for visibility
        const speed = 0.02; // Fast movement
        const angle = animationTime * speed + (index * Math.PI / 2);
        
        return {
          ...drone,
          lat: station.lat + Math.cos(angle) * radius,
          lng: station.lng + Math.sin(angle) * radius,
        };
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [animationTime]);

  return (
    <div className="h-96 bg-gray-900 relative overflow-hidden border border-gray-600">
      {/* Professional grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(rgba(156, 163, 175, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Professional coordinate lines */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/2 w-px h-full bg-blue-400 transform -translate-x-1/2"></div>
          <div className="absolute left-0 top-1/2 w-full h-px bg-blue-400 transform -translate-y-1/2"></div>
        </div>
      </div>

      {/* Enhanced header */}
      <div className="absolute top-2 left-2 z-20">
        <div className="bg-gray-800/95 border border-gray-600 px-4 py-2">
          <div className="text-sm text-blue-300 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
            Status Demonstration
          </div>
          <div className="text-xs text-gray-300 mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
            Ground Station Network - California National Parks
          </div>
        </div>
      </div>

      {/* Ground Stations */}
      {groundStations.map((station, index) => {
        const x = ((station.lng + 120) / 10) * 100; // Normalize longitude to percentage
        const y = ((40 - station.lat) / 8) * 100; // Normalize latitude to percentage
        
        return (
          <div key={station.id}>
            {/* Station coverage area */}
            <div 
              className="absolute border border-blue-300/20 rounded-full pointer-events-none"
              style={{
                left: `${x - 20}%`,
                top: `${y - 20}%`,
                width: '40%',
                height: '40%',
              }}
            ></div>
            
            {/* Professional station marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setSelectedStation(station)}
              onMouseLeave={() => setSelectedStation(null)}
            >
              <div className="w-4 h-4 bg-blue-500 border-2 border-blue-300 rounded-sm shadow-lg">
                <div className="w-2 h-2 bg-blue-200 rounded-full m-0.5"></div>
              </div>
              
              {/* Enhanced station label */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800/95 border border-gray-600 px-2 py-1 text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="text-xs text-blue-200 font-medium whitespace-nowrap">
                  {station.name.replace(/\./g, ' ')}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {station.dronesConnected} drone active
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Patrol Drones - HIGHLY VISIBLE */}
      {drones.map((drone, index) => {
        const x = ((drone.lng + 120) / 10) * 100;
        const y = ((40 - drone.lat) / 8) * 100;
        
        return (
          <div key={drone.id}>
            {/* Large Visible Drone Marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="relative">
                {/* Professional drone marker */}
                <div className="w-3 h-3 bg-orange-500 border border-orange-400 rounded-full shadow-lg">
                  <div className="w-1.5 h-1.5 bg-orange-200 rounded-full m-0.5"></div>
                </div>
                
                {/* Drone callsign - professional style */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 border border-gray-600 px-1 py-0.5 text-xs text-orange-300 whitespace-nowrap" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {drone.callSign}
                </div>
                
                {/* Flight path indicator */}
                <div className="absolute inset-0 w-6 h-6 -ml-1.5 -mt-1.5 border border-orange-400/30 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Professional Station Info Panel */}
      {selectedStation && (
        <div className="absolute bottom-4 left-4 w-80 bg-gray-800/95 border border-gray-600 backdrop-blur-sm z-40">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-blue-200 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>{selectedStation.name.replace(/\./g, ' ')}</h3>
              <div className="bg-green-600 px-2 py-1 text-xs text-white rounded">
                ONLINE
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-blue-300" />
                <span className="text-gray-200">{selectedStation.batteryLevel}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Signal className="w-4 h-4 text-blue-300" />
                <span className="text-gray-200">{selectedStation.signalStrength}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-blue-300" />
                <span className="text-gray-200">{selectedStation.range} km</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-300" />
                <span className="text-gray-200">{selectedStation.dronesConnected} drones</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-600">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Wifi className="w-3 h-3" />
                <span>Last update: {selectedStation.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Status Panel */}
      <div className="absolute top-16 right-2 z-20 max-h-64 overflow-y-auto">
        <div className="bg-gray-800/95 border border-gray-600 p-2 w-48">
          <div className="text-xs text-blue-300 mb-2 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
            Active Patrol Operations
          </div>
          {drones.map((drone, index) => (
            <div key={drone.id} className="mb-1 p-1.5 bg-gray-700/50 rounded border border-gray-600">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-300 text-xs font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {drone.callSign}
                  </span>
                </div>
                <span className="text-green-400 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Active
                </span>
              </div>
              <div className="text-xs text-gray-300 space-y-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div>Alt: {Math.round(drone.altitude)}ft</div>
                <div>Battery: {Math.round(drone.battery)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced information panel */}
      <div className="absolute bottom-2 right-2 z-20">
        <div className="bg-gray-800/95 border border-gray-600 p-2 w-48">
          <div className="text-xs text-blue-300 font-semibold mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
            System Overview
          </div>
          <div className="text-xs text-gray-300 space-y-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div>Region: California</div>
            <div>Coverage: 2,400 sq miles</div>
            <div>Stations: {groundStations.length} active</div>
            <div>Drones: {drones.length} patrolling</div>
            <div>Status: Operational</div>
          </div>
        </div>
      </div>
    </div>
  );
}