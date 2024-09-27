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
  todos = this.todoService.todos;

  drop(e: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos(), e.previousIndex, e.currentIndex);
  }

  onSubmitTodo(todo: Omit<Todo, "id" | "order">) {
    this.todoService.addTodo(todo);
  }

  onCheckedChange(e: boolean) {
    console.log(e);
  }

  onFilterTypeChange(todoFilter: TodoFilter) {
    console.log(todoFilter);
  }

  onClearCompleted() {
    console.log("clear all");
  }

  onDeleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
