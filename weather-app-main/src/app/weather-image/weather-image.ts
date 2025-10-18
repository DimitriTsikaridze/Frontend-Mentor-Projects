import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WeatherPipe } from '../weather-pipe';

@Component({
  selector: 'app-weather-image',
  imports: [WeatherPipe],
  template: ` <img width="40" [src]="src() | weather" [alt]="src() | weather: true" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherImage {
  src = input.required<number>();
}
