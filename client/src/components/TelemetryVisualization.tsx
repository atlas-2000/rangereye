import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  Gauge, 
  Radio, 
  Thermometer,
  Zap,
  Navigation,
  Crosshair,
  Camera,
  Wifi
} from "lucide-react";

interface TelemetryData {
  timestamp: string;
  altitude: number;
  speed: number;
  heading: number;
  battery: number;
  temperature: number;
  signalStrength: number;
  gpsAccuracy: number;
  vibration: number;
}

interface SensorReading {
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: any;
}

export default function TelemetryVisualization() {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [currentData, setCurrentData] = useState<TelemetryData | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Generate realistic telemetry data
    const generateTelemetryData = () => {
      const now = new Date();
      const newData: TelemetryData = {
        timestamp: now.toISOString(),
        altitude: 150 + Math.sin(Date.now() / 10000) * 10,
        speed: 15 + Math.random() * 3,
        heading: 185 + Math.sin(Date.now() / 8000) * 15,
        battery: Math.max(60, 85 - (Date.now() % 3600000) / 120000),
        temperature: 22 + Math.random() * 4,
        signalStrength: 85 + Math.random() * 15,
        gpsAccuracy: 0.8 + Math.random() * 0.4,
        vibration: 0.1 + Math.random() * 0.2
      };

      setCurrentData(newData);
      setTelemetryData(prev => [...prev.slice(-19), newData]);
    };

    // Initial data
    generateTelemetryData();

    // Update every 2 seconds
    const interval = setInterval(generateTelemetryData, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSensorReadings = (): SensorReading[] => {
    if (!currentData) return [];

    return [
      {
        name: "Altitude",
        value: currentData.altitude.toFixed(1),
        unit: "m",
        status: currentData.altitude > 200 ? 'warning' : 'normal',
        icon: Navigation
      },
      {
        name: "Ground Speed", 
        value: currentData.speed.toFixed(1),
        unit: "m/s",
        status: currentData.speed > 20 ? 'warning' : 'normal',
        icon: Gauge
      },
      {
        name: "Heading",
        value: currentData.heading.toFixed(0),
        unit: "°",
        status: 'normal',
        icon: Crosshair
      },
      {
        name: "Battery",
        value: currentData.battery.toFixed(1),
        unit: "%",
        status: currentData.battery < 25 ? 'critical' : currentData.battery < 50 ? 'warning' : 'normal',
        icon: Zap
      },
      {
        name: "Temperature",
        value: currentData.temperature.toFixed(1),
        unit: "°C",
        status: currentData.temperature > 35 ? 'warning' : 'normal',
        icon: Thermometer
      },
      {
        name: "Signal",
        value: currentData.signalStrength.toFixed(0),
        unit: "%",
        status: currentData.signalStrength < 50 ? 'warning' : 'normal',
        icon: Wifi
      },
      {
        name: "GPS Accuracy",
        value: currentData.gpsAccuracy.toFixed(1),
        unit: "m",
        status: currentData.gpsAccuracy > 2 ? 'warning' : 'normal',
        icon: Radio
      },
      {
        name: "Vibration",
        value: currentData.vibration.toFixed(2),
        unit: "g",
        status: currentData.vibration > 0.25 ? 'warning' : 'normal',
        icon: Activity
      }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'warning': return 'text-yellow-400 border-yellow-400';
      case 'normal': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'bg-green-500';
    if (battery > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const sensorReadings = getSensorReadings();

  return (
    <div className="space-y-6">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">LIVE TELEMETRY</h2>
          </div>
          <Badge variant="outline" className={`${isConnected ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-red-500 text-red-400 bg-red-500/10'}`}>
            {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-white font-mono">RNG-001 ALPHA</p>
          <p className="text-gray-400 text-sm">Last update: {currentData ? new Date(currentData.timestamp).toLocaleTimeString() : '--:--:--'}</p>
        </div>
      </div>

      {/* Primary Flight Data */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-6">
            <div className="text-center">
              <Navigation className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-3xl font-bold text-white">{currentData?.altitude.toFixed(0) || '--'}</p>
              <p className="text-sm text-gray-400">Altitude (m)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-6">
            <div className="text-center">
              <Gauge className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-3xl font-bold text-white">{currentData?.speed.toFixed(1) || '--'}</p>
              <p className="text-sm text-gray-400">Speed (m/s)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-6">
            <div className="text-center">
              <Crosshair className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-3xl font-bold text-white">{currentData?.heading.toFixed(0) || '--'}°</p>
              <p className="text-sm text-gray-400">Heading</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/50">
          <CardContent className="p-6">
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <p className="text-3xl font-bold text-white">{currentData?.battery.toFixed(0) || '--'}%</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getBatteryColor(currentData?.battery || 0)}`}
                  style={{ width: `${currentData?.battery || 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sensor Grid */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Sensor Telemetry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            {sensorReadings.map((sensor, index) => {
              const IconComponent = sensor.icon;
              return (
                <div key={index} className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 ${getStatusColor(sensor.status).split(' ')[0]}`} />
                    <Badge variant="outline" className={`text-xs ${getStatusColor(sensor.status)}`}>
                      {sensor.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-white font-bold text-lg">{sensor.value} {sensor.unit}</p>
                  <p className="text-gray-400 text-sm">{sensor.name}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data Stream */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Data Stream</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-48 overflow-y-auto">
            <div className="space-y-0">
              {telemetryData.slice(-10).reverse().map((data, index) => (
                <div key={data.timestamp} className={`p-3 border-b border-gray-800/50 font-mono text-sm ${index === 0 ? 'bg-gray-800/30' : ''}`}>
                  <div className="grid grid-cols-6 gap-4 text-gray-300">
                    <span>{new Date(data.timestamp).toLocaleTimeString()}</span>
                    <span>ALT: {data.altitude.toFixed(1)}m</span>
                    <span>SPD: {data.speed.toFixed(1)}m/s</span>
                    <span>HDG: {data.heading.toFixed(0)}°</span>
                    <span>BAT: {data.battery.toFixed(0)}%</span>
                    <span>SIG: {data.signalStrength.toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}