import { Component, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [SidebarComponent, RouterOutlet, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // columns = resource<ColumnsRecord[], unknown>({
  //   params: this.boardId,
  //   loader: () =>
  //     this.#pb.collection("columns").getFullList({ filter: `board = "${this.boardId()}"` }),
  // });
  // columnIds = computed(() => this.columns.value()?.map((column) => column.id));
  // tasks = resource<TasksRecord[], unknown>({
  //   params: this.columnIds,
  //   loader: async () => {
  //     if (this.columnIds()?.length === 0) return [];
  //     const filter = this.columnIds()
  //       ?.map((id) => `column = "${id}"`)
  //       .join(" || ");
  //     return this.#pb.collection("tasks").getFullList({ filter });
  //   },
  // });
  // tasksByColumn = computed(() => {
  //   const allTasks = this.tasks.value() ?? [];
  //   return (columnId: string) => allTasks.filter((task) => task.column === columnId);
  // });
  // openTaskDetails(task: TasksRecord) {
  //   this.#dialog.open(TaskDetailsComponent, { data: task, width: "480px" });
  // }
}
