import { Component, OnInit, computed, inject, viewChild } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsService } from './products.service';
import { YourCartComponent } from './your-cart/your-cart.component';
import { OrderConfirmDialogComponent } from './order-confirm-dialog/order-confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductItemComponent,
    YourCartComponent,
    OrderConfirmDialogComponent,
  ],
  host: { class: '' },
  template: `
    <div
      class="mx-auto grid w-fit grid-cols-1 gap-4 p-8 md:mx-0 md:w-full md:grid-cols-[70%_30%] md:items-start md:p-16"
    >
      <h1 class="mb-6 text-3xl font-bold text-rose-950">Desserts</h1>
      <div class="col-start-1 grid grid-cols-auto-fit-minmax gap-4">
        @for (product of productsService.products(); track product.name) {
          <app-product-item
            (addToCart)="productsService.addToCart($event)"
            (removeFromCart)="productsService.removeFromCart($event)"
            [selectedProducts]="productsService.selectedProducts()"
            [product]="product"
          />
        }
      </div>
      <app-your-cart
        [selectedProducts]="productsService.selectedProducts()"
        [totalCost]="productsService.totalCost()"
        (removeAllProduct)="productsService.removeAllProduct($event)"
        (confirmOrder)="dialogRef().showModal()"
        class="col-start-1 row-span-2 row-start-3 md:col-start-2 md:row-start-1"
      />

      <app-order-confirm-dialog
        [selectedProducts]="productsService.selectedProducts()"
        [totalCost]="productsService.totalCost()"
      />
    </div>
  `,
})
export class AppComponent implements OnInit {
  productsService = inject(ProductsService);
  orderConfirmComponent = viewChild.required(OrderConfirmDialogComponent);

  dialogRef = computed(
    () => this.orderConfirmComponent().dialogElementRef().nativeElement,
  );

  ngOnInit() {
    this.orderConfirmComponent().startNewOrder.subscribe(() => {
      this.dialogRef().close();
      this.productsService.selectedProducts.set([]);
    });
  }
}
