export interface Todo {
  title: string;
  completed: boolean;
  id: number;
  order: number;
}

export type TodoFilter = "all" | "active" | "completed";
