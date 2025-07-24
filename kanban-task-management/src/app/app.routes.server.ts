import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  {
    path: "board/:userId",
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return Promise.resolve([
        { id: "pbc_3304927325" },
        { id: "v6f6t0xvcjynxyu" },
        { id: "ynq90l2kvqjbsla" },
      ]);
    },
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];
