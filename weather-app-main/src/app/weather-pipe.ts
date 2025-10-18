import { Pipe, PipeTransform } from '@angular/core';
import { WEATHER_ICON_MAP } from './weather-icon-map';

@Pipe({
  name: 'weather'
})
export class WeatherPipe implements PipeTransform {
  transform(code: number, iconName?: boolean): string {
    if (iconName) {
      return WEATHER_ICON_MAP[code].split('icon-')[1].split('.')[0];
    }
    return '/public/images/' + (WEATHER_ICON_MAP[code] ?? 'icon-sunny.webp');
  }
}
