import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import GroundStationsMap from "@/components/GroundStationsMap";
import MissionPlanningInterface from "@/components/MissionPlanningInterface";
import MissionControlDashboard from "@/components/MissionControlDashboard";
import TelemetryVisualization from "@/components/TelemetryVisualization";
import { updatePageSEO, pagesSEO } from "@/lib/seo";
import printerVideoPath from "@assets/19378586-hd_1920_1080_25fps.mp4";
import manufacturingVideoPath from "@assets/IMG_8892.mp4";
import newVideoPath from "@assets/new.mp4";
import groundStationImage from "@assets/base.png";
const floridaTechSeal = "/attached_assets/Florida_Institute_of_Technology_(seal).svg-1.png";

// Terminal data stream
const generateTerminalData = () => {
  const commands = [
    "[GPS] LAT: 37.8651 LNG: -119.5383",
    "[ALT] 125.7m AGL | BARO: 1013.2 hPa",
    "[BATTERY] 14.8V | 5.2A | 85% SOC",
    "[THERMAL] SENSOR_OK | RANGE: 2.5km",
    "[GIMBAL] STABILIZED | YAW: 45.2°",
    "[COMM] RSSI: -78dBm | SNR: 12.5dB",
    "[MISSION] PATROL_01 | WP: 3/8",
    "[WIND] 12km/h NW | GUST: 18km/h",
    "[TEMP] 22°C | HUMID: 65%",
    "[STATUS] AUTONOMOUS_PATROL_ACTIVE",
    "[FIRE] NO_THERMAL_ANOMALIES_DETECTED",
    "[NAV] WAYPOINT_REACHED | NEXT: WP_004",
    "[CAMERA] RECORDING | 1920x1080@30fps",
    "[SERVO] GIMBAL_POS: P:0° R:0° Y:45°",
    "[RADIO] TELEMETRY_LINK_ACTIVE",
    "[SENSORS] ALL_SYSTEMS_NOMINAL",
    "[FLIGHT] MODE_AUTO | AIRSPEED: 12m/s",
    "[POWER] REMAINING_FLIGHT_TIME: 45min",
    "[GPS] HDOP: 0.8 | SATELLITES: 12",
    "[MISSION] AREA_COVERAGE: 67% COMPLETE"
  ];
  
  return commands[Math.floor(Math.random() * commands.length)];
};

interface DataPoint {
  id: string;
  coordinates: string;
  alert: string;
  state: string;
  timestamp: string;
}

const generateDataPoint = (): DataPoint => {
  const states = ['CA', 'NV', 'OR', 'WA', 'AZ', 'CO', 'MT', 'ID'];
  const alerts = ['FIRE_DETECTED', 'THERMAL_ANOMALY', 'SMOKE_PLUME', 'HIGH_TEMP', 'CLEAR'];
  const state = states[Math.floor(Math.random() * states.length)];
  const lat = (Math.random() * 10 + 32).toFixed(4);
  const lng = (-Math.random() * 20 - 110).toFixed(4);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    coordinates: `${lat}, ${lng}`,
    alert: alerts[Math.floor(Math.random() * alerts.length)],
    state,
    timestamp: new Date().toLocaleTimeString()
  };
};

export default function Landing() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [terminalData, setTerminalData] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Update SEO for home page
    updatePageSEO(pagesSEO.home);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scrolling terminal data stream
  useEffect(() => {
    const terminalInterval = setInterval(() => {
      const newLine = `[${new Date().toLocaleTimeString()}] ${generateTerminalData()}`;
      setTerminalData(prev => {
        const updated = [...prev, newLine];
        return updated.slice(-20); // Keep only last 20 lines
      });
      
      // Auto-scroll to bottom
      setTimeout(() => {
        const terminal = document.getElementById('terminal-stream');
        if (terminal) {
          terminal.scrollTop = terminal.scrollHeight;
        }
      }, 50);
    }, 2000);

    return () => clearInterval(terminalInterval);
  }, []);

  // Data stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoint = generateDataPoint();
        const updated = [newPoint, ...prev];
        return updated.slice(0, 8);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster=""
          >
            <source src={newVideoPath} type="video/mp4" />
            <source src={manufacturingVideoPath} type="video/mp4" />
            <source src={printerVideoPath} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>
        
        {/* DARPA-style Grid Overlay */}
        <div className="absolute inset-0 z-10 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Technical Readout Borders */}
        <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none"></div>
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30 z-10"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/30 z-10"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/30 z-10"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30 z-10"></div>

        {/* Mission Patch */}
        <div className="absolute bottom-8 right-8 z-20">
          <img 
            src="/attached_assets/1.png"
            alt="RANGER EYE Mission Patch"
            className="w-20 h-20 opacity-70"
          />
        </div>

        <div className="relative z-20 w-full h-full flex flex-col">

          
          {/* Main Title - Responsive Layout */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-0">
            <div className="relative">
              {/* Large RANGEREYE Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.1em] sm:tracking-[0.15em]" style={{ fontFamily: 'Courier New, monospace' }}>
                  RANGEREYE
                </h1>
                
                {/* Subtitle positioned responsively */}
                <div className="hidden md:block absolute -right-32 top-1/2 transform -translate-y-1/2 rotate-90">
                  <div className="text-sm text-white/60 tracking-[0.4em]" style={{ fontFamily: 'Courier New, monospace' }}>
                    ADVANCE.THROUGH.AUTONOMY
                  </div>
                </div>
                
                {/* Mobile subtitle */}
                <div className="md:hidden mt-4">
                  <div className="text-xs sm:text-sm text-white/60 tracking-[0.2em] sm:tracking-[0.4em]" style={{ fontFamily: 'Courier New, monospace' }}>
                    ADVANCE.THROUGH.AUTONOMY
                  </div>
                </div>
              </div>
              
              {/* Geometric accent lines - responsive */}
              <div className="hidden lg:block absolute -left-24 top-1/2 w-16 h-px bg-white/40"></div>
              <div className="hidden lg:block absolute -right-24 top-1/2 w-16 h-px bg-white/40"></div>
              <div className="absolute left-1/2 -top-4 sm:-top-8 w-px h-8 sm:h-16 bg-white/40"></div>
              <div className="absolute left-1/2 -bottom-4 sm:-bottom-8 w-px h-8 sm:h-16 bg-white/40"></div>
            </div>
          </div>
          
          {/* Mission Parameters */}
          <div className="mb-12 px-4 sm:px-0">
            <div className="bg-black/70 border border-white/30 p-4 sm:p-6 text-left max-w-2xl mx-auto" style={{ fontFamily: 'Courier New, monospace' }}>
              <div className="text-white/60 text-xs mb-4 tracking-[0.2em] sm:tracking-[0.3em]">MISSION PARAMETERS</div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">OPERATIONAL.STATUS:</span>
                  <span className="text-white">MISSION.READY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">DEPLOYMENT.WINDOW:</span>
                  <span className="text-white">24.7.CONTINUOUS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">AUTONOMY.LEVEL:</span>
                  <span className="text-white">FULL.AUTONOMOUS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">INTERVENTION.REQ:</span>
                  <span className="text-white">MINIMAL.HUMAN</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Capability Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-black/60 border border-white/30 p-4">
              <div className="text-2xl text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>24.7</div>
              <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>MONITORING</div>
            </div>
            <div className="bg-black/60 border border-white/30 p-4">
              <div className="text-2xl text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>THERMAL</div>
              <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>DETECTION</div>
            </div>
            <div className="bg-black/60 border border-white/30 p-4">
              <div className="text-2xl text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>REALTIME</div>
              <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>RESPONSE</div>
            </div>
          </div>

          {/* Live Data Stream */}
          <div className="mb-8">
            <h3 className="text-lg font-mono text-gray-400 mb-4">LIVE DETECTION FEED:</h3>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
              {dataPoints.map((point) => (
                <div key={point.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      point.alert === 'FIRE_DETECTED' ? 'bg-red-500 animate-pulse' :
                      point.alert === 'THERMAL_ANOMALY' ? 'bg-orange-500' :
                      point.alert === 'SMOKE_PLUME' ? 'bg-yellow-500' :
                      point.alert === 'HIGH_TEMP' ? 'bg-orange-400' :
                      'bg-green-500'
                    }`}></div>
                    <span className="font-mono text-xs text-gray-300">{point.coordinates}</span>
                    <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300">{point.state}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-mono ${
                      point.alert === 'FIRE_DETECTED' ? 'text-red-400' :
                      point.alert === 'CLEAR' ? 'text-green-400' :
                      'text-yellow-400'
                    }`}>{point.alert}</span>
                    <span className="text-xs text-gray-500">{point.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating UI elements */}
        <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
          <div className="text-xs text-gray-400 mb-1">SYSTEM STATUS</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-white font-mono">OPERATIONAL</span>
          </div>
        </div>

        <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
          <div className="text-xs text-gray-400 mb-1">LOCAL TIME</div>
          <div className="text-sm text-white font-mono">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </section>

      {/* Ground Stations Network */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <Badge variant="outline" className="mb-4 font-mono border-cyan-500 text-cyan-400 bg-cyan-500/10 w-fit">
                NETWORK_INFRASTRUCTURE
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ground Stations Network
              </h2>
              <p className="text-gray-400">
                Autonomous charging stations with extended communication range across California's national parks
              </p>
            </div>
            <div className="lg:col-span-2">
              <GroundStationsMap />
            </div>
          </div>
        </div>
      </section>

      {/* What is RangerEye Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Classification marking */}
        <div className="absolute top-8 left-8 z-10">
          <div className="bg-black border border-white/40 px-4 py-2 text-xs tracking-[0.3em] text-white" style={{ fontFamily: 'Courier New, monospace' }}>
            PROJECT.OVERVIEW
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-6">
                <h3 className="text-white font-black mb-4 tracking-[0.1em] text-2xl" style={{ fontFamily: 'Courier New, monospace' }}>WHAT.IS.RANGEREYE</h3>
                <p className="text-white/80 leading-relaxed text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                  RangerEye is an autonomous drone designed to detect fires early in remote and challenging environments, with minimal human oversight. The system enables faster response, ensuring fires do not spread beyond containment, and will ultimately save lives.
                </p>
              </div>
              
              <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-6">
                <h3 className="text-white font-black mb-4 tracking-[0.1em] text-xl" style={{ fontFamily: 'Courier New, monospace' }}>OPERATIONAL.CAPABILITY</h3>
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Built to operate reliably in hard-to-access areas, RangerEye offers a practical solution for wildfire detection, with deployment and control possible from virtually anywhere.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-black/60 border border-white/10 p-6">
                <h3 className="text-xs text-white/60 mb-6 tracking-[0.3em]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  MISSION.PARAMETERS
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>OVERSIGHT.REQ:</span>
                    <span className="text-white font-mono">MINIMAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>RESPONSE.TIME:</span>
                    <span className="text-white font-mono">85%.FASTER</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>TERRAIN.TYPE:</span>
                    <span className="text-white font-mono">ALL.ACCESS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>DEPLOYMENT:</span>
                    <span className="text-white font-mono">GLOBAL.READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ground Station Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Classification marking */}
        <div className="absolute top-8 left-8 z-10">
          <div className="bg-black border border-white/40 px-4 py-2 text-xs tracking-[0.3em] text-white" style={{ fontFamily: 'Courier New, monospace' }}>
            GROUND.STATION
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Content Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Ground Station Image - Left Side */}
            <div className="relative">
              <div className="absolute -inset-2 lg:-inset-4 bg-white/5 transform skew-y-1"></div>
              <div className="relative">
                <img 
                  src={groundStationImage}
                  alt="RangerEye Ground Station" 
                  className="w-full h-auto object-contain"
                />
                {/* Technical Corner Markers */}
                <div className="absolute top-1 lg:top-2 left-1 lg:left-2 w-3 lg:w-4 h-3 lg:h-4">
                  <div className="absolute top-0 left-0 w-1.5 lg:w-2 h-px bg-white/60"></div>
                  <div className="absolute top-0 left-0 w-px h-1.5 lg:h-2 bg-white/60"></div>
                </div>
                <div className="absolute top-1 lg:top-2 right-1 lg:right-2 w-3 lg:w-4 h-3 lg:h-4">
                  <div className="absolute top-0 right-0 w-1.5 lg:w-2 h-px bg-white/60"></div>
                  <div className="absolute top-0 right-0 w-px h-1.5 lg:h-2 bg-white/60"></div>
                </div>
              </div>
            </div>

            {/* Ground Station Information - Right Side */}
            <div className="space-y-6 lg:space-y-8">
              <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-6">
                <h3 className="text-white font-black mb-4 tracking-[0.1em] text-2xl" style={{ fontFamily: 'Courier New, monospace' }}>AUTONOMOUS.BASE</h3>
                <p className="text-white/80 leading-relaxed text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                  The RangerEye Ground Station provides autonomous charging and mission control for continuous drone operations. Designed for remote deployment with weather-resistant construction.
                </p>
              </div>
              
              <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-6">
                <h3 className="text-white font-black mb-4 tracking-[0.1em] text-xl" style={{ fontFamily: 'Courier New, monospace' }}>MODULAR.DESIGN</h3>
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Compact, self-contained unit with integrated charging systems, communication arrays, and environmental protection for reliable field deployment.
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="bg-black/60 border border-white/10 p-6">
                <h3 className="text-xs text-white/60 mb-6 tracking-[0.3em]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  STATION.SPECIFICATIONS
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>CHARGING.TIME:</span>
                    <span className="text-white font-mono">45.MIN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>OPERATION.TEMP:</span>
                    <span className="text-white font-mono">-20°C.TO.60°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>POWER.SOURCE:</span>
                    <span className="text-white font-mono">GRID.OR.SOLAR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>DEPLOYMENT:</span>
                    <span className="text-white font-mono">FIELD.READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Planning Interface */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <Badge variant="outline" className="mb-4 font-mono border-blue-500 text-blue-400 bg-blue-500/10 w-fit">
                AUTONOMOUS_OPS
              </Badge>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Mission Planning
              </h2>
              <p className="text-gray-400 text-sm">
                Advanced autonomous mission planning with real-time optimization
              </p>
            </div>
            <div className="lg:col-span-3">
              <MissionPlanningInterface />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Control Dashboard */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <MissionControlDashboard />
            </div>
            <div className="lg:col-span-1 flex flex-col justify-center">
              <Badge variant="outline" className="mb-4 font-mono border-purple-500 text-purple-400 bg-purple-500/10 w-fit">
                COMMAND_CENTER
              </Badge>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Mission Control
              </h2>
              <p className="text-gray-400 text-sm">
                Real-time monitoring and control interface for autonomous operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Visualization */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TelemetryVisualization />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div>
                <Badge variant="outline" className="mb-4 font-mono border-green-500 text-green-400 bg-green-500/10 w-fit">
                  SENSOR_SYSTEMS
                </Badge>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Live Telemetry
                </h2>
                <p className="text-gray-400 text-sm">
                  Real-time sensor data and flight parameters monitoring
                </p>
              </div>
              
              {/* Auto-scrolling Terminal Data Stream */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-64 overflow-hidden">
                <div className="text-green-400 text-xs font-mono mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  LIVE_DATA_STREAM:
                </div>
                <div className="h-full overflow-y-auto" id="terminal-stream" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="space-y-1 text-xs font-mono text-green-300">
                    {terminalData.map((line, index) => (
                      <div key={index} className="opacity-80 hover:opacity-100 transition-opacity">
                        {line}
                      </div>
                    ))}
                    {terminalData.length === 0 && (
                      <div className="opacity-60">Initializing data stream...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications - DARPA Style */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Classification marking */}
        <div className="absolute top-8 left-8 z-10">
          <div className="bg-black border border-white/40 px-4 py-2 text-xs tracking-[0.3em] text-white" style={{ fontFamily: 'Courier New, monospace' }}>
            SYSTEM.SPECIFICATIONS
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/60 border border-white/30 p-4">
                  <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>100KM</div>
                  <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>MAX.RANGE</div>
                </div>
                <div className="bg-black/60 border border-white/30 p-4">
                  <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>2.HOURS</div>
                  <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>FLIGHT.TIME</div>
                </div>
                <div className="bg-black/60 border border-white/30 p-4">
                  <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>70KM/H</div>
                  <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>MAX.SPEED</div>
                </div>
                <div className="bg-black/60 border border-white/30 p-4">
                  <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Courier New, monospace' }}>INFRARED</div>
                  <div className="text-xs text-white/60 tracking-[0.2em]" style={{ fontFamily: 'Courier New, monospace' }}>PAYLOAD</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-4">
                  <h3 className="text-white font-black mb-2 tracking-[0.1em]" style={{ fontFamily: 'Courier New, monospace' }}>AUTONOMOUS.NAVIGATION</h3>
                  <p className="text-white/60 text-sm tracking-wide" style={{ fontFamily: 'Courier New, monospace' }}>GPS.GUIDED.WAYPOINT.NAVIGATION.WITH.OBSTACLE.AVOIDANCE</p>
                </div>
                <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-4">
                  <h3 className="text-white font-black mb-2 tracking-[0.1em]" style={{ fontFamily: 'Courier New, monospace' }}>THERMAL.DETECTION</h3>
                  <p className="text-white/60 text-sm tracking-wide" style={{ fontFamily: 'Courier New, monospace' }}>FLIR.THERMAL.CAMERA.640X512.RESOLUTION.±2°C.ACCURACY</p>
                </div>
                <div className="bg-black/60 border-l-4 border-white/40 border-white/30 p-4">
                  <h3 className="text-white font-black mb-2 tracking-[0.1em]" style={{ fontFamily: 'Courier New, monospace' }}>COMMUNICATION</h3>
                  <p className="text-white/60 text-sm tracking-wide" style={{ fontFamily: 'Courier New, monospace' }}>LONG.RANGE.RADIO.TELEMETRY.WITH.REALTIME.VIDEO.STREAMING</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={manufacturingVideoPath} type="video/mp4" />
                </video>
                
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-300 font-mono">ELECTRONICS TESTING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Section - DARPA Style */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Classification marking */}
        <div className="absolute top-8 left-8 z-10">
          <div className="bg-black border border-white/40 px-4 py-2 text-xs tracking-[0.3em] text-white" style={{ fontFamily: 'Courier New, monospace' }}>
            MANUFACTURING.SPECS
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="mb-20">
            {/* Large drone image with DARPA presentation */}
            <div className="relative mb-16">
              <div className="border border-white/20 p-8 bg-black/40">
                <img 
                  src="/attached_assets/image (2).png"
                  alt="RANGEREYE Drone System"
                  className="w-full max-w-4xl mx-auto relative z-10 filter brightness-110 contrast-110"
                />
                
                {/* Technical readout lines */}
                <div className="absolute top-1/2 left-4 w-16 h-px bg-white/40"></div>
                <div className="absolute top-1/2 right-4 w-16 h-px bg-white/40"></div>
                <div className="absolute top-4 left-1/2 w-px h-16 bg-white/40"></div>
                <div className="absolute bottom-4 left-1/2 w-px h-16 bg-white/40"></div>
              </div>
            </div>
            
            {/* Simple manufacturing time text */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-light text-white tracking-[0.2em]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  MANUFACTURE.TIME.&lt;24.HOURS
                </h2>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* Partners Section */}
      <section className="py-20 bg-black border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-mono border-white text-white bg-transparent">
              INSTITUTIONAL_PARTNERS
            </Badge>
            <h2 className="text-3xl font-bold text-white font-mono tracking-wider">
              ACADEMIC_COLLABORATION
            </h2>
          </div>
          
          <div className="flex justify-center">
            {/* Florida Tech - Only Partner */}
            <div className="max-w-4xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={floridaTechSeal}
                    alt="Florida Institute of Technology Seal"
                    className="w-32 h-32 md:w-40 md:h-40"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                    FLORIDA INSTITUTE OF TECHNOLOGY
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    RangerEye is developed as a senior design project at Florida Tech's renowned 
                    Aerospace Engineering program. The project leverages the university's advanced 
                    facilities and expertise in autonomous systems.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="border border-white/30 p-3 bg-black/60">
                      <div className="text-cyan-400 font-mono font-bold">DEPARTMENT</div>
                      <div className="text-white/90">Aerospace Engineering</div>
                    </div>
                    <div className="border border-white/30 p-3 bg-black/60">
                      <div className="text-green-400 font-mono font-bold">PROGRAM</div>
                      <div className="text-white/90">Senior Design</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Support */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-white/70 leading-relaxed">
                This project is made possible through the collaborative efforts of Florida Tech's 
                Aerospace Engineering Department, industry partnerships, and the dedication of our 
                multidisciplinary senior design team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 RangerEye. Advanced wildfire detection and monitoring platform.
          </p>
        </div>
      </footer>
    </div>
  );
}