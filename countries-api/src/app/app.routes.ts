import { ActivatedRouteSnapshot, Routes } from "@angular/router"
import { CountryDetailsComponent } from "./country-list/country-details/country-details.component"
import { CountryListComponent } from "./country-list/country-list.component"
import { countryDetailsResolver } from "@shared/resolvers/country-details.resolver"

export const routes: Routes = [
  {
    path: "",
    component: CountryListComponent,
    title: "Country List",
  },

  {
    path: ":countryName",
    component: CountryDetailsComponent,
    title: (route: ActivatedRouteSnapshot) => route.params["countryName"],
    resolve: { countryDetailsResolver },
  },
  {
    path: "**",
    redirectTo: "/",
  },
]
