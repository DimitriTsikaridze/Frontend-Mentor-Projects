import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoFiltersComponent } from "./todo-filters/todo-filters.component";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent, TodoFiltersComponent],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  handleChange(e: boolean) {
    console.log(e);
  }
}
