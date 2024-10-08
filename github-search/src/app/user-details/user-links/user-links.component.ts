import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { GithubUser } from "../user.model";

@Component({
  selector: "app-user-links",
  templateUrl: "./user-links.component.html",
  styleUrls: ["./user-links.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class UserLinksComponent {
  links = input.required<GithubUser>();
}
