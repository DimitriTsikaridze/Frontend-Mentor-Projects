import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core"
import { provideClientHydration } from "@angular/platform-browser"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
  ],
}
