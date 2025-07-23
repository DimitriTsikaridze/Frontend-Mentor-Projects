import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-header",
  imports: [],
  host: { class: "border-b border-r-kb-lines-dark w-full" },
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
