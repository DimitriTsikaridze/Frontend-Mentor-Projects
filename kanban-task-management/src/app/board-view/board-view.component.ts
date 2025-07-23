import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-board-view",
  imports: [],
  templateUrl: "./board-view.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardViewComponent {
  id = input.required<string>();
}
