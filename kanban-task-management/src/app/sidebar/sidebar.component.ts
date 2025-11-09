import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Board } from "../boars.model";
import { Dialog } from "@angular/cdk/dialog";
import { AddBoardComponent } from "../add-board/add-board.component";
import { KanbanService } from "../kanban.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  imports: [RouterLink, RouterLinkActive],
  host: {
    class:
      "flex flex-col h-[calc(100dvh-96px)] bg-kb-dark-grey border-r border-r-kb-lines-dark py-8 pr-6",
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  showSidebar = output<boolean>();
  boards = input.required<Board[]>();
  private dialog = inject(Dialog);
  private kanbanService = inject(KanbanService);
  private router = inject(Router);

  createNewBoard() {
    const dialogRef = this.dialog.open(AddBoardComponent, {
      width: "480px",
      panelClass: ["bg-kb-dark-grey", "rounded-lg", "p-8"],
    });

    dialogRef.componentInstance.submitFormChanged.subscribe((board) => {
      this.kanbanService.boards.update((boards) => {
        boards = [...boards, board];
        return boards;
      });
      this.router.navigate(["board", this.kanbanService.boards.value().length - 1]);
    });
  }
}
