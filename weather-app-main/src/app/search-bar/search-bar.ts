import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  host: { class: 'mx-auto mt-12 mb-8 flex max-w-lg items-center gap-2' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {}
