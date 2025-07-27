import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { ClickOutside } from "ngxtension/click-outside";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  host: { class: "block relative" },
  imports: [ClickOutside],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  isOpen = signal(false);
  label = input.required<string>();
  options = input.required<string[]>();
  selectedOption = model.required<string>();
}
