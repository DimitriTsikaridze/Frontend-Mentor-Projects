import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { CheckboxComponent } from "../board-view/checkbox/checkbox.component";
import { DropdownComponent } from "../board-view/dropdown/dropdown.component";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { CompletedSubtasksPipe } from "../board-view/completed-subtasks.pipe";
import { Subtask, Task } from "../boars.model";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, DropdownComponent, CompletedSubtasksPipe],
})
export class TaskDetailsComponent {
  dialogRef = inject(DialogRef);
  task = inject(DIALOG_DATA) as Task;

  toggleCompleted(subtask: Subtask) {
    subtask.isCompleted = !subtask.isCompleted;
    this.task = structuredClone(this.task);
  }
}
