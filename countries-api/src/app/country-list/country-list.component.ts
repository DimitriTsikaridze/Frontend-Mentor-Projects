import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { AsyncPipe, NgOptimizedImage } from "@angular/common"
import { CountryService } from "@shared/services"
import { combineLatest } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import { RouterLink } from "@angular/router"
import { FilterComponent } from "../filter/filter.component"

@Component({
  selector: "app-country-list",
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink, FilterComponent],
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

          // add fetch priority option to first 5 countries
          return filteredByTerm.map((country, idx) =>
            idx < 5 ? { ...country, priority: true } : country
          )
        })
      )
    )
  )
}
