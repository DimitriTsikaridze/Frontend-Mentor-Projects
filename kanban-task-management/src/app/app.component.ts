import {
  Component,
  linkedSignal,
  inject,
  resource,
  computed,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from "@angular/core";
import { pocketbase } from "./app.config";
import { BoardsRecord, ColumnsRecord, TasksRecord } from "../pocketbase-types";
import { DragDropModule } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [DragDropModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  #pb = inject(pocketbase);
  boards = resource<BoardsRecord[], unknown>({
    loader: () => this.#pb.collection("boards").getFullList(),
  });

  boardId = linkedSignal(() => this.boards.value()?.[0]?.id);

  columns = resource<ColumnsRecord[], unknown>({
    params: this.boardId,
    loader: () =>
      this.#pb.collection("columns").getFullList({ filter: `board = "${this.boardId()}"` }),
  });

  columnIds = computed(() => this.columns.value()?.map((column) => column.id));

  tasks = resource<TasksRecord[], unknown>({
    params: this.columnIds,
    loader: async () => {
      if (this.columnIds()?.length === 0) return [];
      const filter = this.columnIds()
        ?.map((id) => `column = "${id}"`)
        .join(" || ");
      return this.#pb.collection("tasks").getFullList({ filter });
    },
  });

  tasksByColumn = computed(() => {
    const allTasks = this.tasks.value() ?? [];
    return (columnId: string) => allTasks.filter((task) => task.column === columnId);
  });
}
