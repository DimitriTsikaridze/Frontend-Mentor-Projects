import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { TodoListComponent } from "./todo-list/todo-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, TodoListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
