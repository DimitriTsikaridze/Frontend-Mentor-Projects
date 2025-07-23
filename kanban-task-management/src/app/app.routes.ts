import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "board/:id", loadComponent: () => import("./board-view/board-view.component") },
];
