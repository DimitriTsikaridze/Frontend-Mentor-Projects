import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SearchInputComponent } from "./search-input/search-input.component";
import { AddressInfoComponent } from "./address-info/address-info.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchInputComponent, AddressInfoComponent],
})
export class AppComponent {
  onSubmitIp(ip: string) {
    console.log(ip);
  }
}
