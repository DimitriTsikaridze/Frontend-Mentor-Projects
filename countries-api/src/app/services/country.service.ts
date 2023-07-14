import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { Country } from "../models/country"

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private http = inject(HttpClient)
  countries$ = this.http.get<Country[]>("/assets/data.json")
}
