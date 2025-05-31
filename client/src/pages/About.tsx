import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { updatePageSEO, pagesSEO } from '@/lib/seo';
import { 
  Shield, 
  Target, 
  Zap, 
  Eye, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
// Image paths for prototype gallery - using direct paths
const actualPrototypeImage = "/attached_assets/actual prototype.JPG";
const quadcopterImage = "/attached_assets/quadcopter.JPG";
const testingImage = "/attached_assets/testing.jpg";
const renderViewImage = "/attached_assets/render view.png";
const testingFoamImage = "/attached_assets/testing foam model.JPG";

export default function About() {
  useEffect(() => {
    // Update SEO for about page
    updatePageSEO(pagesSEO.about);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-mono border-red-500 text-red-400 bg-red-500/10">
              MISSION CRITICAL
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              About RANGEREYE
            </h1>
          </div>
        </div>
      </section>

      {/* Mission Statement with Text */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">Our Mission</h2>
              <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                <p>
                  Wildfires are becoming more frequent and destructive, threatening communities, wildlife, and natural resources. Fast, reliable detection is critical—but existing solutions fall short, especially in remote or high-risk areas.
                </p>
                <p>
                  Ranger Eye is an autonomous wildfire detection system built to change that. Designed by a dedicated team of engineers, Ranger Eye combines advanced vertical takeoff and landing (VTOL) drone technology, state-of-the-art thermal and visual sensors, and intelligent automation to provide continuous monitoring where it's needed most.
                </p>
                <p>
                  Unlike conventional drones, Ranger Eye operates independently, launching, patrolling, detecting, and recharging itself with no need for manual intervention. Its robust, weather-resistant design and automated charging station enable true off-grid operation, ensuring the system is always ready to respond.
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 my-8">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Ranger Eye's mission is simple:</h3>
                  <p className="text-white font-medium">
                    Detect wildfires early. Enable faster response. Minimize loss. Protect lives, property, and the environment.
                  </p>
                </div>
                <p>
                  With Ranger Eye, park services, fire management teams, and emergency responders gain a powerful new tool for proactive wildfire defense—one that brings cutting-edge engineering to the front lines of environmental protection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Prototype Development Gallery */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500"></div>
              <h2 className="text-5xl font-bold text-white tracking-wider">
                DEVELOPMENT
                <span className="block text-2xl text-gray-400 mt-2 font-mono">— FIELD TO REALITY —</span>
              </h2>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-red-500"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Engineering excellence through iterative design, real-world testing, and strategic partnerships
            </p>
          </div>
          
          {/* Fire Services Collaboration - Made Larger */}
          <div className="mb-16">
            <Card className="border-gray-800 bg-gray-900/30 overflow-hidden backdrop-blur-sm">
              <div className="relative">
                <img 
                  src="/attached_assets/Image (12) copy 9.jpeg"
                  alt="RangerEye Team with Fire Services"
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #9CA3AF;">Team Collaboration</span>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-3">Fire Services Collaboration</h3>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Actual Prototype */}
            <Card className="border-gray-800 bg-gray-900/30 overflow-hidden backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/attached_assets/actual prototype.JPG"
                  alt="RangerEye 3D printed VTOL drone prototype developed by Florida Institute of Technology Senior Design team for autonomous wildfire detection"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.log('Image failed to load:', e.target.src);
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #9CA3AF;">Image Loading...</span>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-black/90 text-white px-3 py-2 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono">PROTOTYPE</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 font-mono">VTOL PROTOTYPE</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Full-scale prototype with modular wing design for extended operational range
                </p>
              </CardContent>
            </Card>

            {/* Render View */}
            <Card className="border-gray-800 bg-gray-900/30 overflow-hidden backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/attached_assets/render view.png"
                  alt="RangerEye VTOL plane CAD render view showing aerodynamic design by Florida Tech Senior Design engineering students for autonomous wildfire detection aircraft"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #9CA3AF;">Render View</span>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-black/90 text-white px-3 py-2 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono">RENDER</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 font-mono">MISSION CONFIG</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Production-ready design with integrated sensor pod and aerodynamic optimization
                </p>
              </CardContent>
            </Card>

            {/* Field Testing */}
            <Card className="border-gray-800 bg-gray-900/30 overflow-hidden backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/attached_assets/testing.jpg"
                  alt="RangerEye VTOL aircraft field testing by Onat D. Cakici and Florida Tech aerospace engineering team - 3D printed drone flight testing for wildfire detection system"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #9CA3AF;">Field Testing</span>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-black/90 text-white px-3 py-2 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono">TESTING</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 font-mono">FIELD TESTING</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Real-world validation of autonomous operations and sensor performance
                </p>
              </CardContent>
            </Card>

            {/* Quadcopter Development */}
            <Card className="border-gray-800 bg-gray-900/30 overflow-hidden backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/attached_assets/quadcopter.JPG"
                  alt="RangerEye Quadcopter Development"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #9CA3AF;">Quadcopter Dev</span>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-black/90 text-white px-3 py-2 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono">DEV PLATFORM</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 font-mono">DEV PLATFORM</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Flight control systems and sensor integration development platform
                </p>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="border-red-500/30 bg-red-500/10">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">
                The Future of Wildfire Defense
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                RangerEye represents more than just technology—it's a commitment to protecting 
                what matters most. Every deployment brings us closer to a world where wildfires 
                are detected before they spread, where response teams have the time they need, 
                and where communities can rest assured that vigilant guardians watch over their homes.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-6 h-6 text-red-400" />
                <span className="text-red-400 font-mono font-bold">
                  MISSION READY • DAY OR NIGHT
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}