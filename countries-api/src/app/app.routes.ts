import { Routes } from "@angular/router"
import { CountryDetailsComponent } from "./country-list/country-details/country-details.component"
import { CountryListComponent } from "./country-list/country-list.component"
import { countryNameResolver } from "./services/country-name.resolver"

export const routes: Routes = [
  {
    path: "",
    component: CountryListComponent,
    title: "Country List",
  },

  {
    path: ":countryName",
    component: CountryDetailsComponent,
    title: countryNameResolver,
  },
]
