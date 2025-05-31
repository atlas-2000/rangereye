import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import ansysImage from "@assets/anysys.jpg";
import aircraftImage from "@assets/image (2).png";
import groundStationImage from "@assets/Untitled design.png";
import { 
  Plane, 
  Navigation, 
  Search, 
  AlertTriangle, 
  RotateCcw, 
  Battery,
  Settings,
  Play,
  Pause,
  RotateCw,
  MapPin,
  Zap,
  ArrowRight,
  Volume2,
  VolumeX
} from "lucide-react";

interface ConOpsStep {
  id: number;
  title: string;
  description: string;
  details: string[];
  icon: any;
  position: { x: number; y: number };
  pathColor: string;
}

export default function SystemDesign() {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { playSound, isEnabled, toggleSound } = useSoundEffects();

  const conOpsSteps: ConOpsStep[] = [
    {
      id: 1,
      title: "Launch Sequence",
      description: "Autonomous takeoff and initial system checks",
      details: [
        "Pre-flight system diagnostics",
        "Weather condition assessment",
        "Communication link establishment",
        "GPS calibration and waypoint loading"
      ],
      icon: Plane,
      position: { x: 10, y: 85 },
      pathColor: "#22c55e"
    },
    {
      id: 2,
      title: "Perimeter Scan",
      description: "Initial reconnaissance of designated patrol area",
      details: [
        "Thermal sensor activation",
        "Visual spectrum camera online",
        "Environmental data collection",
        "Baseline temperature mapping"
      ],
      icon: Search,
      position: { x: 25, y: 70 },
      pathColor: "#3b82f6"
    },
    {
      id: 3,
      title: "Route Patrol",
      description: "Systematic coverage of high-risk zones",
      details: [
        "Autonomous navigation between waypoints",
        "Continuous thermal monitoring",
        "Real-time data transmission",
        "Dynamic route adjustment"
      ],
      icon: Navigation,
      position: { x: 50, y: 45 },
      pathColor: "#f59e0b"
    },
    {
      id: 4,
      title: "Anomaly Detection",
      description: "AI-powered identification of thermal irregularities",
      details: [
        "Machine learning threat assessment",
        "Temperature threshold analysis",
        "Pattern recognition algorithms",
        "False positive filtering"
      ],
      icon: AlertTriangle,
      position: { x: 75, y: 30 },
      pathColor: "#ef4444"
    },
    {
      id: 5,
      title: "Alert Protocol",
      description: "Immediate notification and data relay",
      details: [
        "Emergency services notification",
        "GPS coordinates transmission",
        "Real-time video streaming",
        "Threat level assessment"
      ],
      icon: Zap,
      position: { x: 85, y: 60 },
      pathColor: "#dc2626"
    },
    {
      id: 6,
      title: "Return Protocol",
      description: "Safe return to ground station",
      details: [
        "Battery level monitoring",
        "Optimal return path calculation",
        "Landing sequence preparation",
        "Mission data compilation"
      ],
      icon: RotateCcw,
      position: { x: 90, y: 85 },
      pathColor: "#16a34a"
    }
  ];

  const currentStep = conOpsSteps.find(step => step.id === activeStep);

  const selectStep = (stepId: number) => {
    setActiveStep(stepId);
    playSound('navigation_beep');
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          const nextStep = activeStep < 6 ? activeStep + 1 : 1;
          setActiveStep(nextStep);
          
          // Play contextual sounds based on mission step
          switch (nextStep) {
            case 1:
              playSound('drone_takeoff');
              break;
            case 2:
              playSound('thermal_scan');
              break;
            case 3:
              playSound('radar_sweep');
              break;
            case 4:
              playSound('fire_detected');
              break;
            case 5:
              playSound('alert_critical');
              break;
            case 6:
              playSound('mission_complete');
              break;
          }
          
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, activeStep, playSound]);

  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
    playSound(isPlaying ? 'navigation_beep' : 'system_startup');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-12 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SYSTEM DESIGN
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive engineering analysis and concept of operations for autonomous wildfire detection
            </p>
          </div>
        </div>
      </section>

      {/* Mission Route Section */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Mission Route Visualization */}
            <div className="relative">
              <Card className="border-gray-800 bg-gray-900/30 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Mission Route</h3>
                    <Badge variant="outline" className="border-gray-600 text-gray-400 font-mono">
                      LIVE TRACKING
                    </Badge>
                  </div>
                  
                  <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
                    {/* Creative Topographic Background */}
                    <div className="absolute inset-0">
                      {/* Multi-layer gradient base */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-gray-900 to-red-900/40"></div>
                      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-800/20 to-black/60"></div>
                      
                      {/* Enhanced Topographic System */}
                      <svg className="absolute inset-0 w-full h-full opacity-50">
                        <defs>
                          <linearGradient id="contourGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#065f46"/>
                            <stop offset="30%" stopColor="#047857"/>
                            <stop offset="60%" stopColor="#fbbf24"/>
                            <stop offset="85%" stopColor="#f97316"/>
                            <stop offset="100%" stopColor="#dc2626"/>
                          </linearGradient>
                          <pattern id="topoPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                            <circle cx="25" cy="25" r="20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                            <circle cx="25" cy="25" r="15" fill="none" stroke="#374151" strokeWidth="0.4" opacity="0.4"/>
                            <circle cx="25" cy="25" r="10" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.5"/>
                          </pattern>
                        </defs>
                        
                        <rect width="100%" height="100%" fill="url(#topoPattern)"/>
                        
                        {/* Realistic mountain ranges and valleys */}
                        <path d="M0,300 Q100,200 200,250 Q300,180 400,220 Q500,160 600,200" 
                              stroke="url(#contourGradient)" strokeWidth="2" fill="none" opacity="0.8"/>
                        <path d="M0,320 Q120,240 240,280 Q360,210 480,250 Q600,190 720,230" 
                              stroke="url(#contourGradient)" strokeWidth="1.5" fill="none" opacity="0.6"/>
                        
                        {/* Valley systems with detailed contours */}
                        <ellipse cx="20%" cy="75%" rx="120" ry="60" fill="none" stroke="#065f46" strokeWidth="1.5" opacity="0.7"/>
                        <ellipse cx="20%" cy="75%" rx="90" ry="45" fill="none" stroke="#047857" strokeWidth="1.2" opacity="0.6"/>
                        <ellipse cx="20%" cy="75%" rx="60" ry="30" fill="none" stroke="#059669" strokeWidth="1" opacity="0.5"/>
                        <ellipse cx="20%" cy="75%" rx="30" ry="15" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.4"/>
                        
                        <ellipse cx="55%" cy="40%" rx="100" ry="50" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7"/>
                        <ellipse cx="55%" cy="40%" rx="70" ry="35" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6"/>
                        <ellipse cx="55%" cy="40%" rx="40" ry="20" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5"/>
                        
                        <ellipse cx="80%" cy="65%" rx="140" ry="70" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.7"/>
                        <ellipse cx="80%" cy="65%" rx="110" ry="55" fill="none" stroke="#ea580c" strokeWidth="1.2" opacity="0.6"/>
                        <ellipse cx="80%" cy="65%" rx="80" ry="40" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.5"/>
                        <ellipse cx="80%" cy="65%" rx="50" ry="25" fill="none" stroke="#b91c1c" strokeWidth="0.8" opacity="0.4"/>
                        
                        {/* Dense forest coverage with varied vegetation */}
                        <g opacity="0.7">
                          <circle cx="18%" cy="35%" r="4" fill="#22c55e"/>
                          <circle cx="22%" cy="40%" r="3" fill="#16a34a"/>
                          <circle cx="16%" cy="45%" r="3.5" fill="#15803d"/>
                          <circle cx="26%" cy="32%" r="2.5" fill="#166534"/>
                          <circle cx="20%" cy="50%" r="2" fill="#14532d"/>
                          <circle cx="24%" cy="37%" r="2.5" fill="#22c55e"/>
                          <circle cx="14%" cy="42%" r="3" fill="#16a34a"/>
                          <circle cx="28%" cy="43%" r="2" fill="#15803d"/>
                          <circle cx="60%" cy="25%" r="3" fill="#22c55e"/>
                          <circle cx="63%" cy="28%" r="2.5" fill="#16a34a"/>
                          <circle cx="57%" cy="22%" r="2" fill="#15803d"/>
                          <circle cx="66%" cy="31%" r="2.5" fill="#166534"/>
                        </g>
                        
                        {/* Elevation markers */}
                        <text x="20%" y="25%" textAnchor="middle" className="fill-gray-400 text-xs font-mono">2,847m</text>
                        <text x="55%" y="30%" textAnchor="middle" className="fill-gray-400 text-xs font-mono">2,456m</text>
                        <text x="80%" y="55%" textAnchor="middle" className="fill-gray-400 text-xs font-mono">3,124m</text>
                      </svg>
                      
                      {/* Enhanced fire risk zones with heat shimmer */}
                      <div className="absolute top-[20%] right-[15%] w-20 h-20 bg-gradient-radial from-red-500/40 to-transparent rounded-full blur-lg animate-pulse"></div>
                      <div className="absolute top-[25%] right-[20%] w-12 h-12 bg-gradient-radial from-orange-500/30 to-transparent rounded-full blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute bottom-[35%] left-[35%] w-16 h-16 bg-gradient-radial from-red-600/25 to-transparent rounded-full blur-lg animate-pulse" style={{animationDelay: '1.2s'}}></div>
                      <div className="absolute bottom-[45%] left-[25%] w-10 h-10 bg-gradient-radial from-orange-400/35 to-transparent rounded-full blur-md animate-pulse" style={{animationDelay: '1.8s'}}></div>
                      
                      {/* Atmospheric effects and weather patterns */}
                      <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-1/4 left-1/3 w-32 h-8 bg-gray-300/20 rounded-full blur-xl transform rotate-12 animate-pulse" style={{animationDuration: '6s'}}></div>
                        <div className="absolute top-3/4 right-1/4 w-24 h-6 bg-gray-300/15 rounded-full blur-xl transform -rotate-6 animate-pulse" style={{animationDuration: '8s'}}></div>
                      </div>
                      
                      {/* Multi-layer radar sweep system */}
                      <div className="absolute inset-0 opacity-25">
                        <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 origin-left animate-spin" style={{animationDuration: '5s'}}></div>
                        <div className="absolute top-1/2 left-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 origin-left animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
                      </div>
                    </div>

                    {/* Mission Route Path */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path
                        d={`M ${conOpsSteps.map(step => `${step.position.x}% ${step.position.y}%`).join(' L ')}`}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                    </svg>

                    {/* ConOps Step Markers */}
                    {conOpsSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                          activeStep === step.id ? 'scale-125 z-20' : 'scale-100 z-10'
                        }`}
                        style={{ left: step.position.x + '%', top: step.position.y + '%' }}
                        onClick={() => selectStep(step.id)}
                      >
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                          activeStep === step.id 
                            ? 'bg-white border-white text-black' 
                            : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                        }`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        
                        {activeStep === step.id && (
                          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 border border-gray-700 rounded px-3 py-2 whitespace-nowrap">
                            <div className="text-xs font-bold text-white">{step.title}</div>
                            <div className="text-xs text-gray-400">{step.description}</div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Progress Indicator */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Button
                            onClick={togglePlayback}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          
                          <Button
                            onClick={toggleSound}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                          </Button>
                        </div>
                        
                        <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          STEP {activeStep}/6
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300 ease-out"
                          style={{ width: `${(activeStep - 1) * 16.67 + (progress * 0.167)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Step Details */}
            <div>
              {/* Step Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {conOpsSteps.slice(0, 6).map((step) => (
                  <Button
                    key={step.id}
                    onClick={() => selectStep(step.id)}
                    variant={activeStep === step.id ? "default" : "outline"}
                    size="sm"
                    className={`
                      ${activeStep === step.id 
                        ? 'bg-white text-black' 
                        : 'border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    {step.id}
                  </Button>
                ))}
              </div>
              
              {/* Current Step Display */}
              {currentStep && (
                <Card className="border-gray-800 bg-gray-900/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white">
                        <currentStep.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 border-gray-600 text-gray-400 text-xs">
                          STEP {currentStep.id}
                        </Badge>
                        <h2 className="text-xl font-bold text-white mb-3">
                          {currentStep.title}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                          {currentStep.description}
                        </p>
                      </div>
                    </div>

                    {/* Step Details */}
                    <div className="space-y-2">
                      {currentStep.details.map((detail, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-400">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Next Step Preview */}
                    {activeStep < 6 && (
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Next:</span>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>{conOpsSteps[activeStep]?.title}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Emergency Override Always Available */}
              <Card className="border-orange-500/30 bg-orange-500/5 mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-orange-400" />
                    <div>
                      <h4 className="text-sm font-bold text-orange-400">Emergency Override</h4>
                      <p className="text-xs text-orange-300/80">Manual control available at any time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              

            </div>
          </div>
        </div>
      </section>

      {/* Engineering Analysis */}
      <section className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Engineering Analysis</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Rigorous computational fluid dynamics and structural analysis ensuring optimal performance in challenging conditions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* CFD Analysis */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">ANSYS Fluent CFD</h3>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Computational fluid dynamics analysis validates aerodynamic efficiency across operational envelope. 
                    NACA 4412 airfoil optimization demonstrates superior lift-to-drag characteristics essential for extended endurance missions.
                  </p>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                    <img 
                      src={ansysImage} 
                      alt="ANSYS Fluent CFD Analysis - Static Pressure Distribution"
                      className="w-full h-auto rounded-lg border border-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      ANSYS Fluent static pressure analysis showing optimized airflow over NACA 4412 airfoil
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Max Lift Coefficient:</span>
                      <span className="text-white font-mono ml-2">1.85</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Stall Angle:</span>
                      <span className="text-white font-mono ml-2">18°</span>
                    </div>
                    <div>
                      <span className="text-gray-500">L/D Ratio:</span>
                      <span className="text-white font-mono ml-2">12.4</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cruise Efficiency:</span>
                      <span className="text-white font-mono ml-2">89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DroneKit Python Integration */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">DroneKit Python</h3>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Autonomous flight control leveraging DroneKit-Python for mission execution, waypoint navigation, 
                    and real-time telemetry integration with ground control systems.
                  </p>
                  
                  <div className="bg-black/50 rounded-lg p-3 border border-gray-700">
                    <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{`from drizzle_zod import createInsertSchema
import time
from pymavlink import mavutil

# Mission waypoint execution
def execute_mission():
    vehicle.simple_goto(
        LocationGlobalRelative(
            lat=-35.363261, 
            lon=149.165230, 
            alt=150
        )
    )
    
# Fire detection protocol
def thermal_scan():
    return sensor.read_thermal_data()`}
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Flight Modes:</span>
                      <span className="text-white font-mono ml-2">AUTO/RTL</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Failsafe:</span>
                      <span className="text-white font-mono ml-2">Enabled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ground Station Specifications */}
      <section className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ground Station Network</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Distributed charging infrastructure enabling continuous operations across remote terrain
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Platform Specifications</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="text-white font-mono">3.0 × 3.0 × 0.8m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-white font-mono">185 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Power Supply:</span>
                    <span className="text-white font-mono">Solar + Battery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Coverage:</span>
                    <span className="text-white font-mono">50 km radius</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Charging System</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Charge Power:</span>
                    <span className="text-white font-mono">1kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">0-80% Time:</span>
                    <span className="text-white font-mono">85 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="text-white font-mono">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connector:</span>
                    <span className="text-white font-mono">Automated</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Communications</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Primary Link:</span>
                    <span className="text-white font-mono">915 MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Backup:</span>
                    <span className="text-white font-mono">Satellite</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Rate:</span>
                    <span className="text-white font-mono">57.6 kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latency:</span>
                    <span className="text-white font-mono">&lt;50ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Technical Specifications</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Aircraft Performance</h3>
                
                {/* Aircraft Image */}
                <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                  <img 
                    src={aircraftImage} 
                    alt="RangerEye Aircraft Platform - Top View"
                    className="w-full h-auto rounded-lg border border-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    RangerEye fixed-wing platform optimized for extended surveillance missions
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Wingspan:</span>
                    <div className="text-white font-mono">2.1 m</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Weight:</span>
                    <div className="text-white font-mono">6.5 kg</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Flight Time:</span>
                    <div className="text-white font-mono">100 minutes</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Range:</span>
                    <div className="text-white font-mono">108 km</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Cruise Speed:</span>
                    <div className="text-white font-mono">18 m/s</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Max Speed:</span>
                    <div className="text-white font-mono">70 km/h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Sensor Package</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Thermal Camera:</span>
                    <div className="text-white font-mono">FLIR Lepton</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Visual Camera:</span>
                    <div className="text-white font-mono">4K RGB</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Detection Range:</span>
                    <div className="text-white font-mono">2+ km</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Resolution:</span>
                    <div className="text-white font-mono">160×120 px</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Temperature Range:</span>
                    <div className="text-white font-mono">-10°C to 400°C</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Accuracy:</span>
                    <div className="text-white font-mono">±5°C</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}