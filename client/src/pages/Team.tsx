import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import onatImage from "@assets/Onat.jpg.jpeg";
import johnImage from "@assets/Munday.jpg.jpeg";
import manuelImage from "@assets/Manuel.jpeg";
import mitchellImage from "@assets/Lacle.jpg.jpeg";
import ishabenImage from "@assets/Ishaben.png";
import ottoImage from "@assets/Otto.jpg.jpeg";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
  linkedin?: string;
}

export default function Team() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Onat D. Cakici",
      role: "Project Manager",
      specialty: "Project Management, Mechanical Design, Propulsion, Software, Electronics, 3D Printing",
      imageUrl: onatImage,
      linkedin: "https://www.linkedin.com/in/cakici/"
    },
    {
      id: 2,
      name: "John Munday",
      role: "Systems Engineer",
      specialty: "Systems Integration, Mechanical Design, 3D Printing, Software, CAD",
      imageUrl: johnImage,
      linkedin: "https://www.linkedin.com/in/john-munday-23a75a227"
    },
    {
      id: 3,
      name: "Manuel Salvador Villamor",
      role: "Aerodynamics Lead",
      specialty: "Aerodynamics, Electronics, Avionics, CFD Analysis",
      imageUrl: manuelImage
    },
    {
      id: 4,
      name: "Mitchell Lacle",
      role: "Controls Lead",
      specialty: "Flight Controls, Aerodynamics, Avionics, Software, CFD Analysis",
      imageUrl: mitchellImage,
      linkedin: "https://www.linkedin.com/in/mitchell-lacle/"
    },
    {
      id: 5,
      name: "Yuto Imai",
      role: "Aerodynamics",
      specialty: "CFD Analysis, Aerodynamics",
      imageUrl: ""
    },
    {
      id: 6,
      name: "Ishaben Trada",
      role: "Structures Team",
      specialty: "Materials Engineering",
      imageUrl: ishabenImage
    },
    {
      id: 7,
      name: "Abdulrahman Almutairi",
      role: "Structures Team",
      specialty: "Mechanical Design",
      imageUrl: ""
    },
    {
      id: 8,
      name: "Abdullah Alaskar",
      role: "Structures Team",
      specialty: "Manufacturing",
      imageUrl: ""
    },
    {
      id: 9,
      name: "Otto Dorschner",
      role: "Structures Team",
      specialty: "Structural Engineering",
      imageUrl: ottoImage
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Team Members */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Team</h2>
            <p className="text-lg sm:text-xl text-gray-400">
              RangerEye is a Senior Design team at Florida Institute of Technology. We aim to make significant impact on wildfire response by furthering autonomous detection and monitoring technology. Our team comprises individuals from various backgrounds with diverse multidisciplinary strengths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors group">
                <CardContent className="p-6">
                  <div className="text-center">
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl}
                        alt={`${member.name}, ${member.role} at Florida Institute of Technology Senior Design Team developing RangerEye autonomous VTOL drone for wildfire detection`}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-600 group-hover:border-white transition-colors"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-800 border-2 border-gray-600 group-hover:border-white transition-colors flex items-center justify-center">
                        <span className="text-gray-400 text-2xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                    <div className="text-gray-300 font-medium mb-2">{member.role}</div>
                    <div className="mb-6 flex flex-wrap gap-1 justify-center">
                      {member.specialty.split(', ').map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center h-8 items-center">
                      {member.linkedin ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="w-8 h-8 p-0 hover:bg-blue-500/10 hover:text-blue-500"
                          onClick={() => window.open(member.linkedin, '_blank')}
                        >
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      ) : (
                        <div className="w-8 h-8"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
