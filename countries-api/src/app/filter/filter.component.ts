import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { AsyncPipe } from "@angular/common"
import { CountryService } from "@shared/services"
import { Region } from "@shared/models"
import { fadeInAnimation } from "./fade"
import { OutsideClickDirective } from "./outside-click.directive"

@Component({
  selector: "app-filter",
  standalone: true,
  imports: [AsyncPipe, OutsideClickDirective],
  animations: [fadeInAnimation],
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private countryService = inject(CountryService)
  showRegions = false
  regions = Object.values(Region)
  currentSearch$ = this.countryService.currentSearch$
  currentRegion$ = this.countryService.currentRegion$

  onInput(e: Event) {
    const text = (e.target as HTMLInputElement).value
    this.countryService.changeSearch(text.toLowerCase())
  }

  filterByRegion(region: string) {
    this.countryService.changeRegion(region)
  }

  clearSearch() {
    this.countryService.changeSearch("")
  }

  clearRegion() {
    this.countryService.changeRegion("")
  }
}
