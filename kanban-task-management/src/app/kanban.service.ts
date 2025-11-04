import { httpResource } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Board, BoardsResponse } from "./boars.model";

@Injectable({
  providedIn: "root",
})
export class KanbanService {
  boards = httpResource<Board[]>(() => "data.json", {
    parse: (rawData: unknown) => {
      const value = rawData as BoardsResponse;
      return value.boards;
    },
    defaultValue: [],
  });
}
