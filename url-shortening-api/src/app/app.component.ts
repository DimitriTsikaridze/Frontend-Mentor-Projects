import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Observable } from 'rxjs'

interface ShortUrl {
  data: {
    destination_url: string
    short_url: string
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private http = inject(HttpClient)

  shortenUrl(url: string): Observable<ShortUrl> {
    return this.http.post<ShortUrl>('https://smolurl.com/api/links', { url })
  }
}
