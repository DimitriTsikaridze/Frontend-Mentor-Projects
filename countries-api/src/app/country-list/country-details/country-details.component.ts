import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { CountryService } from "src/app/services/country.service"
import { Observable } from "rxjs"
import { Country } from "src/app/models/country"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-country-details",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./country-details.component.html",
  styleUrls: ["./country-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent {
  private countryService = inject(CountryService)

  @Input() countryName: string

  country$: Observable<Country>

  ngOnInit() {
    this.country$ = this.countryService.getCountry(this.countryName)
  }
}
