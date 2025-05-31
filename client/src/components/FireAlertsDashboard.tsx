import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Flame, 
  Thermometer, 
  Eye,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import type { FireAlert, SystemStats } from "@/types";

export default function FireAlertsDashboard() {
  const { data: alerts, refetch: refetchAlerts, isLoading: alertsLoading } = useQuery<FireAlert[]>({
    queryKey: ["/api/fire-alerts"],
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: stats, isLoading: statsLoading } = useQuery<SystemStats>({
    queryKey: ["/api/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getAlertPriority = (alert: FireAlert) => {
    if (!alert.confidence) return "watch";
    if (alert.confidence >= 85) return "critical";
    if (alert.confidence >= 70) return "warning";
    return "watch";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "watch": return "outline";
      default: return "outline";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins} MIN AGO`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} HR AGO`;
    return `${Math.floor(diffMins / 1440)} DAY AGO`;
  };

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              LIVE FIRE ALERTS
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-red"></div>
              <span className="text-primary font-mono text-sm tracking-wider">
                REAL-TIME
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            NASA FIRMS Integration • Global Wildfire Monitoring
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Fire Detection Map</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-mono text-muted-foreground">
                    SYSTEMS ONLINE
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => refetchAlerts()}
                    disabled={alertsLoading}
                  >
                    <RefreshCw className={`w-4 h-4 ${alertsLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Interactive map placeholder */}
                <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Satellite forest view for fire detection mapping"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 map-overlay"></div>
                  
                  {/* Fire markers based on real data */}
                  {alerts?.slice(0, 10).map((alert, index) => (
                    <div
                      key={alert.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white ${
                        getAlertPriority(alert) === 'critical' 
                          ? 'bg-red-600 animate-pulse-red' 
                          : getAlertPriority(alert) === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{
                        top: `${20 + (index * 8)}%`,
                        left: `${25 + (index * 7)}%`,
                      }}
                      title={`${alert.latitude}, ${alert.longitude} - Confidence: ${alert.confidence}%`}
                    />
                  ))}
                  
                  {/* Map controls */}
                  <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-2 space-y-2">
                    <Button variant="secondary" size="sm" className="w-8 h-8 p-0">+</Button>
                    <Button variant="secondary" size="sm" className="w-8 h-8 p-0">-</Button>
                  </div>
                  
                  {/* Last updated indicator */}
                  <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-3">
                    <p className="text-sm text-gray-300">
                      Last Updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert Feed and Statistics */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-primary" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertsLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-muted rounded-lg p-4 animate-pulse">
                          <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                          <div className="h-3 bg-muted-foreground/20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : alerts && alerts.length > 0 ? (
                    alerts.slice(0, 5).map((alert) => {
                      const priority = getAlertPriority(alert);
                      return (
                        <div 
                          key={alert.id}
                          className={`bg-muted rounded-lg p-4 border-l-4 ${
                            priority === 'critical' ? 'border-red-600' :
                            priority === 'warning' ? 'border-orange-500' : 'border-yellow-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={getPriorityColor(priority)} className="font-mono text-xs">
                              {priority.toUpperCase()}
                            </Badge>
                            <span className="text-muted-foreground text-xs font-mono">
                              {formatTime(alert.acqDate)}
                            </span>
                          </div>
                          <div className="text-sm mb-1">
                            Lat: {alert.latitude.toFixed(4)}, Lng: {alert.longitude.toFixed(4)}
                          </div>
                          {alert.confidence && (
                            <div className="text-xs text-muted-foreground">
                              Confidence: {alert.confidence}% • {alert.satellite}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Flame className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No recent fire alerts</p>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full" size="sm">
                    View All Alerts <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Statistics */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="h-4 bg-muted-foreground/20 rounded w-24"></div>
                        <div className="h-4 bg-muted-foreground/20 rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                ) : stats ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Drones Active</span>
                      <span className="text-green-500 font-mono">
                        {stats.activeDrones}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Coverage Area</span>
                      <span className="font-mono">{stats.areaMonitored} km²</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fires Detected</span>
                      <span className="font-mono">{stats.firesDetected}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="text-green-500 font-mono">
                        {stats.responseTime}min
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Unable to load system status
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
