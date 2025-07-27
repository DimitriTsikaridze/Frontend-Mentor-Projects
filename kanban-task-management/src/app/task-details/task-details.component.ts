import { DIALOG_DATA } from "@angular/cdk/dialog";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { pocketbase } from "../app.config";
import { ColumnsRecord, SubtasksRecord, TasksRecord } from "../../pocketbase-types";
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
  #pb = inject(pocketbase);
  dialogData: {
    task: TasksRecord;
    subtasks: SubtasksRecord[];
    columns: ColumnsRecord[];
    taskStatus: string;
  } = inject(DIALOG_DATA);
  toggleSubtask = output<{ subtaskId: string; isCompleted: boolean }>();
  updateTaskStatus = output<{ taskId: string; column: string }>();
  subtasks = signal(this.dialogData.subtasks);
  columns = signal(this.dialogData.columns);
  completedSubtask = computed(
    () => this.subtasks().filter(({ isCompleted }) => isCompleted).length,
  );

  columnNames = computed(() => {
    return this.columns().map((column) => column.name);
  });

  toggleCompleted(isCompleted: boolean, subtaskId: string) {
    this.subtasks.update((subtasks) => {
      return subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, isCompleted } : subtask,
      );
    });

    this.#pb
      .collection("subtasks")
      .update(subtaskId, { isCompleted })
      .then(() => this.toggleSubtask.emit({ subtaskId, isCompleted }));
  }

  updateStatus(status: string) {
    const column = this.dialogData.columns.find((column) => column.name === status).id;
    const taskId = this.dialogData.task.id;
    this.#pb
      .collection("tasks")
      .update(taskId, { column })
      .then(() => this.updateTaskStatus.emit({ taskId, column }));
  }
}
