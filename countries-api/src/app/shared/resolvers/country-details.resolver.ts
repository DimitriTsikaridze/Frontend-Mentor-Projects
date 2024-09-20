import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { Country } from "@shared/models"
import { CountryService } from "@shared/services"
import { map, switchMap } from "rxjs"

export interface CountryWithBorders extends Country {
  borderCountries: string[]
}

export const countryDetailsResolver: ResolveFn<CountryWithBorders> = (
  route,
  state
) => {
  const countryService = inject(CountryService)
  const countryName = route.params["countryName"]

  const f = countryService.getCountry(countryName).pipe(
    switchMap((country) =>
      countryService.getCountries().pipe(
        map((countries) => ({
          ...country,
          borderCountries: countries
            .filter(({ alpha3Code }) => country.borders?.includes(alpha3Code))
            .map(({ name }) => name),
        }))
      )
    )
  )
  return f
}
