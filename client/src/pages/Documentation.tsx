import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  ExternalLink, 
  FileText,
  Code,
  Shield,
  AlertTriangle
} from "lucide-react";

export default function Documentation() {

  const publicDocuments = [
    {
      icon: FileText,
      title: "RangerEye Poster",
      description: "Official project poster showcasing technical specifications and mission capabilities.",
      type: "PPTX",
      size: "12.5 MB",
      downloadUrl: "/attached_assets/RangerEye (6).pptx",
      color: "text-blue-500"
    },
    {
      icon: FileText,
      title: "Mission Flyer",
      description: "Single-page overview highlighting key features and mission-ready capabilities.",
      type: "PDF",
      size: "2.1 MB", 
      downloadUrl: "/attached_assets/flyer.pdf",
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 font-mono">
              COMPREHENSIVE RESOURCES
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Technical <span className="text-primary">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Complete documentation, technical specifications, and integration guides for 
              implementing and operating Ranger Eye wildfire detection systems.
            </p>
          </div>
        </div>
      </section>

      {/* Public Documentation */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Public Resources</h2>
            <p className="text-xl text-muted-foreground">
              Freely available documentation and guides
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {publicDocuments.map((doc, index) => (
              <Card key={index} className="border-border hover:border-primary transition-colors group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-card rounded-lg flex items-center justify-center mb-4 border border-border group-hover:border-primary transition-colors`}>
                    <doc.icon className={`w-6 h-6 ${doc.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{doc.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => window.open(doc.downloadUrl, '_blank')}
                  >
                    {doc.type === "Online" ? (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Online
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* API Documentation */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">API Documentation</h2>
            <p className="text-xl text-muted-foreground">
              Integration endpoints and developer resources
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span>Fire Alerts API</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access real-time fire alert data from NASA FIRMS integration.
                </p>
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <code className="text-sm font-mono">
                    GET /api/fire-alerts
                  </code>
                </div>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Authentication API</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Secure access controls and user management endpoints.
                </p>
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <code className="text-sm font-mono">
                    POST /api/auth/login
                  </code>
                </div>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Emergency API</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Integration with emergency response systems and alerts.
                </p>
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <code className="text-sm font-mono">
                    POST /api/emergency/alert
                  </code>
                </div>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Access comprehensive documentation and integration guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Quick Start Guide
            </Button>
            <Button variant="outline" size="lg">
              <ExternalLink className="w-5 h-5 mr-2" />
              View Technical Specs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
