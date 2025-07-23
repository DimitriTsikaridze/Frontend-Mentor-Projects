import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  resource,
  ViewEncapsulation,
} from "@angular/core";
import { ColumnsRecord, TasksRecord } from "../../pocketbase-types";
import { pocketbase } from "../app.config";

@Component({
  selector: "app-board-view",
  imports: [],
  templateUrl: "./board-view.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardViewComponent {
  colors = ["#49C4E5", "#8471F2", "#67E2AE"];
  #pb = inject(pocketbase);
  id = input.required<string>();
  columns = resource<ColumnsRecord[], unknown>({
    params: this.id,
    loader: () => this.#pb.collection("columns").getFullList({ filter: `board = "${this.id()}"` }),
  });

  columnIds = computed(() => this.columns.value()?.map(({ id }) => id));

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

  constructor() {
    effect(() => console.log(this.tasks.value()));
  }
}
