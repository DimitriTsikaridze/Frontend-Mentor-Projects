import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-daily-forecast',
  imports: [],
  templateUrl: './daily-forecast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyForecast {
  dailyForecast = input<{ day: string; maxTemp: string; minTemp: string; image: string }[]>([
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' }
  ]);
}
