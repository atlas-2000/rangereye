import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Flame, Clock, AlertTriangle } from "lucide-react";

interface FireData {
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: number;
  frp: number;
  satellite: string;
  instrument: string;
  acq_date: string;
  acq_time: string;
  daynight: string;
  type: number;
}

// Generate simulated fire data
const generateFireData = (): FireData[] => {
  const fires: FireData[] = [];
  const states = [
    { name: "California", latRange: [32.5, 42], lngRange: [-124.4, -114.1] },
    { name: "Oregon", latRange: [42, 46.3], lngRange: [-124.6, -116.5] },
    { name: "Washington", latRange: [45.5, 49], lngRange: [-124.8, -116.9] },
    { name: "Colorado", latRange: [37, 41], lngRange: [-109, -102] },
    { name: "Montana", latRange: [45, 49], lngRange: [-116, -104] },
  ];

  const satellites = ["TERRA", "AQUA", "NOAA-20", "SUOMI NPP"];
  const instruments = ["MODIS", "VIIRS"];

  for (let i = 0; i < 15; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const lat = state.latRange[0] + Math.random() * (state.latRange[1] - state.latRange[0]);
    const lng = state.lngRange[0] + Math.random() * (state.lngRange[1] - state.lngRange[0]);
    
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 24);
    const fireTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    
    fires.push({
      latitude: Number(lat.toFixed(4)),
      longitude: Number(lng.toFixed(4)),
      brightness: 300 + Math.random() * 100,
      confidence: 60 + Math.random() * 40,
      frp: 10 + Math.random() * 90,
      satellite: satellites[Math.floor(Math.random() * satellites.length)],
      instrument: instruments[Math.floor(Math.random() * instruments.length)],
      acq_date: fireTime.toISOString().split('T')[0],
      acq_time: fireTime.toTimeString().split(' ')[0].slice(0, 5),
      daynight: fireTime.getHours() >= 6 && fireTime.getHours() <= 18 ? "D" : "N",
      type: Math.random() > 0.8 ? 1 : 0
    });
  }

  return fires.sort((a, b) => b.confidence - a.confidence);
};

export default function LiveFireData() {
  const [fireData, setFireData] = useState<FireData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setFireData(generateFireData());
      setIsLoading(false);
    }, 1000);

    // Update data every 30 seconds
    const interval = setInterval(() => {
      setFireData(generateFireData());
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-red-400";
    if (confidence >= 60) return "text-orange-400";
    return "text-yellow-400";
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return "High";
    if (confidence >= 60) return "Medium";
    return "Low";
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const formatTime = (date: string, time: string) => {
    try {
      const dateTime = new Date(`${date} ${time}`);
      return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return time || "N/A";
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-400">
          <div className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
          <span>Loading fire detection data...</span>
        </div>
      </div>
    );
  }

  if (!fireData || fireData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Flame className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p>No active fires detected in the last 24 hours</p>
          <p className="text-sm">Simulated detection data for demonstration</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Data Headers */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="grid grid-cols-5 gap-4 font-mono text-xs text-gray-400 uppercase tracking-wider">
          <div>COORDINATES</div>
          <div>CONFIDENCE</div>
          <div>SATELLITE</div>
          <div>TIME</div>
          <div>BRIGHTNESS</div>
        </div>
      </div>
      
      {/* Fire Data */}
      <div className="max-h-80 overflow-y-auto">
        <div className="space-y-0">
          {fireData.slice(0, 20).map((fire, index) => (
            <div 
              key={`${fire.latitude}-${fire.longitude}-${index}`}
              className="grid grid-cols-5 gap-4 p-4 border-b border-gray-800/50 font-mono text-sm transition-all duration-300 hover:bg-gray-800/30"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                <span className="text-gray-300">
                  {formatCoordinates(fire.latitude, fire.longitude)}
                </span>
              </div>
              
              <div className="flex items-center">
                <Badge 
                  variant="outline" 
                  className={`text-xs border-current ${getConfidenceColor(fire.confidence)}`}
                >
                  {getConfidenceBadge(fire.confidence)} ({fire.confidence}%)
                </Badge>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-400">
                <span>{fire.satellite}</span>
                <span className="text-gray-600">•</span>
                <span className="text-xs">{fire.instrument}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>{formatTime(fire.acq_date, fire.acq_time)}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Flame className="w-3 h-3 text-orange-400 mr-1" />
                <span>{fire.brightness}K</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-800/30 p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Simulated fire detection data</span>
            <span>•</span>
            <span>{fireData.length} active detections</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Demo monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}