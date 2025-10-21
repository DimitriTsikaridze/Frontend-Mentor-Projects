import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [ReactiveFormsModule],
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

  unitForm = new FormGroup({
    Temperature: new FormControl('Celsius (°C)'),
    'Wind Speed': new FormControl('km/h'),
    Precipitation: new FormControl('Millimeters (mm)')
  });

  toggleUnits() {
    this.isImperial.set(!this.isImperial());
    this.unitForm.setValue({
      Temperature: this.isImperial() ? 'Fahrenheit (°F)' : 'Celsius (°C)',
      'Wind Speed': this.isImperial() ? 'mph' : 'km/h',
      Precipitation: this.isImperial() ? 'Inches (in)' : 'Millimeters (mm)'
    });
  }
}
