import { ApplicationConfig } from "@angular/core";

import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(withEventReplay())],
};
