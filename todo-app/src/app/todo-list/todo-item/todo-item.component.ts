import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from "@angular/core";

@Component({
  selector: "app-todo-item",
  standalone: true,
  imports: [],
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  editable = input(false, { transform: booleanAttribute });
  title = input.required<string>();
  checked = model<boolean>(false);
  checkedChange = output<boolean>();

  toggleTodo() {
    this.checked.set(!this.checked());
    this.checkedChange.emit(this.checked());
  }
}
