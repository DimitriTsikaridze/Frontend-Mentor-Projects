import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderComponent } from "./header/header.component"
import { FilterComponent } from "./filter/filter.component"
import { CountryListComponent } from "./country-list/country-list.component"

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FilterComponent,
    CountryListComponent,
  ],
})
export class AppComponent {}
