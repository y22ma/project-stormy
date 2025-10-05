export interface HourlyData {
  time: string; // "HH:00" format
  temperature: number;
  condition: string;
}

export interface CurrentWeather {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  hourly?: HourlyData[];
}

export interface WeatherApiResponse {
  currentWeather: CurrentWeather;
  forecast: ForecastDay[];
}

export type Theme = 'light' | 'dark' | 'storm' | 'sunset' | 'forest' | 'ocean' | 'sakura' | 'synthwave' | 'mono';