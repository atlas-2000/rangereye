import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SoundController from "@/components/SoundController";
import MissionSoundManager from "@/components/MissionSoundManager";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { 
  Radar, 
  Satellite, 
  Radio, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Thermometer,
  Wind,
  Eye,
  Signal,
  Zap,
  Navigation
} from "lucide-react";

interface DroneStatus {
  id: string;
  callSign: string;
  status: 'active' | 'standby' | 'charging' | 'offline';
  mission: string;
  location: { lat: number; lng: number };
  altitude: number;
  battery: number;
  signalStrength: number;
  lastUpdate: string;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function MissionControlDashboard() {
  const [drones, setDrones] = useState<DroneStatus[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { playSound } = useSoundEffects();

  useEffect(() => {
    // Initialize with realistic drone data
    setDrones([
      {
        id: "RNG-001",
        callSign: "ALPHA",
        status: "active",
        mission: "Perimeter Surveillance",
        location: { lat: 40.7829, lng: -121.4944 },
        altitude: 150,
        battery: 85,
        signalStrength: 92,
        lastUpdate: "00:02"
      },
      {
        id: "RNG-002", 
        callSign: "BRAVO",
        status: "charging",
        mission: "Standby Ready",
        location: { lat: 40.7829, lng: -121.4944 },
        altitude: 0,
        battery: 67,
        signalStrength: 98,
        lastUpdate: "00:01"
      },
      {
        id: "RNG-003",
        callSign: "CHARLIE", 
        status: "standby",
        mission: "Thermal Monitoring",
        location: { lat: 40.7945, lng: -121.4823 },
        altitude: 180,
        battery: 92,
        signalStrength: 88,
        lastUpdate: "00:03"
      }
    ]);

    setAlerts([
      {
        id: "ALT-001",
        type: "warning",
        message: "Wind speed increasing - 18 mph gusts detected",
        timestamp: "13:45",
        resolved: false
      },
      {
        id: "ALT-002",
        type: "info", 
        message: "Mission waypoint RNG-001-WP04 completed successfully",
        timestamp: "13:42",
        resolved: true
      },
      {
        id: "ALT-003",
        type: "critical",
        message: "Thermal anomaly detected at 40.7912, -121.4756",
        timestamp: "13:38",
        resolved: false
      }
    ]);

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'charging': return 'text-blue-400 border-blue-400';
      case 'standby': return 'text-yellow-400 border-yellow-400';
      case 'offline': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Command Header */}
      <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Radar className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">MISSION CONTROL</h2>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
              OPERATIONAL
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-white font-mono text-lg">{currentTime.toLocaleTimeString()}</p>
            <p className="text-gray-400 text-sm">UTC {currentTime.toISOString().split('T')[0]}</p>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Satellite className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">ACTIVE DRONES</p>
                <p className="text-2xl font-bold text-white">{drones.filter(d => d.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">AREA COVERAGE</p>
                <p className="text-2xl font-bold text-white">24.7km²</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Radio className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">COMM STATUS</p>
                <p className="text-2xl font-bold text-white">STRONG</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">ACTIVE ALERTS</p>
                <p className="text-2xl font-bold text-white">{alerts.filter(a => !a.resolved).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Drone Fleet Status */}
        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white flex items-center space-x-2">
              <Satellite className="w-5 h-5" />
              <span>Fleet Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {drones.map((drone) => (
                <div key={drone.id} className="p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full border-2 ${getStatusColor(drone.status)}`}></div>
                        <span className="font-mono text-white font-bold">{drone.callSign}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{drone.mission}</p>
                        <p className="text-xs text-gray-400">{drone.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-green-400" />
                          <span className="text-white">{drone.battery}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Signal className="w-3 h-3 text-blue-400" />
                          <span className="text-white">{drone.signalStrength}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Navigation className="w-3 h-3 text-purple-400" />
                          <span className="text-white">{drone.altitude}m</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Last: {drone.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-64 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${alert.resolved ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                        {alert.resolved && (
                          <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10 text-xs">
                            RESOLVED
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Monitoring */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span>Environmental Monitoring</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Wind className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <p className="text-2xl font-bold text-white">18 mph</p>
              <p className="text-sm text-gray-400">Wind Speed</p>
              <p className="text-xs text-gray-500">NW Direction</p>
            </div>
            <div className="text-center">
              <Thermometer className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <p className="text-2xl font-bold text-white">24°C</p>
              <p className="text-sm text-gray-400">Temperature</p>
              <p className="text-xs text-gray-500">Optimal Range</p>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold text-white">12 km</p>
              <p className="text-sm text-gray-400">Visibility</p>
              <p className="text-xs text-gray-500">Clear Conditions</p>
            </div>
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold text-white">MODERATE</p>
              <p className="text-sm text-gray-400">Fire Risk</p>
              <p className="text-xs text-gray-500">Elevated Watch</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle className="w-4 h-4 mr-2" />
            Deploy Mission
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600">
            <Navigation className="w-4 h-4 mr-2" />
            Update Waypoints
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10">
            Emergency RTB
          </Button>
          <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600/10">
            Abort Mission
          </Button>
        </div>
      </div>
    </div>
  );
}