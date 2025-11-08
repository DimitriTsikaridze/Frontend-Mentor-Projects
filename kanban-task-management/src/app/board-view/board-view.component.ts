import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
  linkedSignal,
  effect,
} from "@angular/core";
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { KanbanService } from "../kanban.service";
import { Dialog } from "@angular/cdk/dialog";
import { CompletedSubtasksPipe } from "./completed-subtasks.pipe";
import { Task } from "../boars.model";
import { TaskDetailsComponent } from "../task-details/task-details.component";

@Component({
  selector: "app-board-view",
  templateUrl: "./board-view.component.html",
  imports: [DragDropModule, CompletedSubtasksPipe],
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
  private kanbanService = inject(KanbanService);
  private boards = this.kanbanService.boards;
  private dialog = inject(Dialog);
  colors = ["#49C4E5", "#8471F2", "#67E2AE"];
  idx = input.required<number>();
  board = linkedSignal(() => this.boards.value()[this.idx()]);

  constructor() {
    effect(() => this.kanbanService.currentBoard.set(this.board()));
  }

  openTaskDetails(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: { task, columns: this.board().columns.map((c) => c.name) },
      width: "480px",
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });

    dialogRef.componentInstance.subtaskChanged.subscribe((dialogTask) => {
      this.board.update((board) => {
        const colIdx = board.columns.findIndex((c) => c.name === dialogTask.status);
        const taskIdx = board.columns[colIdx].tasks.findIndex((t) => t.id === dialogTask.id);
        board.columns[colIdx].tasks[taskIdx] = dialogTask;
        return { ...board };
      });
    });

    dialogRef.componentInstance.taskStatusChanged.subscribe((status) => {
      this.board.update((board) => {
        const oldCol = board.columns.find((c) => c.name === task.status);
        const newCol = board.columns.find((c) => c.name === status);

        const taskIdx = oldCol.tasks.findIndex((t) => t.id === task.id);
        const [movedTask] = oldCol.tasks.splice(taskIdx, 1);

        movedTask.status = status;
        newCol.tasks.push(movedTask);

        return { ...board };
      });
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const newColumnName = event.container.id;
    const movedTask = event.container.data[event.currentIndex];

    this.board.update((board) => {
      const col = board.columns.find((c) => c.name === newColumnName);
      const task = col?.tasks.find((t) => t.id === movedTask.id);
      task.status = newColumnName;
      return { ...board };
    });
  }
}
