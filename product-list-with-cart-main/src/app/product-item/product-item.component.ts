import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ProductItem } from './product-item';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  host: { class: 'w-fit block' },
  template: `
    <picture class="relative">
      <source media="(max-width: 375px)" [srcset]="product().image.mobile" />
      <source media="(max-width: 768px)" [srcset]="product().image.tablet" />
      <source media="(max-width: 1024px)" [srcset]="product().image.desktop" />
      <img
        class="rounded-xl"
        [ngClass]="{ 'outline outline-2 outline-red': quantity() }"
        width="295"
        height="282"
        priority
        [ngSrc]="product().image.desktop"
        [alt]="product().name"
      />

      @if (quantity()) {
        <div
          class="absolute bottom-0 left-1/2 flex w-full max-w-[70%] -translate-x-1/2 translate-y-1/2 items-center justify-between gap-2 rounded-full border border-red bg-red px-4 py-2 font-bold text-white transition"
        >
          <button
            class="aspect-square rounded-full border border-white p-1"
            (click)="removeFromCart.emit(product())"
          >
            <img
              src="assets/images/icon-decrement-quantity.svg"
              alt="Decrement"
            />
          </button>
          {{ quantity() }}
          <button
            class="aspect-square rounded-full border border-white p-1"
            (click)="addToCart.emit(product())"
          >
            <img
              src="assets/images/icon-increment-quantity.svg"
              alt="Increment"
            />
          </button>
        </div>
      } @else {
        <button
          (click)="addToCart.emit(product())"
          class="absolute bottom-0 left-1/2 flex w-full max-w-[70%] -translate-x-1/2 translate-y-1/2 justify-center gap-2 rounded-full border border-rose-950 bg-white px-4 py-2 font-bold transition hover:border-rose-600 hover:text-rose-600"
        >
          <img src="assets/images/icon-add-to-cart.svg" alt="Cart Icon" />
          Add to Cart
        </button>
      }
    </picture>
    <p class="mt-8 text-xs text-rose-500">{{ product().category }}</p>
    <h3 class="font-bold text-rose-950">{{ product().name }}</h3>
    <p class="text-sm font-bold text-red">&#36;{{ product().price }}</p>
  `,
  imports: [NgClass, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  product = input.required<ProductItem>();
  selectedProducts = input.required<ProductItem[]>();
  addToCart = output<ProductItem>();
  removeFromCart = output<ProductItem>();
  quantity = computed(
    () =>
      this.selectedProducts().find((p) => p.name === this.product().name)
        ?.quantity ?? 0,
  );
}
