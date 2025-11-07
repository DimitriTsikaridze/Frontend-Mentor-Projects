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
  private currentBoard = inject(KanbanService).currentBoard;

  addNewTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { columns: this.currentBoard().columns.map((c) => c.name) },
      width: "480px",
      restoreFocus: false,
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });

    dialogRef.componentInstance.submitFormChanged.subscribe((task: Task) => {
      this.currentBoard.update((board) => {
        const col = board.columns.find((c) => c.name === task.status);
        col.tasks.push(task);
        return board;
      });
    });
  }
}
