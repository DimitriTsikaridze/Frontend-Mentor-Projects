import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoFiltersComponent } from "./todo-filters/todo-filters.component";
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Todo, TodoFilter } from "./models/todo";
import { TodoService } from "./todo.service";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent, TodoFiltersComponent, DragDropModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  filteredTodos = this.todoService.filteredTodos;

  drop(e: CdkDragDrop<string[]>) {
    moveItemInArray(this.filteredTodos(), e.previousIndex, e.currentIndex);
  }

  onSubmitTodo(todo: Omit<Todo, "id" | "order">) {
    this.todoService.addTodo(todo);
  }

  onCheckedChange(completed: boolean, id: number) {
    this.todoService.updateTodo(id, completed);
  }

  onFilterTypeChange(todoFilter: TodoFilter) {
    this.todoService.filterTodos(todoFilter);
  }

  onClearCompleted() {
    this.todoService.clearCompleted();
  }

  onDeleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
