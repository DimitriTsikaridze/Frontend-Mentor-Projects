import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core"
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from "@angular/router"
import { routes } from "./app.routes"
import { provideHttpClient, withFetch } from "@angular/common/http"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { provideClientHydration } from "@angular/platform-browser"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(),
  ],
}
