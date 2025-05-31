import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin } from "lucide-react";
import locationImage from "@assets/IMG_8234_1_Harris-Student-Design-Center-scaled.jpg";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black pt-16 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        {/* Technical Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
        
        {/* Diagonal Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-2"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform -rotate-2"></div>
        
        {/* Corner Elements */}
        <div className="absolute top-8 left-8 w-16 h-16">
          <div className="absolute top-0 left-0 w-4 h-px bg-white/40"></div>
          <div className="absolute top-0 left-0 w-px h-4 bg-white/40"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-4 h-px bg-white/40"></div>
          <div className="absolute bottom-0 right-0 w-px h-4 bg-white/40"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-black relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative inline-block">
            {/* Corner Brackets */}
            <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 border-l border-t border-white/40"></div>
            <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 border-r border-t border-white/40"></div>
            <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 border-l border-b border-white/40"></div>
            <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 border-r border-b border-white/40"></div>
            
            <Badge variant="outline" className="mb-4 sm:mb-6 font-mono border-white/30 text-white/60 bg-black/50">
              CONTACT
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 text-white tracking-[0.1em] sm:tracking-[0.2em]" style={{ fontFamily: 'Arial, sans-serif' }}>
            RANGEREYE.CONTACT
          </h1>
          
          {/* Geometric Divider */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-6 h-px bg-white/60"></div>
            <div className="w-2 h-2 bg-white transform rotate-45"></div>
            <div className="w-16 h-px bg-white/60"></div>
            <div className="w-2 h-2 bg-white transform rotate-45"></div>
            <div className="w-6 h-px bg-white/60"></div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 sm:py-20 bg-black relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Location Image with Creative Frame */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-white/5 transform skew-y-2"></div>
              <div className="relative">
                <img 
                  src={locationImage}
                  alt="Harris Student Design Center - Florida Institute of Technology" 
                  className="w-full object-cover h-96 border border-white/20"
                />
                {/* Image Overlay Data */}
                <div className="absolute bottom-4 left-4 bg-black/80 border border-white/20 p-3">
                  <p className="text-xs text-white/60 tracking-wider mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                    FACILITY.DESIGNATION
                  </p>
                  <p className="text-white font-mono text-sm">HARRIS.DESIGN.CENTER</p>
                </div>
                
                {/* Technical Corner Markers */}
                <div className="absolute top-2 left-2 w-4 h-4">
                  <div className="absolute top-0 left-0 w-2 h-px bg-white/60"></div>
                  <div className="absolute top-0 left-0 w-px h-2 bg-white/60"></div>
                </div>
                <div className="absolute top-2 right-2 w-4 h-4">
                  <div className="absolute top-0 right-0 w-2 h-px bg-white/60"></div>
                  <div className="absolute top-0 right-0 w-px h-2 bg-white/60"></div>
                </div>
              </div>
            </div>

            {/* Contact Details with Enhanced Design */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-white/5 transform -skew-y-2"></div>
              
              <Card className="relative bg-black/80 border border-white/20">
                <CardContent className="p-10">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xs text-white/60 tracking-[0.3em]" style={{ fontFamily: 'Arial, sans-serif' }}>
                      CONTACT.INFORMATION
                    </h3>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white animate-pulse"></div>
                      <div className="w-2 h-2 bg-white/60"></div>
                      <div className="w-2 h-2 bg-white/30"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    {/* Email Section */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
                      <div className="flex items-center space-x-6">
                        <div className="w-10 h-10 border border-white/40 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white/80" />
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-2 tracking-[0.2em]" style={{ fontFamily: 'Arial, sans-serif' }}>
                            EMAIL
                          </p>
                          <div className="flex items-center">
                            <div className="w-12 h-px bg-white/20 mr-3"></div>
                            <p className="text-white font-mono text-lg">contact@rangereye.tech</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
                      <div className="flex items-start space-x-6">
                        <div className="w-10 h-10 border border-white/40 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white/80" />
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-3 tracking-[0.2em]" style={{ fontFamily: 'Arial, sans-serif' }}>
                            ADDRESS
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-12 h-px bg-white/20 mr-3"></div>
                              <p className="text-white font-mono">Harris Student Design Center</p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-12 h-px bg-white/20 mr-3"></div>
                              <p className="text-white font-mono">Florida Institute of Technology</p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-12 h-px bg-white/20 mr-3"></div>
                              <p className="text-white font-mono">Melbourne, FL 32901</p>
                            </div>
                          </div>
                        </div>
                      </div>
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