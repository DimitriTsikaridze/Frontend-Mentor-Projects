import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { CheckboxComponent } from "../board-view/checkbox/checkbox.component";
import { DropdownComponent } from "../board-view/dropdown/dropdown.component";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, DropdownComponent],
})
export class TaskDetailsComponent {
  toggleCompleted(checked: boolean) {
    console.log(checked);
  }
}
