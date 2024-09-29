import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { GithubUser } from "../user.model";

@Component({
  selector: "app-user-stats",
  templateUrl: "./user-stats.component.html",
  styleUrls: ["./user-stats.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UserStatsComponent {
  stats = input.required<GithubUser>();
}
