import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Extension } from './app';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-extension-item',
  imports: [NgOptimizedImage],
  styles: `
  .extension {
     transition-property: opacity, transform;
  transition-duration: 700ms;
  transition-delay: calc(50ms * var(--index));
  @starting-style {
    opacity: 0;
    transform: translateX(10px) scale(0.96)
  }
  }
  `,
  template: `
    <div class="extension" style="--index: {{ index() }}">
      <div class="flex gap-2 items-center">
        <img width="50" height="50" [ngSrc]="extension().logo" [alt]="extension().name" />
        <div>
          <p class="font-bold">{{ extension().name }}</p>
          <p>{{ extension().description }}</p>
        </div>
      </div>

      <div class="flex justify-between">
        <button (click)="remove.emit(extension().name)">Remove</button>
        <input
          (change)="toggle.emit({ name: extension().name, isActive: $any($event.target).checked })"
          [checked]="extension().isActive"
          type="checkbox"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtensionItem {
  index = input.required<number>();
  extension = input.required<Extension>();
  remove = output<string>();
  toggle = output<{ name: string; isActive: boolean }>();
}
