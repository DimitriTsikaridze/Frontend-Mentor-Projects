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
import { SubtasksRecord, TasksRecord } from "../../pocketbase-types";
import { CheckboxComponent } from "../board-view/checkbox/checkbox.component";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent],
})
export class TaskDetailsComponent {
  #pb = inject(pocketbase);
  dialogData: { task: TasksRecord; subtasks: SubtasksRecord[] } = inject(DIALOG_DATA);
  update = output<{ subtaskId: string; isCompleted: boolean }>();
  subtasks = signal(this.dialogData.subtasks);
  completedSubtask = computed(
    () => this.subtasks().filter(({ isCompleted }) => isCompleted).length,
  );

  updateSubtask(isCompleted: boolean, subtaskId: string) {
    this.subtasks.update((subtasks) => {
      return subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, isCompleted } : subtask,
      );
    });

    this.#pb
      .collection("subtasks")
      .update(subtaskId, { isCompleted })
      .then(() => this.update.emit({ subtaskId, isCompleted }));
  }
}
