import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Locations } from '../app';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  host: {
    class: 'mx-auto mt-12 mb-8 flex max-w-lg items-center gap-2'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  search = output<string>();
  locations = input.required<Locations | undefined>();
}
