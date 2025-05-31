import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Flame, 
  DollarSign, 
  Trees, 
  Heart, 
  AlertTriangle,
  TrendingUp,
  Clock,
  MapPin,
  Zap
} from "lucide-react";


interface ImpactData {
  economicDamage: number;
  acresAffected: number;
  co2Emissions: number;
  displacedWildlife: number;
  healthRisk: number;
}

interface Scenario {
  name: string;
  description: string;
  baseImpact: ImpactData;
  color: string;
}

export default function SocialImpact() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [detectionDelay, setDetectionDelay] = useState([30]); // minutes
  const [currentImpact, setCurrentImpact] = useState<ImpactData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<ImpactData>({
    economicDamage: 0,
    acresAffected: 0,
    co2Emissions: 0,
    displacedWildlife: 0,
    healthRisk: 0
  });

  const scenarios: Scenario[] = [
    {
      name: "Small Brush Fire",
      description: "Grassland fire, minimal structures",
      baseImpact: {
        economicDamage: 2500000, // $2.5M
        acresAffected: 150,
        co2Emissions: 450,
        displacedWildlife: 200,
        healthRisk: 2
      },
      color: "text-yellow-500"
    },
    {
      name: "Medium Forest Fire", 
      description: "Mixed vegetation, rural structures",
      baseImpact: {
        economicDamage: 45000000, // $45M
        acresAffected: 2500,
        co2Emissions: 12000,
        displacedWildlife: 8500,
        healthRisk: 15
      },
      color: "text-orange-500"
    },
    {
      name: "Large Wildfire",
      description: "Urban interface, critical infrastructure",
      baseImpact: {
        economicDamage: 250000000, // $250M
        acresAffected: 18000,
        co2Emissions: 85000,
        displacedWildlife: 45000,
        healthRisk: 35
      },
      color: "text-red-500"
    }
  ];

  const calculateImpact = (scenario: Scenario, delayMinutes: number): ImpactData => {
    // Impact escalates exponentially with detection delay
    const delayMultiplier = 1 + (delayMinutes / 60) * 2.5; // 2.5x impact per hour delay
    
    return {
      economicDamage: Math.round(scenario.baseImpact.economicDamage * delayMultiplier),
      acresAffected: Math.round(scenario.baseImpact.acresAffected * delayMultiplier),
      co2Emissions: Math.round(scenario.baseImpact.co2Emissions * delayMultiplier),
      displacedWildlife: Math.round(scenario.baseImpact.displacedWildlife * delayMultiplier),
      healthRisk: Math.round(scenario.baseImpact.healthRisk * delayMultiplier)
    };
  };

  const animateCounters = (targetImpact: ImpactData) => {
    const duration = 3000; // 3 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedValues({
        economicDamage: Math.round(targetImpact.economicDamage * progress),
        acresAffected: Math.round(targetImpact.acresAffected * progress),
        co2Emissions: Math.round(targetImpact.co2Emissions * progress),
        displacedWildlife: Math.round(targetImpact.displacedWildlife * progress),
        healthRisk: Math.round(targetImpact.healthRisk * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, stepDuration);
  };

  const runSimulation = () => {
    if (!selectedScenario) return;
    
    setIsSimulating(true);
    const impact = calculateImpact(selectedScenario, detectionDelay[0]);
    setCurrentImpact(impact);
    
    // Reset animated values
    setAnimatedValues({
      economicDamage: 0,
      acresAffected: 0,
      co2Emissions: 0,
      displacedWildlife: 0,
      healthRisk: 0
    });
    
    // Start animation
    setTimeout(() => animateCounters(impact), 500);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const calculateReduction = () => {
    if (!currentImpact) return 0;
    const rangerEyeImpact = calculateImpact(selectedScenario!, 30); // 30 minute detection
    const reduction = ((currentImpact.economicDamage - rangerEyeImpact.economicDamage) / currentImpact.economicDamage) * 100;
    return Math.round(reduction);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-orange-900/20 to-black"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-mono border-red-500 text-red-400 bg-black/50 backdrop-blur-sm">
              IMPACT ASSESSMENT
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-2xl">
              Wildfire <span className="text-red-500">Impact</span> Simulator
            </h1>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Experience the devastating escalation of wildfire damage with detection delays. 
              In 2023, <span className="text-red-400 font-semibold">56,580 wildfires destroyed 2.7 million acres</span> in the US, 
              causing <span className="text-red-400 font-semibold">$394-893 billion</span> in global economic losses annually.
              RangerEye can <span className="text-green-400 font-semibold">detect and live stream fires within 30 minutes</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Controls */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Fire Scenario</h2>
                <div className="grid gap-4">
                  {scenarios.map((scenario, index) => (
                    <Card 
                      key={index}
                      className={`cursor-pointer transition-all border-2 ${
                        selectedScenario?.name === scenario.name 
                          ? 'border-red-500 bg-red-500/10' 
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedScenario(scenario)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Flame className={`w-6 h-6 ${scenario.color}`} />
                          <div>
                            <h3 className="font-semibold text-white">{scenario.name}</h3>
                            <p className="text-sm text-gray-400">{scenario.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Detection Delay</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>RangerEye (30 min)</span>
                    <span>Delayed (4 hours)</span>
                  </div>
                  <Slider
                    value={detectionDelay}
                    onValueChange={setDetectionDelay}
                    max={240}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white">{detectionDelay[0]}</span>
                    <span className="text-gray-400 ml-1">minutes</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={runSimulation}
                disabled={!selectedScenario || isSimulating}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
              >
                {isSimulating ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Simulating Impact...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Visualize Impact
                  </>
                )}
              </Button>
            </div>

            {/* Visualization */}
            <div className="space-y-6">
              {/* Enhanced Fire Spread Simulation */}
              <Card className="border-gray-700 bg-gray-800/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-80 bg-black overflow-hidden">
                    {/* Advanced Terrain Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-yellow-900/20 to-red-900/30"></div>
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-800/30 to-black/50"></div>
                    
                    {/* Detailed Topographic System */}
                    <svg className="absolute inset-0 w-full h-full opacity-40">
                      <defs>
                        <pattern id="terrainGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                          <circle cx="30" cy="30" r="25" fill="none" stroke="#374151" strokeWidth="0.8" opacity="0.3"/>
                          <circle cx="30" cy="30" r="18" fill="none" stroke="#4B5563" strokeWidth="0.6" opacity="0.4"/>
                          <circle cx="30" cy="30" r="12" fill="none" stroke="#6B7280" strokeWidth="0.4" opacity="0.5"/>
                          <circle cx="30" cy="30" r="6" fill="none" stroke="#9CA3AF" strokeWidth="0.3" opacity="0.6"/>
                        </pattern>
                        <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#065f46"/>
                          <stop offset="40%" stopColor="#047857"/>
                          <stop offset="70%" stopColor="#fbbf24"/>
                          <stop offset="90%" stopColor="#f97316"/>
                          <stop offset="100%" stopColor="#dc2626"/>
                        </linearGradient>
                      </defs>
                      
                      <rect width="100%" height="100%" fill="url(#terrainGrid)"/>
                      
                      {/* Mountain ranges with realistic contours */}
                      <path d="M0,240 Q80,180 160,220 Q240,160 320,200 Q400,140 480,180" 
                            stroke="url(#elevationGrad)" strokeWidth="2.5" fill="none" opacity="0.8"/>
                      <path d="M0,260 Q100,200 200,240 Q300,180 400,220 Q500,160 600,200" 
                            stroke="url(#elevationGrad)" strokeWidth="2" fill="none" opacity="0.6"/>
                      <path d="M0,280 Q120,220 240,260 Q360,200 480,240 Q600,180 720,220" 
                            stroke="url(#elevationGrad)" strokeWidth="1.5" fill="none" opacity="0.4"/>
                      
                      {/* Valley systems */}
                      <ellipse cx="25%" cy="70%" rx="80" ry="40" fill="none" stroke="#059669" strokeWidth="1.2" opacity="0.6"/>
                      <ellipse cx="25%" cy="70%" rx="60" ry="30" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
                      <ellipse cx="75%" cy="40%" rx="90" ry="45" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6"/>
                      <ellipse cx="75%" cy="40%" rx="70" ry="35" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.5"/>
                      
                      {/* Forest areas with individual trees */}
                      <g opacity="0.7">
                        {/* Left forest cluster */}
                        <circle cx="20%" cy="50%" r="5" fill="#22c55e"/>
                        <circle cx="22%" cy="45%" r="4" fill="#16a34a"/>
                        <circle cx="18%" cy="55%" r="4.5" fill="#15803d"/>
                        <circle cx="25%" cy="48%" r="3.5" fill="#166534"/>
                        <circle cx="16%" cy="47%" r="3" fill="#14532d"/>
                        <circle cx="23%" cy="52%" r="4" fill="#22c55e"/>
                        <circle cx="19%" cy="42%" r="3.5" fill="#16a34a"/>
                        <circle cx="26%" cy="45%" r="3" fill="#15803d"/>
                        
                        {/* Right forest cluster */}
                        <circle cx="70%" cy="30%" r="4" fill="#22c55e"/>
                        <circle cx="73%" cy="35%" r="3.5" fill="#16a34a"/>
                        <circle cx="68%" cy="25%" r="3" fill="#15803d"/>
                        <circle cx="75%" cy="28%" r="4.5" fill="#166534"/>
                        <circle cx="66%" cy="32%" r="3" fill="#14532d"/>
                        <circle cx="72%" cy="40%" r="3.5" fill="#22c55e"/>
                      </g>
                      
                      {/* Elevation and geographic markers */}
                      <text x="25%" y="25%" textAnchor="middle" className="fill-gray-400 text-xs font-mono">Pine Ridge 2,847m</text>
                      <text x="75%" y="20%" textAnchor="middle" className="fill-gray-400 text-xs font-mono">Eagle Peak 3,124m</text>
                      <text x="85%" y="85%" textAnchor="middle" className="fill-gray-400 text-xs font-mono">Valley Floor 1,650m</text>
                    </svg>

                    {/* Wind direction indicator */}
                    <div className="absolute top-4 right-4 bg-black/70 rounded-lg p-2 backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 rounded-full relative">
                          <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2 -translate-y-1"></div>
                        </div>
                        <span className="text-cyan-400 text-xs font-mono">15 mph SW</span>
                      </div>
                    </div>

                    {/* Advanced Fire Spread Animation */}
                    {isSimulating && (
                      <div className="absolute inset-0">
                        {/* Multiple ignition points */}
                        <div className="absolute" style={{left: '45%', top: '60%'}}>
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                          <div className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute" style={{left: '52%', top: '55%'}}>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                        </div>
                        <div className="absolute" style={{left: '48%', top: '65%'}}>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                        </div>
                        
                        {/* Spreading fire waves */}
                        <div className="absolute" style={{left: '50%', top: '60%', transform: 'translate(-50%, -50%)'}}>
                          <div className="w-16 h-16 border-2 border-red-500/50 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
                          <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-orange-500/30 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
                        </div>
                        
                        {/* Smoke simulation */}
                        <div className="absolute" style={{left: '48%', top: '50%'}}>
                          <div className="w-8 h-8 bg-gray-600/40 rounded-full blur-sm animate-pulse" style={{animationDuration: '4s'}}></div>
                        </div>
                        <div className="absolute" style={{left: '55%', top: '45%'}}>
                          <div className="w-12 h-12 bg-gray-500/30 rounded-full blur-md animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
                        </div>
                      </div>
                    )}

                    {/* Advanced Burn Area Visualization */}
                    {currentImpact && !isSimulating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Main burn area */}
                        <div 
                          className="relative rounded-full overflow-hidden"
                          style={{
                            width: `${Math.min(250, 60 + (animatedValues.acresAffected / 1000) * 12)}px`,
                            height: `${Math.min(250, 60 + (animatedValues.acresAffected / 1000) * 12)}px`,
                            transition: 'all 0.5s ease'
                          }}
                        >
                          {/* Fire gradient layers */}
                          <div className="absolute inset-0 bg-gradient-radial from-red-600/80 via-orange-500/60 to-yellow-500/30 animate-pulse"></div>
                          <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-500/20 to-orange-500/40"></div>
                          
                          {/* Burn pattern overlay */}
                          <svg className="absolute inset-0 w-full h-full">
                            <defs>
                              <pattern id="burnPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="3" fill="#dc2626" opacity="0.3"/>
                                <circle cx="5" cy="15" r="2" fill="#ea580c" opacity="0.4"/>
                                <circle cx="15" cy="5" r="2.5" fill="#f97316" opacity="0.3"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#burnPattern)"/>
                          </svg>
                          
                          {/* Fire perimeter */}
                          <div className="absolute inset-0 border-2 border-red-500/70 rounded-full"></div>
                        </div>
                        
                        {/* Spot fires (wind-blown embers) */}
                        <div className="absolute" style={{left: '65%', top: '45%'}}>
                          <div className="w-4 h-4 bg-orange-500/60 rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute" style={{left: '70%', top: '40%'}}>
                          <div className="w-3 h-3 bg-red-500/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Status Overlay */}
                    <div className="absolute top-4 left-4 bg-black/80 rounded-lg p-3 backdrop-blur-sm border border-gray-700">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-white text-sm font-mono">
                            {selectedScenario ? selectedScenario.name : "Select Fire Scenario"}
                          </span>
                        </div>
                        {selectedScenario && (
                          <div className="flex items-center space-x-2">
                            <Flame className={`w-4 h-4 ${selectedScenario.color}`} />
                            <span className="text-gray-300 text-xs">
                              {selectedScenario.description}
                            </span>
                          </div>
                        )}
                        {currentImpact && !isSimulating && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-xs font-mono">
                              +{detectionDelay[0]} min delay
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Weather conditions overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-2 backdrop-blur-sm border border-gray-700">
                      <div className="text-xs text-gray-300 space-y-1">
                        <div>Temp: 89°F | Humidity: 18%</div>
                        <div>Fuel Moisture: 8% (Critical)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              {currentImpact && (
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-gray-700 bg-gray-800/50">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(animatedValues.economicDamage)}
                      </div>
                      <div className="text-sm text-gray-400">Economic Damage</div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-700 bg-gray-800/50">
                    <CardContent className="p-4 text-center">
                      <Trees className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {formatNumber(animatedValues.acresAffected)}
                      </div>
                      <div className="text-sm text-gray-400">Acres Affected</div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-700 bg-gray-800/50">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        {formatNumber(animatedValues.co2Emissions)}
                      </div>
                      <div className="text-sm text-gray-400">Tons CO₂</div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-700 bg-gray-800/50">
                    <CardContent className="p-4 text-center">
                      <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        +{animatedValues.healthRisk}%
                      </div>
                      <div className="text-sm text-gray-400">Health Risk</div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* RangerEye Impact */}
              {currentImpact && !isSimulating && (
                <Card className="border-green-500 bg-green-500/10">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-bold text-white mb-2">RangerEye Detection & Live Stream</h3>
                    <p className="text-gray-300 mb-4">
                      With 30-minute detection and live streaming, this impact could be reduced by
                    </p>
                    <div className="text-4xl font-bold text-green-400">
                      {calculateReduction()}%
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Saving {formatCurrency((currentImpact.economicDamage * calculateReduction()) / 100)} in damages
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Wildfire Crisis</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Understanding the scale and urgency of wildfire impact on communities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-gray-700 bg-gray-800/50 text-center">
              <CardContent className="p-8">
                <Flame className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">56,580</div>
                <div className="text-gray-400">Wildfires in 2023 (US)</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50 text-center">
              <CardContent className="p-8">
                <Trees className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">2.7M</div>
                <div className="text-gray-400">Acres Destroyed</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50 text-center">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">$893B</div>
                <div className="text-gray-400">Annual Global Losses</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50 text-center">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">+7%</div>
                <div className="text-gray-400">Increase in Heart/Lung Disease</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Rapid Detection & Live Streaming Saves Lives</h2>
          <p className="text-xl text-gray-300 mb-8">
            Every minute counts in wildfire response. RangerEye's autonomous detection system 
            can identify and live stream fires within 30 minutes, dramatically reducing the devastating impacts 
            you've witnessed in this simulation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              <Clock className="w-5 h-5 mr-2" />
              Learn About Our Solution
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 px-8 py-3">
              <AlertTriangle className="w-5 h-5 mr-2" />
              View Technical Specs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}