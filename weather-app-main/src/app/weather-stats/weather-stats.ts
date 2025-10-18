import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-weather-stats',
  imports: [],
  templateUrl: './weather-stats.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherStats {
  stats = input<{ title: string; value: string }[]>([
    { title: 'Feels Like', value: '18 °' },
    { title: 'Humidity', value: '46%' },
    { title: 'Wind', value: '144 km/h' },
    { title: 'Precipitation', value: '0 mm' }
  ]);
}
