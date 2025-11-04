import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "board/1", pathMatch: "full" },
  { path: "board/:id", loadComponent: () => import("./board-view/board-view.component") },
];
