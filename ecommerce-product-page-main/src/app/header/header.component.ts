import { ChangeDetectionStrategy, Component, signal } from "@angular/core"
import { YourCartComponent } from "../your-cart/your-cart.component"
import { animate, style, transition, trigger } from "@angular/animations"
import { HamburgerMenuComponent } from "./hamburger-menu/hamburger-menu.component"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [YourCartComponent, HamburgerMenuComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0 }), // start state
        animate("200ms ease-in", style({ opacity: 1 })), // end state
      ]),
      transition(":leave", [
        animate("200ms ease-out", style({ opacity: 0 })), // end state
      ]),
    ]),
  ],
})
export class HeaderComponent {
  showYourCart = signal(false)

  toggleYourCart() {
    this.showYourCart.set(!this.showYourCart())
  }
}
