import { provideHttpClient, withFetch } from '@angular/common/http'
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'

import { provideClientHydration } from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(),
  ],
}
