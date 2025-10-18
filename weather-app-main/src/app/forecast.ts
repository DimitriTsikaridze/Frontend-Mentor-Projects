export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  apparent_temperature: string;
  precipitation: string;
  wind_speed_10m: string;
  relative_humidity_2m: string;
}

export interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weathercode: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weathercode: string;
}
