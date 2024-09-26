import { DOCUMENT } from "@angular/common";
import {
  afterRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private body = inject(DOCUMENT).body;

  theme = signal<string | null>(null);

  constructor() {
    afterRender(() => {
      this.theme.set(localStorage.getItem("todo-theme"));
      this.body.classList.add(this.theme()!);
    });
  }

  setTheme(theme: "light" | "dark") {
    if (theme === "dark") {
      this.body.classList.replace("light", "dark");
      localStorage.setItem("todo-theme", "dark");
    } else {
      this.body.classList.replace("dark", "light");
      localStorage.setItem("todo-theme", "light");
    }
  }
}
