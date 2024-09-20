import { ChangeDetectionStrategy, Component } from "@angular/core"

import { RouterLink } from "@angular/router"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  toggleTheme() {
    document.body.classList.toggle("light")
  }
}
