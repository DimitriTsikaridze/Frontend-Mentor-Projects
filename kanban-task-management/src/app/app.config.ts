import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
