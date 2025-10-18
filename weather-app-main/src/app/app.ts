import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  stats = signal<{ title: string; value: string }[]>([
    { title: 'Feels Like', value: '18 °' },
    { title: 'Humidity', value: '46%' },
    { title: 'Wind', value: '144 km/h' },
    { title: 'Precipitation', value: '0 mm' }
  ]);

  dailyForecast = signal<{ day: string; maxTemp: string; minTemp: string; image: string }[]>([
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' },
    { image: '/public/images/icon-overcast.webp', day: 'Tue', minTemp: '14°', maxTemp: '20°' }
  ]);

  hourlyForecast = signal<{ image: string; hour: string; temp: string }[]>([
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
