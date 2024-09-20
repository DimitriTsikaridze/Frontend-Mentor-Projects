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
import { provideHttpClient } from "@angular/common/http"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
  ],
}
