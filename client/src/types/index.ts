export interface FireAlert {
  id: number;
  latitude: number;
  longitude: number;
  brightness?: number;
  confidence?: number;
  frp?: number;
  satellite?: string;
  instrument?: string;
  acqDate: string;
  acqTime?: string;
  daynight?: string;
  type?: string;
  processed?: boolean;
  createdAt?: string;
}

export interface SystemStats {
  activeDrones: number;
  areaMonitored: number;
  firesDetected: number;
  responseTime: number;
  activeAlerts: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  interest?: string;
  message: string;
}

export interface ProtectedReport {
  id: number;
  title: string;
  description: string;
  downloadUrl: string;
  createdAt: string;
}

export interface ProtectedVideo {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
}

export interface RealTimeAnalytics {
  activeAlerts: FireAlert[];
  systemStatus: {
    dronesActive: number;
    totalDrones: number;
    coverageArea: number;
    detectionRate: number;
    averageResponseTime: number;
  };
  environmentalData: {
    windSpeed: number;
    windDirection: string;
    humidity: number;
    temperature: number;
  };
}
