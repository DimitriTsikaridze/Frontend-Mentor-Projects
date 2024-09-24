import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoFiltersComponent } from "./todo-filters/todo-filters.component";
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Todo, TodoFilter } from "./models/todo";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent, TodoFiltersComponent, DragDropModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  todos = signal<Todo[]>([
    { title: "Complete online JavaScript course", completed: false },
    { title: "Jog around the park 3x", completed: false },
    { title: "10 minutes meditation", completed: false },
    { title: "Read for 1 hour", completed: false },
    { title: "Pick up groceries", completed: false },
    { title: "Complete Todo App on Frontend Mentor", completed: false },
  ]);

  drop(e: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos(), e.previousIndex, e.currentIndex);
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

  onDeleteTodo(title: string) {
    console.log(title);
  }
}
