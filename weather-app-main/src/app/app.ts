import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Header } from './header/header';
import { SearchBar } from './search-bar/search-bar';
import { HourlyForecast } from './hourly-forecast/hourly-forecast';
import { DailyForecast } from './daily-forecast/daily-forecast';
import { WeatherStats } from './weather-stats/weather-stats';
import { GeneralInfo } from './general-info/general-info';

@Component({
  selector: 'app-root',
  imports: [Header, SearchBar, HourlyForecast, DailyForecast, WeatherStats, GeneralInfo],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
