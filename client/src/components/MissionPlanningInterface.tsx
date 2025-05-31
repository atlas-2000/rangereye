import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Battery, 
  Wind, 
  Eye, 
  Route,
  Play,
  Pause,
  Settings,
  Target
} from "lucide-react";

interface MissionWaypoint {
  id: string;
  lat: number;
  lng: number;
  altitude: number;
  action: string;
  estimatedTime: string;
}

interface MissionParams {
  duration: number;
  coverage: number;
  waypoints: number;
  batteryUsage: number;
  status: 'planning' | 'ready' | 'active' | 'completed';
}

export default function MissionPlanningInterface() {
  const [currentMission, setCurrentMission] = useState<MissionParams>({
    duration: 0,
    coverage: 0,
    waypoints: 0,
    batteryUsage: 0,
    status: 'planning'
  });

  const [waypoints, setWaypoints] = useState<MissionWaypoint[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate realistic mission waypoints
  const generateMission = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newWaypoints: MissionWaypoint[] = [
        {
          id: "WP001",
          lat: 40.7829,
          lng: -121.4944,
          altitude: 120,
          action: "TAKEOFF",
          estimatedTime: "00:00"
        },
        {
          id: "WP002", 
          lat: 40.7845,
          lng: -121.4890,
          altitude: 150,
          action: "SURVEY",
          estimatedTime: "00:08"
        },
        {
          id: "WP003",
          lat: 40.7912,
          lng: -121.4756,
          altitude: 150,
          action: "THERMAL_SCAN", 
          estimatedTime: "00:15"
        },
        {
          id: "WP004",
          lat: 40.7945,
          lng: -121.4823,
          altitude: 180,
          action: "PERIMETER_CHECK",
          estimatedTime: "00:23"
        },
        {
          id: "WP005",
          lat: 40.7889,
          lng: -121.4967,
          altitude: 150,
          action: "VISUAL_CONFIRM",
          estimatedTime: "00:31"
        },
        {
          id: "WP006",
          lat: 40.7829,
          lng: -121.4944,
          altitude: 0,
          action: "LANDING",
          estimatedTime: "00:38"
        }
      ];

      setWaypoints(newWaypoints);
      setCurrentMission({
        duration: 38,
        coverage: 15.7,
        waypoints: newWaypoints.length,
        batteryUsage: 65,
        status: 'ready'
      });
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    generateMission();
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'TAKEOFF': return <Play className="w-3 h-3 text-green-400" />;
      case 'LANDING': return <Pause className="w-3 h-3 text-red-400" />;
      case 'SURVEY': return <Eye className="w-3 h-3 text-blue-400" />;
      case 'THERMAL_SCAN': return <Target className="w-3 h-3 text-orange-400" />;
      case 'PERIMETER_CHECK': return <Route className="w-3 h-3 text-purple-400" />;
      case 'VISUAL_CONFIRM': return <Settings className="w-3 h-3 text-cyan-400" />;
      default: return <Navigation className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'border-yellow-500 text-yellow-400 bg-yellow-500/10';
      case 'ready': return 'border-green-500 text-green-400 bg-green-500/10';
      case 'active': return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case 'completed': return 'border-gray-500 text-gray-400 bg-gray-500/10';
      default: return 'border-gray-500 text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Mission Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">DURATION</p>
                <p className="text-lg font-bold text-white">{currentMission.duration}min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">COVERAGE</p>
                <p className="text-lg font-bold text-white">{currentMission.coverage}km²</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Route className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">WAYPOINTS</p>
                <p className="text-lg font-bold text-white">{currentMission.waypoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Battery className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">BATTERY</p>
                <p className="text-lg font-bold text-white">{currentMission.batteryUsage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={`px-3 py-1 ${getStatusColor(currentMission.status)}`}>
            {currentMission.status.toUpperCase()}
          </Badge>
          <span className="text-gray-400 font-mono text-sm">Mission ID: RNG-2024-001</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={generateMission}
            disabled={isGenerating}
            className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
          >
            {isGenerating ? 'Generating...' : 'New Mission'}
          </Button>
          <Button 
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={currentMission.status !== 'ready'}
          >
            Deploy Mission
          </Button>
        </div>
      </div>

      {/* Waypoint List */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center space-x-2">
            <Navigation className="w-5 h-5" />
            <span>Mission Waypoints</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-64 overflow-y-auto">
            {isGenerating ? (
              <div className="h-32 flex items-center justify-center">
                <div className="flex items-center space-x-3 text-gray-400">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  <span>Calculating optimal flight path...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {waypoints.map((waypoint, index) => (
                  <div 
                    key={waypoint.id}
                    className="flex items-center justify-between p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getActionIcon(waypoint.action)}
                        <span className="font-mono text-sm text-gray-400">{waypoint.id}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{waypoint.action.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-400">
                          {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)} • {waypoint.altitude}m
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-mono text-sm">{waypoint.estimatedTime}</p>
                      <p className="text-xs text-gray-400">ETA</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Conditions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">Wind</span>
              </div>
              <span className="text-white font-bold">12 mph NW</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Visibility</span>
              </div>
              <span className="text-white font-bold">15 km</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">Fire Risk</span>
              </div>
              <Badge variant="outline" className="border-orange-500 text-orange-400 bg-orange-500/10 text-xs">
                MODERATE
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}