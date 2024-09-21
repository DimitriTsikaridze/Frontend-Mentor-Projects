import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor() {}

  nextTheme: "dark" | "light" = "dark"

  ngOnInit(): void {}

  toggleTheme() {
    this.nextTheme = this.nextTheme === "dark" ? "light" : "dark"
    document.body.classList.toggle("dark")
  }
}
