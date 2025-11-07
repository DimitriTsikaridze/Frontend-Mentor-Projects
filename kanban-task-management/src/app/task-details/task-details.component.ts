import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { CheckboxComponent } from "../board-view/checkbox/checkbox.component";
import { DropdownComponent } from "../board-view/dropdown/dropdown.component";
import { DIALOG_DATA } from "@angular/cdk/dialog";
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
  dialogData = inject(DIALOG_DATA) as { task: Task; columns: string[] };
  subtaskChanged = output<Task>();
  taskStatusChanged = output<string>();

  toggleCompleted(subtask: Subtask) {
    subtask.isCompleted = !subtask.isCompleted;
    this.dialogData = structuredClone(this.dialogData);
    this.subtaskChanged.emit(this.dialogData.task);
  }

  updateStatus(status: string) {
    this.taskStatusChanged.emit(status);
  }
}
