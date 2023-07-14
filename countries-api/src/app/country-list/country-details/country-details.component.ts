import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  OnInit,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { Observable } from "rxjs"
import { Country } from "@shared/models"
import { CountryService } from "@shared/services"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-country-details",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./country-details.component.html",
  styleUrls: ["./country-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent implements OnInit {
  private countryService = inject(CountryService)

  @Input() countryName: string

  country$: Observable<Country>

  ngOnInit(): void {
    this.country$ = this.countryService.getCountry(this.countryName)
  }
}
