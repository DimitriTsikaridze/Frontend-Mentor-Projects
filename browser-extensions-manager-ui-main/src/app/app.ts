import { NgOptimizedImage } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import * as z from 'zod/v4-mini';

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
  imports: [NgOptimizedImage],
  template: `
    <header class="flex justify-between bg-neutral-700">
      <img width="179" height="41" ngSrc="images/logo.svg" priority alt="Logo" />
      <button>
        <img width="22" height="22" ngSrc="images/icon-sun.svg" alt="Light Mode" />
      </button>
      <!-- <button >
        <img width="22" height="22" ngSrc="images/icon-moon.svg" alt="Dark Mode" />
      </button> -->
    </header>
    <main>
      <div class="flex justify-between">
        <h1>Extensions List</h1>
        <div class="flex gap-2">
          <button class="cursor-pointer" (click)="query.set('all')">All</button>
          <button class="cursor-pointer" (click)="query.set('active')">Active</button>
          <button class="cursor-pointer" (click)="query.set('inactive')">Inactive</button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2">
        @for (extension of filteredExtensions(); track extension.name) {
        <div>
          <img width="60" height="60" [ngSrc]="extension.logo" [alt]="extension.name" />
          <p>{{ extension.name }}</p>
          <p>{{ extension.description }}</p>

          <div class="flex justify-between">
            <button (click)="removeExtension(extension.name)">Remove</button>
            <input
              (change)="toggleExtension(extension.name, $any($event.target).checked)"
              [checked]="extension.isActive"
              type="checkbox"
            />
          </div>
        </div>
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

  toggleExtension(name: string, isActive: boolean) {
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
