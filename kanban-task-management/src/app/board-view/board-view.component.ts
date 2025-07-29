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

  columnIds = computed(() =>
    this.columns.hasValue() ? this.columns.value().map(({ id }) => id) : undefined,
  );

  tasks = resource({
    params: this.columnIds,
    loader: ({ params }) => {
      const filter = params.map((id) => `column = "${id}"`).join(" || ");
      return this.#pb.collection<TasksRecord>("tasks").getFullList({
        filter,
        sort: "order",
      });
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

  taskIds = computed(() => {
    if (!this.tasks.hasValue()) return undefined;
    // Create a stable array - only changes when task IDs actually change
    const ids = this.tasks
      .value()
      .map(({ id }) => id)
      .sort();
    return ids.join(","); // Convert to string to make it even more stable
  });

  subtasks = resource({
    params: this.taskIds,
    loader: ({ params }) => {
      if (!params) return Promise.resolve([]);
      const taskIds = params.split(",");
      const filter = taskIds.map((taskId) => `task = "${taskId}"`).join(" || ");
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

  taskStatuses = computed(() => {
    const statusMap = new Map<string, string>();
    this.columns.value()?.forEach((column) => {
      statusMap.set(column.id, column.name);
    });
    return statusMap;
  });

  tasksInColumn = computed(() => {
    if (!this.tasks.hasValue()) return new Map<string, TasksRecord[]>();

    const tasksByColumn = new Map<string, TasksRecord[]>();

    // Group tasks by column
    this.tasks.value().forEach((task) => {
      if (!tasksByColumn.has(task.column!)) {
        tasksByColumn.set(task.column!, []);
      }
      tasksByColumn.get(task.column!)!.push(task);
    });

    // Sort tasks by order within each column
    tasksByColumn.forEach((tasks) => {
      tasks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    });

    return tasksByColumn;
  });

  openTaskDetails(task: TasksRecord) {
    if (!this.subtasks.hasValue()) return;
    const subtasks = this.subtasks.value().filter((subtask) => subtask.task === task.id);
    const dialogRef = this.#dialog.open(TaskDetailsComponent, {
      data: {
        task,
        subtasks,
        columns: this.columns.value(),
        taskStatus: this.taskStatuses().get(task.column),
      },
      width: "480px",
      autoFocus: false,
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });
    dialogRef.componentInstance.toggleSubtask.subscribe(({ subtaskId, isCompleted }) => {
      this.subtasks.update((subtasks) => {
        return subtasks.map((subtask) => {
          return subtask.id === subtaskId ? { ...subtask, isCompleted } : subtask;
        });
      });
    });

    dialogRef.componentInstance.updateTaskStatus.subscribe(({ taskId, column }) => {
      this.tasks.update((tasks) => {
        return tasks.map((task) => {
          return task.id === taskId ? { ...task, column } : task;
        });
      });
    });
  }

  async drop(e: CdkDragDrop<string>) {
    const currentTask = e.item.data as TasksRecord;
    const targetColumnId = e.container.data;
    const sourceColumnId = e.previousContainer.data;

    if (sourceColumnId === targetColumnId) {
      this.#reorderInSameColumn(currentTask, targetColumnId, e.previousIndex, e.currentIndex);
    } else {
      await this.#moveToNewColumn(currentTask, sourceColumnId, targetColumnId, e.currentIndex);
    }
  }

  #reorderInSameColumn(task: TasksRecord, columnId: string, fromIndex: number, toIndex: number) {
    // Simple approach: just renumber all tasks in the column sequentially
    this.tasks.update((tasks) => {
      const columnTasks = tasks.filter((t) => t.column === columnId);
      columnTasks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      // Remove the moved task and insert it at new position
      const movedTaskIndex = columnTasks.findIndex((t) => t.id === task.id);
      const [movedTask] = columnTasks.splice(movedTaskIndex, 1);
      columnTasks.splice(toIndex, 0, movedTask);

      // Update all tasks with new sequential orders
      return tasks.map((t) => {
        if (t.column === columnId) {
          const newIndex = columnTasks.findIndex((ct) => ct.id === t.id);
          return { ...t, order: newIndex };
        }
        return t;
      });
    });

    this.#saveColumnOrder(columnId);
  }

  async #moveToNewColumn(
    task: TasksRecord,
    sourceColumnId: string,
    targetColumnId: string,
    toIndex: number,
  ) {
    const targetTasks = this.tasksInColumn().get(targetColumnId) ?? [];
    const targetPosition = Math.min(toIndex, targetTasks.length);

    // Simple approach: renumber both columns sequentially
    this.tasks.update((tasks) => {
      return tasks.map((t) => {
        if (t.id === task.id) {
          // Move task to new column
          return { ...t, column: targetColumnId, order: targetPosition };
        } else if (t.column === targetColumnId && (t.order ?? 0) >= targetPosition) {
          // Shift existing tasks in target column
          return { ...t, order: (t.order ?? 0) + 1 };
        } else if (t.column === sourceColumnId && (t.order ?? 0) > (task.order ?? 0)) {
          // Shift remaining tasks in source column
          return { ...t, order: (t.order ?? 0) - 1 };
        }
        return t;
      });
    });

    await this.#saveBothColumnsOrder(sourceColumnId, targetColumnId);
  }

  async #saveColumnOrder(columnId: string) {
    try {
      const tasks = this.tasksInColumn().get(columnId) ?? [];
      const batch = this.#pb.createBatch();

      tasks.forEach((task, index) => {
        batch.collection("tasks").update(task.id, { order: index });
      });

      await batch.send();
    } catch (error) {
      console.error("Failed to update task order:", error);
    }
  }

  async #saveBothColumnsOrder(sourceColumnId: string, targetColumnId: string) {
    try {
      const batch = this.#pb.createBatch();

      // Renumber both columns to ensure sequential ordering (0, 1, 2...)
      [sourceColumnId, targetColumnId].forEach((columnId) => {
        const tasks = this.tasksInColumn().get(columnId) ?? [];
        tasks.forEach((task, index) => {
          batch.collection("tasks").update(task.id, {
            column: columnId,
            order: index,
          });
        });
      });

      await batch.send();
    } catch (error) {
      console.error("Failed to update task order:", error);
    }
  }
}
