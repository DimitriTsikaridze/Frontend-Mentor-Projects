import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from "@angular/core";
import { Todo } from "../models/todo";

@Component({
  selector: "app-todo-item",
  standalone: true,
  imports: [],
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.editable]": "editable()",
  },
})
export class TodoItemComponent {
  editable = input(false, { transform: booleanAttribute });

  submitTodo = output<Omit<Todo, "id" | "order">>();
  title = input.required<string>();
  checked = model<boolean>(false);
  checkedChange = output<boolean>();
  deleteTodo = output();

  toggleTodo() {
    this.checked.set(!this.checked());
    this.checkedChange.emit(this.checked());
  }

  addTodo(title: string) {
    if (!title) return;
    this.submitTodo.emit({ title, completed: false });
  }
}
