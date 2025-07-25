import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "board/lav1g9d67sj6mus", pathMatch: "full" },
  { path: "board/:id", loadComponent: () => import("./board-view/board-view.component") },
];
