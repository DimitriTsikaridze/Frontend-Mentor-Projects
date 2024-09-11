import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from './product-item/product-item';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #http = inject(HttpClient);

  products = toSignal(this.#http.get<ProductItem[]>('data.json'));

  selectedProducts = signal<ProductItem[]>([]);

  totalCost = computed(() =>
    this.selectedProducts().reduce((acc, p) => acc + p.price * p.quantity, 0),
  );

  addToCart(product: ProductItem) {
    this.selectedProducts.update((products) => {
      const existingProduct = products.find((p) => p.name === product.name);
      if (!existingProduct) return [...products, { ...product, quantity: 1 }];
      return products.map((p) =>
        p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p,
      );
    });
  }

  removeFromCart(product: ProductItem) {
    this.selectedProducts.update((products) =>
      products
        .map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity - 1 } : p,
        )
        .filter((p) => p.quantity > 0),
    );
  }

  removeAllProduct(product: ProductItem) {
    this.selectedProducts.update((products) =>
      products.filter((p) => p.name !== product.name),
    );
  }
}
