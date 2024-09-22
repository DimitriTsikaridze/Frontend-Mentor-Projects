import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { IPAddressInfo } from "../ip-address.model";

@Component({
  selector: "app-address-info",
  standalone: true,
  imports: [],
  templateUrl: "./address-info.component.html",
  styleUrl: "./address-info.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent {
  info = input.required<IPAddressInfo>();
}
