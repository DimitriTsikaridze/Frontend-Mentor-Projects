import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "board/0", pathMatch: "full" },
  {
    path: "board/:idx",
    loadComponent: () => import("./board-view/board-view.component"),
  },
];
