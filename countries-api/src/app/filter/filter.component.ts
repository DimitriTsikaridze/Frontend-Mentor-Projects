import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CountryService } from "../services/country.service"

@Component({
  selector: "app-filter",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private countryService = inject(CountryService)

  currentSearch$ = this.countryService.currentSearch$

  onInput(e: Event) {
    const text = (e.target as HTMLInputElement).value
    this.countryService.changeSearch(text.toLowerCase())
  }
}
