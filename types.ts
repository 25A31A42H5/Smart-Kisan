
export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  place?: string;
  mandal?: string;
  district?: string;
  language?: string;
}

export interface MandiEntry {
  location: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
}

export interface MarketComparison {
  crop: string;
  prices: MandiEntry[];
  forecast?: string;
}

export interface AgriNews {
  title: string;
  summary: string;
  url: string;
  source: string;
  isAlert?: boolean;
  isTransformation?: boolean;
}

export interface AgriMessage {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
}

export interface AgriAuthority {
  name: string;
  role: string;
  contact: string;
  office: string;
}

export interface CropRecommendation {
  crop: string;
  suitability: number;
  reason: string;
  expectedROI: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export interface WeatherDay {
  day: string;
  high: string;
  low: string;
  condition: string;
  icon: string;
}

export interface LocalAgriData {
  soilPH: string;
  soilTypes: string[];
  climateTrend: string;
  waterAvailability: string;
  weather: string;
  humidity?: string;
  windSpeed?: string;
  forecast?: WeatherDay[];
  agriAlert?: string;
}
