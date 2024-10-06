import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-your-cart',
  standalone: true,
  imports: [],
  templateUrl: './your-cart.component.html',
  styleUrl: './your-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourCartComponent {

}
