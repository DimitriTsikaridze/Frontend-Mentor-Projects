import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenMeteo {
  private readonly url =
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto';
  weatherForecast = httpResource<Forecast>(() => this.url);
}

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
  time: Date[];
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
