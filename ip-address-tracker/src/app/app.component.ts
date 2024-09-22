import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SearchInputComponent } from "./search-input/search-input.component";
import { AddressInfoComponent } from "./address-info/address-info.component";
import { IpAddressService } from "./ip-address.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchInputComponent, AddressInfoComponent],
})
export class AppComponent {
  private ipAddressService = inject(IpAddressService);
  defaultInfo = this.ipAddressService.defaultInfo;

  onSubmitIp(ip: string) {
    console.log(ip);
  }
}
