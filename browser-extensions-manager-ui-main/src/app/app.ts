import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import * as z from 'zod/v4-mini';
import { Header } from './header';
import { ExtensionsFilter } from './extensions-filter';
import { ExtensionItem } from './extension-item';
import { RouterLinkActive } from '@angular/router';

const Extensions = z.array(
  z.object({
    logo: z.string(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
  })
);

@Component({
  selector: 'app-root',
  imports: [RouterLinkActive, Header, ExtensionsFilter, ExtensionItem],
  template: `
    <app-header routerLinkActive="text" />
    <main>
      <app-extensions-filter (queryChange)="query.set($event)" />
      <div class="grid grid-cols-3 gap-2">
        @for (extension of filteredExtensions(); track $index) {
        <app-extension-item
          (remove)="removeExtension($event)"
          (toggle)="toggleExtension($event)"
          [extension]="extension"
          [index]="$index"
        />
        }
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  query = signal<Query>('all');

  extensionsResource = httpResource(() => 'data.json', {
    defaultValue: [],
    parse: Extensions.parse,
  });

  filteredExtensions = computed(() => {
    const extensions = this.extensionsResource.value();
    const query = this.query();
    switch (query) {
      case 'active':
        return extensions.filter(({ isActive }) => isActive);
      case 'inactive':
        return extensions.filter(({ isActive }) => !isActive);
      default:
        return extensions;
    }
  });

  toggleExtension({ name, isActive }: { name: string; isActive: boolean }) {
    this.extensionsResource.update((extensions) => {
      return extensions.map((extension) => {
        if (extension.name === name) {
          return { ...extension, isActive };
        }
        return extension;
      });
    });
  }

  removeExtension(name: string) {
    this.extensionsResource.update((extensions) => {
      return extensions.filter((extension) => extension.name !== name);
    });
  }
}

export interface Extension {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type Query = 'all' | 'active' | 'inactive';
