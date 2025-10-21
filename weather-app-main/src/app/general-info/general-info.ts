import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeatherImage } from '../weather-image/weather-image';
import { Forecast } from '../forecast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general-info',
  imports: [WeatherImage, DatePipe],
  templateUrl: './general-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralInfo {
  forecast = input.required<Forecast>();
  location = input.required<{ name: string; country: string }>();
}
