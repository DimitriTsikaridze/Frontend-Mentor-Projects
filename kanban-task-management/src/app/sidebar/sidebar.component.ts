import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Board } from "../boars.model";

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
}
