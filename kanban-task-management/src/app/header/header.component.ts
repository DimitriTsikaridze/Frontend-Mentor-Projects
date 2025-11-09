import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { AddTaskComponent } from "../add-task/add-task.component";
import { Dialog } from "@angular/cdk/dialog";
import { KanbanService } from "../kanban.service";
import { Task } from "../boars.model";

@Component({
  selector: "app-header",
  host: { class: "border-b border-b-kb-lines-dark w-full bg-kb-dark-grey flex items-center h-24" },
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private dialog = inject(Dialog);
  private kanbanService = inject(KanbanService);
  currentBoard = this.kanbanService.currentBoard;

  addNewTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { columns: this.currentBoard().columns.map((c) => c.name) },
      width: "480px",
      restoreFocus: false,
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });

    dialogRef.componentInstance.submitFormChanged.subscribe((task: Task) => {
      const currentBoard = this.currentBoard();
      this.kanbanService.boards.update((boards) => {
        return boards.map((board) => {
          if (board.name !== currentBoard.name) return board;
          const updatedColumns = board.columns.map((col) => {
            if (col.name !== task.status) return col;
            return { ...col, tasks: [...col.tasks, task] };
          });

          return { ...board, columns: updatedColumns };
        });
      });
    });
  }
}
