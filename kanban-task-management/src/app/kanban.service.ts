import { httpResource } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Board, BoardsResponse } from "./boars.model";

@Injectable({
  providedIn: "root",
})
export class KanbanService {
  boards = httpResource<Board[]>(() => "data.json", {
    parse: (rawData: unknown) => {
      const value = rawData as BoardsResponse;
      return value.boards.map((board) => {
        board.columns.forEach((col) => {
          return col.tasks.forEach((task) => {
            return (task.id = crypto.randomUUID());
          });
        });
        return board;
      });
    },
    defaultValue: [],
  });

  currentBoard = signal<Board | null>(null);
}
