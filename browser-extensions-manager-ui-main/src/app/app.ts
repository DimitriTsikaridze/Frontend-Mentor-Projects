import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <h1 class="text-3xl text-green-500">Welcome to {{ title }}!</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'browser-extension-manager';
}
