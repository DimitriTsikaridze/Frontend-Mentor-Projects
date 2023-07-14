import { Routes } from "@angular/router"
import { CountryDetailsComponent } from "./country-list/country-details/country-details.component"
import { CountryListComponent } from "./country-list/country-list.component"

export const routes: Routes = [
  {
    path: "",
    component: CountryListComponent,
  },

  {
    path: ":countryName",
    component: CountryDetailsComponent,
  },
]
