import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
import { switchMap, map } from "rxjs"
import { CountryService } from "../services/country.service"

@Component({
  selector: "app-country-list",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  private countryService = inject(CountryService)

  countries$ = this.countryService.currentSearch$.pipe(
    switchMap((term) =>
      this.countryService.countries$.pipe(
        map((countries) =>
          countries.filter((c) => c.name.toLowerCase().includes(term))
        )
      )
    )
  )
}
