import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
  ViewEncapsulation,
} from "@angular/core";
import { ColumnsRecord, SubtasksRecord, TasksRecord } from "../../pocketbase-types";
import { pocketbase } from "../app.config";
import { Dialog } from "@angular/cdk/dialog";
import { TaskDetailsComponent } from "../task-details/task-details.component";
import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";

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
      opacity: 0.5;
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      outline: 6px dashed var(--color-kb-lines-dark);
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
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
  columns = resource({
    params: this.id,
    loader: ({ params }) =>
      this.#pb.collection<ColumnsRecord>("columns").getFullList({ filter: `board = "${params}"` }),
  });

  columnNames = computed(() => {
    if (!this.columns.hasValue()) return undefined;
    return this.columns.value().map((column) => column.name);
  });

  columnIds = computed(() =>
    this.columns.hasValue() ? this.columns.value().map(({ id }) => id) : undefined,
  );

  tasks = resource({
    params: this.columnIds,
    loader: ({ params }) => {
      const filter = params.map((id) => `column = "${id}"`).join(" || ");
      return this.#pb.collection<TasksRecord>("tasks").getFullList({ filter });
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

  taskIds = computed(() =>
    this.tasks.hasValue() ? this.tasks.value().map(({ id }) => id) : undefined,
  );

  subtasks = resource({
    params: this.taskIds,
    loader: ({ params }) => {
      const filter = params.map((taskId) => `task = "${taskId}"`).join(" || ");
      return this.#pb.collection<SubtasksRecord>("subtasks").getFullList({ filter });
    },
  });

  subtasksCount = computed(() => {
    if (!this.subtasks.hasValue()) return undefined;
    const subtasksMap = new Map<string, { subtaskCount: number; completed: number }>();
    const subtasks = this.subtasks.value();
    for (const subtask of subtasks) {
      const taskId = subtask.task;
      const current = subtasksMap.get(taskId) ?? { completed: 0, subtaskCount: 0 };
      current.subtaskCount++;
      if (subtask.isCompleted) {
        current.completed++;
      }
      subtasksMap.set(taskId, current);
    }

    return subtasksMap;
  });

  openTaskDetails(task: TasksRecord) {
    if (!this.subtasks.hasValue()) return;
    const subtasks = this.subtasks.value().filter((subtask) => subtask.task === task.id);
    const dialogRef = this.#dialog.open(TaskDetailsComponent, {
      data: { task, subtasks, columnNames: this.columnNames() },
      width: "480px",
      autoFocus: false,
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });
    dialogRef.componentInstance.update.subscribe(({ subtaskId, isCompleted }) => {
      this.subtasks.update((subtasks) => {
        return subtasks.map((subtask) => {
          return subtask.id === subtaskId ? { ...subtask, isCompleted } : subtask;
        });
      });
    });
  }

  drop(e: CdkDragDrop<string>) {}
}
