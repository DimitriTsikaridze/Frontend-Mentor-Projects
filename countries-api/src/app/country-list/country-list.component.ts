import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule, NgOptimizedImage } from "@angular/common"
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

  countries$ = this.countryService.countries$
}
