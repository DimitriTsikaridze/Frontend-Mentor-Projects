import { Component, linkedSignal, inject, resource, computed } from "@angular/core";
import { pocketbase } from "./app.config";
import { BoardsRecord, ColumnsRecord, TasksRecord } from "../pocketbase-types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
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
}
