import { Injectable, signal, computed } from "@angular/core";
import { Todo, TodoFilter } from "./models/todo";

@Injectable({ providedIn: "root" })
export class TodoService {
  private todos = signal<Todo[]>([
    {
      order: 0,
      id: 1,
      title: "Complete online JavaScript course",
      completed: true,
    },
    { order: 1, id: 2, title: "Jog around the park 3x", completed: false },
    { order: 2, id: 3, title: "10 minutes meditation", completed: false },
    { order: 3, id: 4, title: "Read for 1 hour", completed: false },
    { order: 4, id: 5, title: "Pick up groceries", completed: false },
    {
      order: 5,
      id: 6,
      title: "Complete Todo App on Frontend Mentor",
      completed: false,
    },
  ]);

  private currentFilter = signal<TodoFilter>("all");

  filteredTodos = computed(() => {
    if (this.currentFilter() === "active") {
      return this.todos().filter((todo) => !todo.completed);
    } else if (this.currentFilter() === "completed") {
      return this.todos().filter((todo) => todo.completed);
    } else {
      return this.todos();
    }
  });

  filterTodos(filter: TodoFilter) {
    this.currentFilter.set(filter);
  }

  addTodo(newTodo: Omit<Todo, "id" | "order">) {
    const updatedTodos = [
      ...this.todos(),
      {
        ...newTodo,
        id: this.todos().length + 1,
        order: this.todos().length,
      },
    ];

    this.todos.set(updatedTodos);
  }

  updateTodo(id: number, completed: boolean) {
    const updatedTodos = this.todos().map((todo) => {
      return todo.id === id ? { ...todo, completed } : todo;
    });

    this.todos.set(updatedTodos);
  }

  deleteTodo(id: number) {
    this.todos.set(this.todos().filter((todo) => todo.id !== id));
  }

  clearCompleted() {
    this.todos.set(this.todos().filter((todo) => !todo.completed));
  }
}
