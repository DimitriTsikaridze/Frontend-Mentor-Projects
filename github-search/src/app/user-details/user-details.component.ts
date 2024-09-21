import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { GithubUser } from "./user.model";
import { UserStatsComponent } from "./user-stats/user-stats.component";
import { UserLinksComponent } from "./user-links/user-links.component";
import { DatePipe } from "@angular/common";
import { CreatedAtPipe } from "./created-at.pipe";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserStatsComponent, UserLinksComponent, DatePipe, CreatedAtPipe],
})
export class UserDetailsComponent {
  user = input.required<GithubUser>();
}
