import { ChangeDetectionStrategy, Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-filter",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  ngOnInit() {}
}
