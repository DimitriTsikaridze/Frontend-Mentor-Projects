import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { Header } from './header/header';
import { SearchBar } from './search-bar/search-bar';
import { HourlyForecast } from './hourly-forecast/hourly-forecast';
import { DailyForecast } from './daily-forecast/daily-forecast';
import { WeatherStats } from './weather-stats/weather-stats';
import { GeneralInfo } from './general-info/general-info';
import { Forecast } from './forecast';
import { HttpParams, httpResource } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import * as z from 'zod';

const LocationsSchema = z
  .object({
    generationtime_ms: z.number(),
    results: z.array(
      z.object({
        name: z.string(),
        country: z.string()
      })
    )
  })
  .transform((data) => data.results);

export type Locations = z.infer<typeof LocationsSchema>;

@Component({
  selector: 'app-root',
  imports: [Header, SearchBar, HourlyForecast, DailyForecast, WeatherStats, GeneralInfo],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly #url =
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto';
  weatherForecast = httpResource<Forecast>(() => this.#url);
  query = signal<string>('berlin');
  debouncedQuery = toSignal(toObservable(this.query).pipe(debounceTime(300)));

  locations = httpResource(
    () => {
      if (!this.debouncedQuery()) return undefined;
      return {
        url: `https://geocoding-api.open-meteo.com/v1/search/`,
        params: new HttpParams().set('name', this.debouncedQuery()!)
      };
    },
    {
      parse: LocationsSchema.parse
    }
  );
}
