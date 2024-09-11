import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-your-cart',
  standalone: true,
  template: `
    <div class="grid place-items-center rounded-xl bg-white p-4">
      <h2
        class="mb-4 justify-self-start text-2xl font-bold text-red md:justify-self-center"
      >
        Your Cart ({{ selectedProducts().length }})
      </h2>
      @if (!selectedProducts().length) {
        <img src="assets/images/illustration-empty-cart.svg" alt="Empty cart" />
        <p class="text-rose-500">Your added items will appear here</p>
      } @else {
        <div class="scrollbar grid max-h-96 w-full overflow-y-auto">
          @for (product of selectedProducts(); track $index) {
            <div
              data-testid="selected-products"
              class="grid grid-cols-2 border-b border-rose-100 pb-2"
            >
              <p class="font-bold text-rose-900">{{ product.name }}</p>
              <p class="col-start-1">
                <span class="font-semibold text-red"
                  >{{ product.quantity }}x
                </span>
                <span class="text-rose-300">
                  &#64; &#36;{{ product.price }}
                </span>
                <span class="font-semibold text-rose-500"
                  >&#36;{{ product.price * product.quantity }}</span
                >
              </p>

              <button
                data-testid="remove-all-button"
                (click)="removeAllProduct.emit(product)"
                class="col-start-2 row-span-2 row-start-1 ml-auto w-fit self-center rounded-full border border-rose-400 p-1"
              >
                <img
                  src="assets/images/icon-remove-item.svg"
                  alt="Remove item icon"
                />
              </button>
            </div>
          }
        </div>

        <p class="mt-4 flex w-full items-center justify-between text-rose-500">
          Order total
          <span class="text-2xl font-bold text-rose-900"
            >&#36;{{ totalCost() }}</span
          >
        </p>

        <div
          class="my-4 flex w-full justify-center rounded-md bg-rose-100 px-8 py-2"
        >
          <img
            src="assets/images/icon-carbon-neutral.svg"
            alt="Carbon neutral icon"
          />
          <p>
            This is a
            <span class="font-semibold text-rose-900"
              >carbo-neutral delivery</span
            >
          </p>
        </div>
        <button
          (click)="confirmOrder.emit()"
          class="w-full rounded-full bg-red px-4 py-2 text-white"
        >
          Confirm Order
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YourCartComponent {
  selectedProducts = input.required<ProductItem[]>();
  totalCost = input.required<number>();
  removeAllProduct = output<ProductItem>();
  confirmOrder = output();
}
