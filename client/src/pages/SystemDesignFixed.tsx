import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSoundEffects } from "@/hooks/useSoundEffects";
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
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h3 className="text-2xl font-bold text-white">Mission Route</h3>
              <Badge variant="outline" className="border-gray-600 text-gray-400 font-mono">
                LIVE TRACKING
              </Badge>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Real-time visualization of autonomous mission execution with 3D terrain mapping and live drone positioning
            </p>
          </div>
          
          <Card className="border-gray-800 bg-gray-900/30 overflow-hidden mb-6">
            <CardContent className="p-6">
              <div className="relative w-full h-[500px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
                {/* Enhanced 3D Terrain Background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-radial from-gray-600/20 via-gray-700/40 to-gray-900"></div>
                  
                  {/* Terrain Grid */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

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
              </div>
            </CardContent>
          </Card>
          
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-lg font-bold text-white mb-3">Autonomous Mission Execution</h4>
            <p className="text-gray-400 leading-relaxed mb-4">
              RangerEye executes fully autonomous missions across vast terrain, utilizing GPS waypoint navigation and 
              real-time terrain analysis. The system continuously adapts flight paths based on weather conditions, 
              terrain features, and fire risk assessments while maintaining optimal sensor coverage.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h5 className="text-white font-semibold mb-2">Terrain Mapping</h5>
                <p className="text-gray-400">3D terrain analysis with elevation data and obstacle detection</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h5 className="text-white font-semibold mb-2">Fire Risk Zones</h5>
                <p className="text-gray-400">Dynamic hotspot identification and threat assessment</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h5 className="text-white font-semibold mb-2">Live Tracking</h5>
                <p className="text-gray-400">Real-time position updates and mission progress monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step Details Section */}
      <section className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            <div>
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

                    <div className="space-y-2">
                      {currentStep.details.map((detail, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-400">{detail}</span>
                        </div>
                      ))}
                    </div>

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
            
            <div className="space-y-6">
              <Card className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Mission Performance</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Distance</span>
                      <span className="text-white font-mono">87.3 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Flight Duration</span>
                      <span className="text-white font-mono">94 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Area Covered</span>
                      <span className="text-white font-mono">2,150 km²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Battery Usage</span>
                      <span className="text-white font-mono">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Environmental Conditions</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Wind Speed</span>
                      <span className="text-white font-mono">12 km/h NW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature</span>
                      <span className="text-white font-mono">24°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Humidity</span>
                      <span className="text-white font-mono">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Visibility</span>
                      <span className="text-white font-mono">15+ km</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}