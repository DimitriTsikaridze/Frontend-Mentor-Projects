import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

type ButtonType = 'primary-l' | 'primary-s' | 'secondary' | 'destructive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [ngClass]="buttonClasses()">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  type = input<ButtonType>('primary-l');

  buttonClasses = computed(() => {
    const baseClasses =
      'w-[200px] rounded-full transition-colors duration-200 text-white';
    const sizeClasses = this.type().includes('s')
      ? 'text-body-m p-2'
      : 'text-body-l p-4';

    const typeClasses = {
      'primary-l': 'bg-primary-100  p-0 hover:bg-primary-200',
      'primary-s': 'bg-primary-100  hover:bg-primary-200',
      secondary: 'bg-secondary-600 text-primary-100 hover:bg-secondary-500 ',
      destructive: 'bg-accent-100  hover:bg-accent-200',
    };

    return `${baseClasses} ${sizeClasses} ${typeClasses[this.type()]}`;
  });
}
