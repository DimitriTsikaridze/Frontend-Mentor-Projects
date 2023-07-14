import { Routes } from "@angular/router"
import { CountryDetailsComponent } from "./country-list/country-details/country-details.component"
import { CountryListComponent } from "./country-list/country-list.component"
import { countryNameResolver } from "@shared/resolvers"

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
  {
    path: "**",
    redirectTo: "/",
  },
]
