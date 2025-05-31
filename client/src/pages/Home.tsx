import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Shield, Eye, Activity, Zap, Globe, Users } from "lucide-react";
import manufacturingVideoPath from "@assets/19378586-hd_1920_1080_25fps.mp4";
import printerVideoPath from "@assets/okherewego2.mp4";
const prototypeImage = "/attached_assets/actual prototype.JPG";
const floridaTechSeal = "/attached_assets/Florida_Institute_of_Technology_(seal).svg-1.png";

interface Stats {
  activeDrones: number;
  areaMonitored: number;
  firesDetected: number;
  responseTime: number;
}

export default function Home() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen bg-black text-white font-mono">
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
            <source src={manufacturingVideoPath} type="video/mp4" />
            <source src={printerVideoPath} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>
        
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 z-10 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Mission Status */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-4 bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg px-6 py-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm tracking-wider">MISSION_READY</span>
                <div className="w-px h-4 bg-cyan-500/50"></div>
                <span className="text-cyan-400 font-mono text-sm tracking-wider">DAY_OR_NIGHT</span>
              </div>
            </div>
            
            {/* Main Title */}
            <div className="mb-12">
              <h1 className="text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-white mb-4 tracking-tight">
                RANGER
              </h1>
              <h1 className="text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 tracking-tight">
                EYE
              </h1>
              <div className="mt-6 h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
            
            {/* Mission Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-2xl text-white/90 mb-8 font-mono leading-relaxed">
                Launch, fly, land, and recharge with minimal human intervention.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-white/80 font-mono text-sm">
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
                  <h3 className="text-cyan-400 font-bold mb-3">AUTONOMOUS DETECTION</h3>
                  <p>Designed to detect fires early in remote and challenging environments with minimal human oversight.</p>
                </div>
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
                  <h3 className="text-cyan-400 font-bold mb-3">RAPID RESPONSE</h3>
                  <p>Enables faster response, ensuring fires do not spread beyond containment and ultimately saves lives.</p>
                </div>
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
                  <h3 className="text-cyan-400 font-bold mb-3">GLOBAL DEPLOYMENT</h3>
                  <p>Operates reliably in hard-to-access areas with deployment and control possible from virtually anywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live System Status */}
      <section className="py-20 bg-black border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-white/30 p-6 bg-black/80">
            <div className="mb-6">
              <Badge variant="outline" className="mb-4 font-mono border-white text-white bg-transparent">
                LIVE_SYSTEM_STATUS
              </Badge>
              <h3 className="text-xl font-bold text-white font-mono tracking-wider">
                NETWORK_OPERATIONAL
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 font-mono">
                  {stats?.activeDrones || 4}
                </div>
                <div className="text-sm text-white/70 font-mono">ACTIVE_DRONES</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 font-mono">
                  {stats?.areaMonitored || 847}
                </div>
                <div className="text-sm text-white/70 font-mono">KM²_MONITORED</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 font-mono">
                  {stats?.firesDetected || 23}
                </div>
                <div className="text-sm text-white/70 font-mono">FIRES_DETECTED</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 font-mono">
                  {stats?.responseTime || 12}
                </div>
                <div className="text-sm text-white/70 font-mono">MIN_RESPONSE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-black border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-mono border-white text-white bg-transparent">
              TECHNICAL_SPECIFICATIONS
            </Badge>
            <h2 className="text-3xl font-bold text-white font-mono tracking-wider">
              PLATFORM_CAPABILITIES
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border border-white/30 p-6 bg-black/60">
              <div className="text-2xl font-bold text-cyan-400 font-mono mb-2">2.1M</div>
              <div className="text-white/90 font-mono text-sm">WINGSPAN</div>
              <div className="text-white/60 font-mono text-xs mt-1">FIXED_WING_DESIGN</div>
            </div>
            <div className="border border-white/30 p-6 bg-black/60">
              <div className="text-2xl font-bold text-green-400 font-mono mb-2">100MIN</div>
              <div className="text-white/90 font-mono text-sm">FLIGHT_TIME</div>
              <div className="text-white/60 font-mono text-xs mt-1">CONTINUOUS_OPERATION</div>
            </div>
            <div className="border border-white/30 p-6 bg-black/60">
              <div className="text-2xl font-bold text-yellow-400 font-mono mb-2">108KM</div>
              <div className="text-white/90 font-mono text-sm">RANGE</div>
              <div className="text-white/60 font-mono text-xs mt-1">AUTONOMOUS_PATROL</div>
            </div>
            <div className="border border-white/30 p-6 bg-black/60">
              <div className="text-2xl font-bold text-red-400 font-mono mb-2">70KM/H</div>
              <div className="text-white/90 font-mono text-sm">MAX_SPEED</div>
              <div className="text-white/60 font-mono text-xs mt-1">RAPID_DEPLOYMENT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Impact */}
      <section className="py-20 bg-black border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 font-mono border-white text-white bg-transparent">
                MISSION_IMPACT
              </Badge>
              <h2 className="text-4xl font-bold text-white font-mono mb-6 tracking-wider">
                AUTONOMOUS_PROTECTION
              </h2>
              <div className="space-y-6 text-white/80 font-mono text-sm leading-relaxed">
                <p>
                  RangerEye represents the next generation of wildfire detection technology, 
                  designed for deployment in the most challenging and remote environments.
                </p>
                <p>
                  Our autonomous platform can launch, navigate, patrol, and return to base 
                  without human intervention, providing 24/7 fire detection capabilities 
                  where traditional methods fail.
                </p>
                <p>
                  With thermal imaging, real-time data transmission, and intelligent flight 
                  path optimization, RangerEye ensures early fire detection when it matters most.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-white/30 p-6 bg-black/60 text-center">
                <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white font-mono mb-2">24/7</div>
                <div className="text-white/70 font-mono text-sm">MONITORING</div>
              </div>
              <div className="border border-white/30 p-6 bg-black/60 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white font-mono mb-2">AUTO</div>
                <div className="text-white/70 font-mono text-sm">LAUNCH</div>
              </div>
              <div className="border border-white/30 p-6 bg-black/60 text-center">
                <Globe className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white font-mono mb-2">GLOBAL</div>
                <div className="text-white/70 font-mono text-sm">DEPLOYMENT</div>
              </div>
              <div className="border border-white/30 p-6 bg-black/60 text-center">
                <Users className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white font-mono mb-2">ZERO</div>
                <div className="text-white/70 font-mono text-sm">CASUALTIES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Prototype Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              First Prototype
            </h2>
            <div className="w-16 h-px bg-white/40 mx-auto"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-white/5 transform skew-y-1"></div>
            <div className="relative">
              <img 
                src={prototypeImage}
                alt="RangerEye First Prototype" 
                className="w-full h-auto object-contain rounded-lg border border-white/20"
              />
              {/* Technical Corner Markers */}
              <div className="absolute top-2 left-2 w-4 h-4">
                <div className="absolute top-0 left-0 w-2 h-px bg-white/60"></div>
                <div className="absolute top-0 left-0 w-px h-2 bg-white/60"></div>
              </div>
              <div className="absolute top-2 right-2 w-4 h-4">
                <div className="absolute top-0 right-0 w-2 h-px bg-white/60"></div>
                <div className="absolute top-0 right-0 w-px h-2 bg-white/60"></div>
              </div>
              <div className="absolute bottom-2 left-2 w-4 h-4">
                <div className="absolute bottom-0 left-0 w-2 h-px bg-white/60"></div>
                <div className="absolute bottom-0 left-0 w-px h-2 bg-white/60"></div>
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4">
                <div className="absolute bottom-0 right-0 w-2 h-px bg-white/60"></div>
                <div className="absolute bottom-0 right-0 w-px h-2 bg-white/60"></div>
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
    </div>
  );
}