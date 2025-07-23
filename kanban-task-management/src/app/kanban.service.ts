import { inject, Injectable, linkedSignal, resource } from "@angular/core";
import { pocketbase } from "./app.config";
import { BoardsRecord } from "../pocketbase-types";

@Injectable({
  providedIn: "root",
})
export class KanbanService {
  #pb = inject(pocketbase);

  boards = resource<BoardsRecord[], unknown>({
    loader: () => this.#pb.collection("boards").getFullList(),
  });

  activeBoardId = linkedSignal(() => this.boards.value()?.[2]?.id);
}
