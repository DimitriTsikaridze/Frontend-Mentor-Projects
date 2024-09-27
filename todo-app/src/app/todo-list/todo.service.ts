import { Injectable, signal } from "@angular/core";
import { Todo, TodoFilter } from "./models/todo";

@Injectable({ providedIn: "root" })
export class TodoService {
  todos = signal<Todo[]>([
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

  filterTodos(filter: TodoFilter) {}

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

  deleteTodo(id: number) {
    const updatedTodos = this.todos().filter((todo) => todo.id !== id);
    this.todos.set(updatedTodos);
  }
}
