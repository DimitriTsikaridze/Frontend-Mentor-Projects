import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="flex justify-between bg-neutral-700">
      <img width="179" height="41" ngSrc="../images/logo.svg" priority alt="Logo" />
      <button>
        <img width="22" height="22" ngSrc="../images/icon-sun.svg" alt="Light Mode" />
      </button>
      <!-- <button >
        <img width="22" height="22" ngSrc="images/icon-moon.svg" alt="Dark Mode" />
      </button> -->
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
