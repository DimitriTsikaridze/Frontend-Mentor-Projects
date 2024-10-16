import { Injectable, effect, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { GithubUser } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private http = inject(HttpClient);
  searchTerm = signal("octocat");
  notFound = signal(false);
  user = signal<GithubUser | null>(null);

  constructor() {
    effect(
      () => {
        this.http
          .get<GithubUser>(`https://api.github.com/users/${this.searchTerm()}`)
          .pipe(
            tap({
              next: () => this.notFound.set(false),
              error: () => this.notFound.set(true),
            })
          )
          .subscribe((user) => this.user.set(user));
      },
      { allowSignalWrites: true }
    );
  }
}
