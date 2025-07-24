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
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-board-view",
  templateUrl: "./board-view.component.html",
  imports: [DragDropModule],
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

  taskCounts = computed(() => {
    const counts = new Map<string, number>();
    for (const task of this.tasks.value() ?? []) {
      const col = task.column;
      counts.set(col, (counts.get(col) ?? 0) + 1);
    }
    return counts;
  });

  openTaskDetails(task: TasksRecord) {
    this.#dialog.open(TaskDetailsComponent, {
      data: task,
      width: "480px",
      autoFocus: false,
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });
  }

  drop(event: CdkDragDrop<string>) {
    const tasksByColumn = this.tasks.value().filter((task) => task.column === event.container.data);
    console.log(tasksByColumn);
    if (event.previousContainer === event.container) {
      moveItemInArray(tasksByColumn, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(tasksByColumn, event.previousIndex, event.currentIndex);
    }
  }
}
