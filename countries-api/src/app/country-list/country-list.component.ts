import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import { switchMap, map } from "rxjs"
import { CountryService } from "@shared/services"
import { RouterLink } from "@angular/router"
import { FilterComponent } from "../filter/filter.component"

@Component({
  selector: "app-country-list",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, FilterComponent],
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  private countryService = inject(CountryService)

  countries$ = this.countryService.currentSearch$.pipe(
    switchMap((term) =>
      this.countryService
        .getCountries()
        .pipe(
          map((countries) =>
            countries.filter((c) => c.name.toLowerCase().includes(term))
          )
        )
    )
  )
}
