import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import { CountryService } from "@shared/services"
import { combineLatest } from "rxjs"
import { map, switchMap } from "rxjs/operators"
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

  countries$ = combineLatest([
    this.countryService.currentSearch$,
    this.countryService.currentRegion$,
  ]).pipe(
    switchMap(([term, region]) =>
      this.countryService.getCountries().pipe(
        map((countries) => {
          const filteredByTerm = countries.filter((c) =>
            c.name.toLowerCase().includes(term)
          )

          if (region) {
            return filteredByTerm.filter((c) => c.region === region)
          }

          return filteredByTerm
        })
      )
    )
  )
}
