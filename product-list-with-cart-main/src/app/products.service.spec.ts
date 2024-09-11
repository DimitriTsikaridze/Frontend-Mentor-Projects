import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideHttpClient } from '@angular/common/http';
import { ProductItem } from './product-item/product-item';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove all products', () => {
    const product = {} as ProductItem;
    service.addToCart(product);
    service.removeAllProduct(product);
    expect(service.selectedProducts()).toEqual([]);
  });

  it('should remove from cart', () => {
    const product = {} as ProductItem;
    service.addToCart(product);
    service.removeFromCart(product);
    expect(service.selectedProducts()).toEqual([]);
  });

  it('should calculate total cost', () => {
    const mockSelectedProducts = [
      { price: 10, quantity: 2 },
      { price: 30, quantity: 1 },
    ] as ProductItem[];
    service.selectedProducts.set(mockSelectedProducts);
    expect(service.totalCost()).toEqual(50);
  });

  it('should increment quantity if product is already in cart', () => {
    const product = {} as ProductItem;
    service.addToCart(product);
    service.addToCart(product);
    expect(service.selectedProducts()).toEqual([{ ...product, quantity: 2 }]);
  });

  it('should not change other products when increasing the quantity of an existing product', () => {
    const productA = {
      name: 'Product A',
      price: 100,
      quantity: 1,
    } as ProductItem;
    const productB = {
      name: 'Product B',
      price: 200,
      quantity: 1,
    } as ProductItem;
    const initialProducts: ProductItem[] = [productA, productB];
    spyOn(service.selectedProducts, 'update').and.callFake((fn) => {
      const updatedProducts = fn(initialProducts);
      expect(updatedProducts).toEqual([
        { ...productA, quantity: 2 },
        { ...productB },
      ]);
    });

    service.addToCart(productA);
  });

  it('should not change other products when decreasing the quantity of an existing product', () => {
    const productA = {
      name: 'Product A',
      price: 100,
      quantity: 2,
    } as ProductItem;
    const productB = {
      name: 'Product B',
      price: 200,
      quantity: 1,
    } as ProductItem;
    const initialProducts: ProductItem[] = [productA, productB];
    spyOn(service.selectedProducts, 'update').and.callFake((fn) => {
      const updatedProducts = fn(initialProducts);
      expect(updatedProducts).toEqual([
        { ...productA, quantity: 1 },
        { ...productB },
      ]);
    });

    service.removeFromCart(productA);
  });
});
