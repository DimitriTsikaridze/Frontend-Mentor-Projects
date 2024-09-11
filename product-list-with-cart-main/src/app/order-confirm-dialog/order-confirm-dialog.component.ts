import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-order-confirm-dialog',
  standalone: true,
  template: `
    <dialog
      #dialog
      class="mb-0 h-[80%] w-full max-w-lg rounded-md bg-white p-6 backdrop:bg-black backdrop:opacity-40 md:mb-auto md:h-fit"
    >
      <img
        width="48"
        height="48"
        src="assets/images/icon-order-confirmed.svg"
        alt="Confirmed Icon"
      />
      <h3 class="mb-2 mt-3 text-3xl font-bold text-rose-900">
        Order Confirmed
      </h3>
      <p class="mb-4 text-rose-300">We hope you enjoy your food</p>

      <div class="grid gap-3 rounded-lg bg-rose-50 p-5">
        @for (product of selectedProducts(); track $index) {
          <div class="flex gap-2 border-b border-rose-100 pb-3">
            <img
              class="rounded-md"
              width="50"
              height="50"
              [src]="product.image.thumbnail"
              alt="Thumbnail image of {{ product.name }}"
            />

            <div>
              <p class="font-bold text-rose-900">{{ product.name }}</p>

              <p>
                <span class="font-semibold text-red"
                  >{{ product.quantity }}x &nbsp;&nbsp;
                </span>
                <span class="text-rose-300"
                  >&#64; &#36;{{ product.price }}
                </span>
              </p>
            </div>
            <p class="ml-auto font-semibold text-rose-900">
              &#36;{{ product.price * product.quantity }}
            </p>
          </div>
        }

        <p class="mt-3 flex justify-between">
          Order total

          <span class="text-2xl font-bold text-rose-900"
            >&#36;{{ totalCost() }}</span
          >
        </p>
      </div>

      <button
        (click)="startNewOrder.emit()"
        class="mt-4 w-full rounded-full bg-red px-4 py-2 text-white"
      >
        Start New Order
      </button>
    </dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmDialogComponent {
  dialogElementRef =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  startNewOrder = output();
  selectedProducts = input.required<ProductItem[]>();
  totalCost = input.required<number>();
}
