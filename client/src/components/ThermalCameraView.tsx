import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { 
  Camera, 
  Thermometer, 
  Target, 
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  Circle,
  Square,
  Settings,
  Play
} from "lucide-react";
import thermalImage from "@assets/sar-cliff-stretcher-rescue-vue-pro-jpeg-web---72-dpi.jpg";
import fallbackThermalImage from "@assets/delta-ep10-placeholder.webp";

interface ThermalDetection {
  id: string;
  x: number;
  y: number;
  temperature: number;
  confidence: number;
  type: 'hotspot' | 'fire' | 'smoke';
}

export default function ThermalCameraView() {
  const [isRecording, setIsRecording] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [detections, setDetections] = useState<ThermalDetection[]>([]);
  const [cameraStatus, setCameraStatus] = useState<'online' | 'offline' | 'calibrating'>('online');

  useEffect(() => {
    // Human heat signatures detected in thermal image - positioned on actual people
    const humanDetections = () => {
      const newDetections: ThermalDetection[] = [
        {
          id: 'HUMAN-001',
          x: 50,
          y: 75,
          temperature: 98.6,
          confidence: 94,
          type: 'hotspot'
        },
        {
          id: 'HUMAN-002',
          x: 45,
          y: 72,
          temperature: 97.8,
          confidence: 91,
          type: 'hotspot'
        },
        {
          id: 'HUMAN-003',
          x: 55,
          y: 78,
          temperature: 98.2,
          confidence: 89,
          type: 'hotspot'
        }
      ];
      setDetections(newDetections);
    };

    humanDetections();
    const interval = setInterval(humanDetections, 3000);

    return () => clearInterval(interval);
  }, []);

  const getDetectionColor = (type: string) => {
    switch (type) {
      case 'fire': return 'border-red-500 bg-red-500/20';
      case 'hotspot': return 'border-orange-500 bg-orange-500/20';
      case 'smoke': return 'border-gray-400 bg-gray-400/20';
      default: return 'border-yellow-500 bg-yellow-500/20';
    }
  };



  return (
    <div className="space-y-6">
      {/* Camera Controls Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Camera className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">THERMAL CAMERA</h2>
          </div>
          <Badge variant="outline" className={`${cameraStatus === 'online' ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-red-500 text-red-400 bg-red-500/10'}`}>
            {cameraStatus.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className={`${isRecording ? 'border-red-500 text-red-400 hover:bg-red-500/10' : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'}`}
          >
            {isRecording ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRecording ? 'Stop' : 'Record'}
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white hover:border-gray-600">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Camera Feed */}
        <div className="lg:col-span-2">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <span className="font-mono">RANGEREYE • THERMAL VISION</span>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs border-red-400 text-red-400 bg-red-500/10 font-mono">
                    LIVE • THERMAL
                  </Badge>
                  <Badge variant="outline" className="text-xs border-green-400 text-green-400 bg-green-500/10 font-mono">
                    RNG-001
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black overflow-hidden">
                {/* Thermal camera feed */}
                <img
                  src={thermalImage}
                  alt="Thermal Camera View - Search & Rescue"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Thermal image failed to load, using fallback');
                    e.currentTarget.src = fallbackThermalImage;
                  }}
                />
                
                {/* Thermal overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-red-900/10 mix-blend-overlay"></div>

                {/* Human heat signature detections */}
                {detections.map((detection, index) => (
                  <div key={detection.id}>
                    {/* Heat signature marker */}
                    <div
                      className={`absolute border-2 rounded-full ${getDetectionColor(detection.type)} animate-pulse`}
                      style={{
                        left: `${detection.x}%`,
                        top: `${detection.y}%`,
                        width: '40px',
                        height: '40px',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Target className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                    
                    {/* RangerEye detection info */}
                    <div 
                      className="absolute bg-black/90 text-white text-xs px-3 py-2 rounded-lg border border-red-500/30 font-mono"
                      style={{
                        left: `${detection.x}%`,
                        top: `${detection.y - 12}%`,
                        transform: 'translate(-50%, -100%)'
                      }}
                    >
                      <div className="text-red-400 font-bold">HUMAN DETECTED</div>
                      <div className="text-orange-400">{detection.temperature.toFixed(1)}°F</div>
                      <div className="text-green-400">{detection.confidence}% CONF</div>
                      <div className="text-blue-400">{detection.id}</div>
                    </div>

                    {/* Targeting reticle */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        left: `${detection.x}%`,
                        top: `${detection.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="w-16 h-16 border border-red-400/60">
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-400"></div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-red-400"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-red-400"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-400"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Camera crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 border border-white/50">
                    <div className="absolute top-1/2 left-1/2 w-2 h-px bg-white/50 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-px h-2 bg-white/50 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>

                {/* RangerEye camera info overlay */}
                <div className="absolute top-4 left-4 bg-black/90 text-white p-4 rounded-lg border border-red-500/30">
                  <div className="text-xs space-y-1 font-mono">
                    <div className="text-red-400 font-bold mb-2">◉ RANGEREYE ACTIVE</div>
                    <div className="text-green-400">ZOOM: {zoomLevel.toFixed(1)}x</div>
                    <div className="text-orange-400">MODE: THERMAL SAR</div>
                    <div className="text-blue-400">GPS: 40.7829, -121.4944</div>
                    <div className="text-purple-400">ALT: 150m AGL</div>
                    <div className="text-yellow-400">TEMP RANGE: -20°C to +150°C</div>
                  </div>
                </div>

                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-900/80 text-red-400 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono">REC</span>
                  </div>
                )}

                {/* Camera controls overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                    className="bg-black/80 border-gray-600 text-white hover:bg-black/90"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoomLevel(Math.min(5.0, zoomLevel + 0.1))}
                    className="bg-black/80 border-gray-600 text-white hover:bg-black/90"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/80 border-gray-600 text-white hover:bg-black/90"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detection Panel */}
        <div className="space-y-4">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Detections</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {detections.map((detection) => (
                  <div key={detection.id} className="bg-gray-800/50 border border-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`text-xs ${getDetectionColor(detection.type).replace('bg-', 'border-').replace('/20', '/30')}`}>
                        {detection.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-400">{detection.confidence}%</span>
                    </div>
                    <p className="text-white font-bold">{detection.temperature.toFixed(1)}°C</p>
                    <p className="text-xs text-gray-400 font-mono">{detection.id}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-white flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Camera Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white">1920x1080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Frame Rate:</span>
                  <span className="text-white">30 FPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thermal Range:</span>
                  <span className="text-white">-20°C to 150°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Detection Range:</span>
                  <span className="text-white">2.5 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gimbal Status:</span>
                  <span className="text-green-400">Stabilized</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}