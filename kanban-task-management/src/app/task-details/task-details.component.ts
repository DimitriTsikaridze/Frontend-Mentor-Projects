import { DIALOG_DATA } from "@angular/cdk/dialog";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  ViewEncapsulation,
} from "@angular/core";
import { pocketbase } from "../app.config";
import { SubtasksRecord, TasksRecord } from "../../pocketbase-types";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  encapsulation: ViewEncapsulation.None,
  host: { class: "" },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent {
  #pb = inject(pocketbase);
  task: TasksRecord = inject(DIALOG_DATA);

  subtasks = resource<SubtasksRecord[], unknown>({
    loader: () =>
      this.#pb.collection("subtasks").getFullList({ filter: `task = "${this.task.id}"` }),
  });

  completedSubtasks = computed(() => this.subtasks.value()?.filter((t) => t.isCompleted).length);
}
