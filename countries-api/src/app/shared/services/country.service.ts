import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Router } from "@angular/router"
import { Country } from "@shared/models"
import { BehaviorSubject, of, Observable, tap, map } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private http = inject(HttpClient)
  private searchTermSource = new BehaviorSubject("")
  private regionSource = new BehaviorSubject("")
  private router = inject(Router)
  private countries: Country[] = []
  currentSearch$ = this.searchTermSource.asObservable()
  currentRegion$ = this.regionSource.asObservable()

  getCountries(): Observable<Country[]> {
    if (this.countries.length) return of(this.countries)
    return this.fetchCountries().pipe(
      tap((countries) => (this.countries = countries))
    )
  }

  getCountry(countryName: string): Observable<Country> {
    const findCountry = (countries: Country[], targetName: string) => {
      const country = countries.find((c) => c.name === targetName)
      if (country === undefined) {
        this.router.navigate(["/"])
      }
      return country || ({} as Country)
    }

    if (this.countries.length) {
      return of(findCountry(this.countries, countryName))
    }

    return this.fetchCountries().pipe(map((c) => findCountry(c, countryName)))
  }

  changeSearch(term: string): void {
    this.searchTermSource.next(term.trim())
  }

  changeRegion(region: string): void {
    this.regionSource.next(region)
  }

  filterCountriesByRegion(region: string) {
    const filterCountry = (countries: Country[]) =>
      countries.filter((c) => c.region === region)

    if (this.countries.length) {
      return filterCountry(this.countries)
    }
    return this.fetchCountries().pipe(map(filterCountry))
  }

  private fetchCountries(): Observable<Country[]> {
    return this.http.get<Country[]>("/assets/data.json")
  }
}
