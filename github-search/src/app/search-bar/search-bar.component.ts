import { Component, inject } from "@angular/core";
import { UsersService } from "../user-details/users.service";
import { SubmitOnEnterDirective } from "./submit-on-enter.directive";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
  standalone: true,
  imports: [SubmitOnEnterDirective],
})
export class SearchBarComponent {
  usersService = inject(UsersService);

  handleSearch(searchTerm: string) {
    this.usersService.searchTerm.set(searchTerm);
  }
}
