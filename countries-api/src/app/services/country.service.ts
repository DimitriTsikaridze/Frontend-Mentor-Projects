import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Country } from "../models/country"
import { BehaviorSubject, of, Observable, tap } from "rxjs"

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

  changeSearch(term: string) {
    this.searchTermSource.next(term)
  }
}
