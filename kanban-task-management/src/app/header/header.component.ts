import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { KanbanService } from "../kanban.service";

@Component({
  selector: "app-header",
  host: { class: "border-b border-b-kb-lines-dark w-full bg-kb-dark-grey flex items-center h-24" },
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  kanbanService = inject(KanbanService);
}
