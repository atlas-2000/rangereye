import { storage } from "./storage";
import type { InsertFireAlert } from "@shared/schema";

const NASA_FIRMS_API_KEY = process.env.NASA_FIRMS_API_KEY || process.env.FIRMS_API_KEY || "demo_key";
const NASA_FIRMS_BASE_URL = "https://firms.modaps.eosdis.nasa.gov/api";

interface NASAFirmsResponse {
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: number;
  frp: number;
  satellite: string;
  instrument: string;
  acq_date: string;
  acq_time: string;
  daynight: string;
  type: number;
}

export class NASAFirmsService {
  private apiKey: string;

  constructor(apiKey: string = NASA_FIRMS_API_KEY) {
    this.apiKey = apiKey;
  }

  async fetchActiveFiresGlobal(): Promise<NASAFirmsResponse[]> {
    try {
      // MODIS and VIIRS combined data for last 24 hours
      const response = await fetch(
        `${NASA_FIRMS_BASE_URL}/country/csv/${this.apiKey}/MODIS_NRT/USA/1`,
        {
          headers: {
            'User-Agent': 'RangerEye-Wildfire-Detection/1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`NASA FIRMS API error: ${response.status} ${response.statusText}`);
      }

      const csvData = await response.text();
      return this.parseCSVResponse(csvData);
    } catch (error) {
      console.error("Error fetching NASA FIRMS data:", error);
      throw error;
    }
  }

  async fetchActiveFiresByRegion(
    north: number,
    south: number,
    east: number,
    west: number
  ): Promise<NASAFirmsResponse[]> {
    try {
      const response = await fetch(
        `${NASA_FIRMS_BASE_URL}/area/csv/${this.apiKey}/MODIS_NRT/${west},${south},${east},${north}/1`,
        {
          headers: {
            'User-Agent': 'RangerEye-Wildfire-Detection/1.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`NASA FIRMS API error: ${response.status} ${response.statusText}`);
      }

      const csvData = await response.text();
      return this.parseCSVResponse(csvData);
    } catch (error) {
      console.error("Error fetching NASA FIRMS regional data:", error);
      throw error;
    }
  }

  private parseCSVResponse(csvData: string): NASAFirmsResponse[] {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const data: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        switch (header.toLowerCase()) {
          case 'latitude':
          case 'longitude':
          case 'brightness':
          case 'confidence':
          case 'frp':
            data[header.toLowerCase()] = parseFloat(value);
            break;
          case 'type':
            data[header.toLowerCase()] = parseInt(value);
            break;
          default:
            data[header.toLowerCase()] = value;
        }
      });
      
      return data as NASAFirmsResponse;
    });
  }

  async syncFireAlertsToDatabase(): Promise<number> {
    try {
      const firmsData = await this.fetchActiveFiresGlobal();
      let syncedCount = 0;

      for (const fireData of firmsData) {
        const fireAlert: InsertFireAlert = {
          latitude: fireData.latitude,
          longitude: fireData.longitude,
          brightness: fireData.brightness,
          confidence: fireData.confidence,
          frp: fireData.frp,
          satellite: fireData.satellite,
          instrument: fireData.instrument,
          acqDate: new Date(`${fireData.acq_date} ${fireData.acq_time}`),
          acqTime: fireData.acq_time,
          daynight: fireData.daynight,
          type: fireData.type === 0 ? 'wildfire' : 'other',
        };

        try {
          await storage.createFireAlert(fireAlert);
          syncedCount++;
        } catch (error) {
          // Skip duplicates or other insertion errors
          console.warn("Failed to insert fire alert:", error);
        }
      }

      return syncedCount;
    } catch (error) {
      console.error("Error syncing fire alerts:", error);
      throw error;
    }
  }
}

export const nasaFirmsService = new NASAFirmsService();
