import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Country } from "@shared/models"
import { BehaviorSubject, of, Observable, tap, map } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private http = inject(HttpClient)
  private searchTermSource = new BehaviorSubject("")
  private countries: Country[] = []
  currentSearch$ = this.searchTermSource.asObservable()

  getCountries(): Observable<Country[]> {
    if (this.countries.length) return of(this.countries)
    return this.http
      .get<Country[]>("/assets/data.json")
      .pipe(tap((countries) => (this.countries = countries)))
  }

  getCountry(countryName: string): Observable<Country> {
    const findCountry = (countries: Country[], targetName: string) => {
      return countries.find((c) => c.name === targetName) || ({} as Country)
    }

    if (this.countries.length) {
      return of(findCountry(this.countries, countryName))
    }

    return this.http
      .get<Country[]>("/assets/data.json")
      .pipe(map((c) => findCountry(c, countryName)))
  }

  changeSearch(term: string): void {
    this.searchTermSource.next(term)
  }
}
