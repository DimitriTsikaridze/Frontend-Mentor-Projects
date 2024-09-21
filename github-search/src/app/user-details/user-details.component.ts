import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { GithubUser } from "./user.model"

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  @Input() user: GithubUser
}
