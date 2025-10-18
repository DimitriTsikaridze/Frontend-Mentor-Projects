import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Forecast } from '../forecast';
import { DatePipe } from '@angular/common';
import { WeatherImage } from '../weather-image/weather-image';

@Component({
  selector: 'app-hourly-forecast',
  imports: [DatePipe, WeatherImage],
  templateUrl: './hourly-forecast.html',
  host: { class: 'rounded-2xl bg-neutral-800 p-4' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourlyForecast {
  hourlyForecast = input.required<Forecast>();
}
