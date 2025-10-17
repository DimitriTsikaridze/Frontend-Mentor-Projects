import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('weather-app-main');
}
