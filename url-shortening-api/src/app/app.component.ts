import { isPlatformBrowser } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return
    fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      body: JSON.stringify({
        url: encodeURI("http://google.com/"),
      }),
    })
      .then((res) => res.json())
      .then(console.log)
  }
}
