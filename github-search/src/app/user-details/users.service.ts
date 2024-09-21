import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  of,
  tap,
} from "rxjs"
import { GithubUser } from "./user.model"

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  searchTerm = new BehaviorSubject<string>("octocat")

  notFound: boolean

  getUser(): Observable<GithubUser> {
    return this.searchTerm.pipe(
      switchMap((searchTerm) => {
        return this.readUser(searchTerm)
      })
    )
  }

  private readUser(userName: string): Observable<GithubUser> {
    return this.http
      .get<GithubUser>(`https://api.github.com/users/${userName}`)
      .pipe(
        tap({
          next: () => (this.notFound = false),
          error: () => (this.notFound = true),
        }),
        catchError((err: HttpErrorResponse) => of())
      )
  }
}
