import { Component } from "@angular/core"
import { UsersService } from "../user-details/users.service"

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent {
  constructor(public usersService: UsersService) {}

  handleSearch(searchTerm: string) {
    this.usersService.searchTerm.next(searchTerm)
  }
}
