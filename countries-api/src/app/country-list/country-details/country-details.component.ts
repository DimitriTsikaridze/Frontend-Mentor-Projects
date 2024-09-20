import { Location } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core"
import { RouterLink } from "@angular/router"
import { CountryWithBorders } from "@shared/resolvers/country-details.resolver"

@Component({
  selector: "app-country-details",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./country-details.component.html",
  styleUrls: ["./country-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent {
  location = inject(Location)
  countryDetailsResolver = input.required<CountryWithBorders>()
}
