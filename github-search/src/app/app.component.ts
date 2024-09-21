import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { MetaService } from "./meta.service";
import { GithubUser } from "./user-details/user.model";
import { UsersService } from "./user-details/users.service";
import { AsyncPipe } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { LoadingComponent } from "./loading/loading.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    HeaderComponent,
    SearchBarComponent,
    UserDetailsComponent,
    LoadingComponent,
    AsyncPipe,
  ],
})
export class AppComponent {
  private usersService = inject(UsersService);
  private metaService = inject(MetaService);

  user$: Observable<GithubUser>;

  ngOnInit(): void {
    this.user$ = this.usersService.getUser();
    this.generateTags();
  }

  generateTags() {
    this.metaService.generateTags({
      title: "Github Users Search App",
      description:
        "Search github users, see their followers, repositories and social links",
      image:
        "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/nr37our6z7faztmhwj9r.jpg",
    });
  }
}
