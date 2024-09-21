import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from "@angular/core"
import { GithubUser } from "../user.model"

@Component({
  selector: "app-user-stats",
  templateUrl: "./user-stats.component.html",
  styleUrls: ["./user-stats.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatsComponent {
  @Input() stats: GithubUser
}
