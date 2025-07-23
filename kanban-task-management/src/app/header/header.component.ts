import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-header",
  imports: [],
  host: { class: "border-b border-b-kb-lines-dark w-full bg-kb-dark-grey flex items-center h-24" },
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
