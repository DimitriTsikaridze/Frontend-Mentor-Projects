import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Country } from "../models/country"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private http = inject(HttpClient)
  private searchTermSource = new BehaviorSubject("")
  currentSearch$ = this.searchTermSource.asObservable()

  countries$ = this.http.get<Country[]>("/assets/data.json")

  changeSearch(term: string) {
    this.searchTermSource.next(term)
  }
}
