import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-board-view",
  templateUrl: "./board-view.component.html",
  imports: [DragDropModule],
  styles: `
    .cdk-drag-preview {
      background-color: var(--color-kb-dark-grey);
      padding-inline: 16px;
      box-shadow:
        0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0.5;
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      outline: 6px dashed var(--color-kb-lines-dark);
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardViewComponent {
  colors = ["#49C4E5", "#8471F2", "#67E2AE"];

  id = input.required<string>();

  openTaskDetails() {}

  async drop(e: CdkDragDrop<string>) {
    console.log(e);
  }
}
