import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  units = signal([
    { title: 'Temperature', options: ['Celsius (°C)', 'Fahrenheit (°F)'] },
    { title: 'Wind Speed', options: ['km/h', 'mph'] },
    { title: 'Precipitation', options: ['Millimeters (mm)', 'Inches (in)'] }
  ]);

  showUnits = signal(false);
  isImperial = signal(false);
}
