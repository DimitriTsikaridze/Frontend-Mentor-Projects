import {
  ChangeDetectionStrategy,
  Component,
  model,
  output,
} from "@angular/core";
import { TodoFilter } from "../models/todo";

@Component({
  selector: "app-todo-filters",
  standalone: true,
  imports: [],
  templateUrl: "./todo-filters.component.html",
  styleUrl: "./todo-filters.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFiltersComponent {
  filterType = model<TodoFilter>("all");
  filterTypeChange = output<TodoFilter>();
}
