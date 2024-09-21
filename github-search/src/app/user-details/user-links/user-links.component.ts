import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { GithubUser } from "../user.model"

@Component({
  selector: "app-user-links",
  templateUrl: "./user-links.component.html",
  styleUrls: ["./user-links.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLinksComponent {
  @Input() links: GithubUser
}
