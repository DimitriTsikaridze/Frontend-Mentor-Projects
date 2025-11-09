import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  signal,
  inject,
} from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { KanbanService } from "./kanban.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [SidebarComponent, RouterOutlet, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  showSidebar = signal<boolean>(true);
  boards = inject(KanbanService).boards;
}
