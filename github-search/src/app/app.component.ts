import { Component } from "@angular/core"
import { Observable } from "rxjs"
import { MetaService } from "./meta.service"
import { GithubUser } from "./user-details/user.model"
import { UsersService } from "./user-details/users.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private metaService: MetaService
  ) {}

  user$: Observable<GithubUser>

  ngOnInit(): void {
    this.user$ = this.usersService.getUser()
    this.generateTags()
  }

  generateTags() {
    this.metaService.generateTags({
      title: "Github Users Search App",
      description:
        "Search github users, see their followers, repositories and social links",
      image:
        "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/nr37our6z7faztmhwj9r.jpg",
    })
  }
}
