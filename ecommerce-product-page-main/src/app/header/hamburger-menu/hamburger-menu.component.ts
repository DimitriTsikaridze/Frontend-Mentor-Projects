import { ChangeDetectionStrategy, Component, signal } from "@angular/core"

@Component({
  selector: "app-hamburger-menu",
  standalone: true,
  imports: [],
  templateUrl: "./hamburger-menu.component.html",
  styleUrl: "./hamburger-menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuComponent {
  showSidebar = signal(true)
  toggleSidebar() {
    this.showSidebar.set(!this.showSidebar())
  }
}
