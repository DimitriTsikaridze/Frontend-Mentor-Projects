import { inject } from "@angular/core";
import { RenderMode, ServerRoute } from "@angular/ssr";
import { KanbanService } from "./kanban.service";

export const serverRoutes: ServerRoute[] = [
  {
    path: "**",
    renderMode: RenderMode.Client,
    // getPrerenderParams: async () => {
    //   const kanbanService = inject(KanbanService);
    //   const boardIds = kanbanService.boards.value();
    //   if (!boardIds) return [];
    //   return boardIds.map((board) => ({ id: board.id.toString() }));
    // },
  },
];
