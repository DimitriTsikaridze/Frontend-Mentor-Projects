import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hourly-forecast',
  imports: [],
  templateUrl: './hourly-forecast.html',
  host: { class: 'rounded-2xl bg-neutral-800 p-4' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourlyForecast {
  hourlyForecast = input<{ image: string; hour: string; temp: string }[]>([
    { image: '/public/images/icon-partly-cloudy.webp', hour: '3pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '4pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '5pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '6pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '7pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '8pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '9pm', temp: '20°' },
    { image: '/public/images/icon-partly-cloudy.webp', hour: '10pm', temp: '20°' }
  ]);
}
