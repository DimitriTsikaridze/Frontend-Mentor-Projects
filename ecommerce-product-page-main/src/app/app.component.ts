import { Component, ChangeDetectionStrategy } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { YourCartComponent } from "./your-cart/your-cart.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, YourCartComponent],
})
export class AppComponent {}
