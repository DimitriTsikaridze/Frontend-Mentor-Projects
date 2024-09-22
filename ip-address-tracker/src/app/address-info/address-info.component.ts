import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressInfoComponent {

}
