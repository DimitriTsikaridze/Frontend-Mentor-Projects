import { ChangeDetectionStrategy, Component } from "@angular/core";
import { YourCartComponent } from "../your-cart/your-cart.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [YourCartComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
