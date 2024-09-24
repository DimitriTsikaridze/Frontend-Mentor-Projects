import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";

@Component({
  selector: "app-todo-filters",
  standalone: true,
  imports: [],
  templateUrl: "./todo-filters.component.html",
  styleUrl: "./todo-filters.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFiltersComponent {
  itemsLeft = input.required<number>();

  filterType = output<"all" | "active" | "completed">();
  clearCompleted = output();
}
