import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { GithubUser } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private http = inject(HttpClient);

  searchTerm = new BehaviorSubject<string>("octocat");

  notFound = signal(false);

  getUser(): Observable<GithubUser> {
    return this.searchTerm.pipe(
      switchMap((searchTerm) => {
        return this.readUser(searchTerm);
      })
    );
  }

  private readUser(userName: string): Observable<GithubUser> {
    return this.http
      .get<GithubUser>(`https://api.github.com/users/${userName}`)
      .pipe(
        tap({
          next: () => this.notFound.set(false),
          error: () => this.notFound.set(true),
        })
      );
  }
}
