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
  styles: `
    .cdk-drag-preview {
      background-color: var(--color-kb-dark-grey);
      padding-inline: 16px;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .example-box:last-child {
      border: none;
    }

    .cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .cdk-drag-placeholder {
    }
  `,
  encapsulation: ViewEncapsulation.Emulated,
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

  drop(e: CdkDragDrop<string>) {
    if (e.previousContainer === e.container) {
      const allTasks = [...(this.tasks.value() || [])];
      const columnTasks = allTasks.filter((task) => task.column === e.container.data);
      moveItemInArray(columnTasks, e.previousIndex, e.currentIndex);
      this.tasks.set(allTasks);
    }
  }
}
