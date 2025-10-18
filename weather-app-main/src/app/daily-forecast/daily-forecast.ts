import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Forecast } from '../forecast';
import { DatePipe } from '@angular/common';
import { WeatherImage } from '../weather-image/weather-image';

@Component({
  selector: 'app-daily-forecast',
  imports: [DatePipe, WeatherImage],
  templateUrl: './daily-forecast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyForecast {
  dailyForecast = input.required<Forecast>();
}
