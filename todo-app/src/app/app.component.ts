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
export class AppComponent {
  private darkModeToggle() {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark");
    const updateDarkModeClass = () => {
      document.body.classList.toggle("dark", darkModeMediaQuery.matches);
    };

    darkModeMediaQuery.addEventListener("change", updateDarkModeClass);
  }
}
