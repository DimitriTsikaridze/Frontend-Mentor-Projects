import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
  ViewEncapsulation,
} from "@angular/core";
import { ColumnsRecord, TasksRecord } from "../../pocketbase-types";
import { pocketbase } from "../app.config";
import { Dialog } from "@angular/cdk/dialog";
import { TaskDetailsComponent } from "../task-details/task-details.component";

@Component({
  selector: "app-board-view",
  templateUrl: "./board-view.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardViewComponent {
  colors = ["#49C4E5", "#8471F2", "#67E2AE"];
  #pb = inject(pocketbase);
  #dialog = inject(Dialog);

  id = input.required<string>();
  columns = resource<ColumnsRecord[], unknown>({
    params: this.id,
    loader: () => this.#pb.collection("columns").getFullList({ filter: `board = "${this.id()}"` }),
  });

  columnIds = computed(() => this.columns.value()?.map(({ id }) => id));

  tasks = resource<TasksRecord[], unknown>({
    params: this.columnIds,
    loader: async () => {
      if (this.columnIds()?.length === 0) return [];
      const filter = this.columnIds()
        ?.map((id) => `column = "${id}"`)
        .join(" || ");
      return this.#pb.collection("tasks").getFullList({ filter });
    },
  });

  openTaskDetails(task: TasksRecord) {
    this.#dialog.open(TaskDetailsComponent, {
      data: task,
      width: "480px",
      autoFocus: false,
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });
  }
}
