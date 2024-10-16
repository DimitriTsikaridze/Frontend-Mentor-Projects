import { Component, inject } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderComponent } from "./header/header.component"
import { MetaService } from "@shared/services/meta.service"

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
  private metaService = inject(MetaService)

  constructor() {
    this.metaService.generateTags({
      title: "Countries API",
      description: "Search countries, filter by region and see country details",
      image: "/assets/desktop-preview.jpg",
    })
  }
}
