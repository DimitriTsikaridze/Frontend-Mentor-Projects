import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { KanbanService } from "../kanban.service";
import { RouterLink, RouterLinkActive } from "@angular/router";

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
  kanbanService = inject(KanbanService);
}
