import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from "@angular/core";
import { SearchInputComponent } from "./search-input/search-input.component";
import { AddressInfoComponent } from "./address-info/address-info.component";
import { IpAddressService } from "./ip-address.service";
import { MapComponent } from "./map/map.component";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchInputComponent, AddressInfoComponent, MapComponent],
})
export class AppComponent {
  private ipAddressService = inject(IpAddressService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  defaultInfo = this.ipAddressService.defaultInfo;
  coordinates = {
    lat: this.defaultInfo.location.lat,
    lng: this.defaultInfo.location.lng,
  };

  onSubmitIp(ip: string) {
    console.log(ip);
  }
}
