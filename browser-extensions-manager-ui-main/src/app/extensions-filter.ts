import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Query } from './app';

@Component({
  selector: 'app-extensions-filter',
  imports: [],
  template: `
    <div class="flex justify-between">
      <h1>Extensions List</h1>
      <div class="flex gap-2">
        <button class="cursor-pointer" (click)="queryChange.emit('all')">All</button>
        <button class="cursor-pointer" (click)="queryChange.emit('active')">Active</button>
        <button class="cursor-pointer" (click)="queryChange.emit('inactive')">Inactive</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtensionsFilter {
  queryChange = output<Query>();
}
