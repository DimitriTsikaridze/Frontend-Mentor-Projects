import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { ProductItem } from './product-item';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;

    const mockProduct: ProductItem = {
      quantity: 1,
      image: {
        thumbnail: 'test.png',
        mobile: 'test.png',
        tablet: 'test.png',
        desktop: 'test.png',
      },
      name: 'Waffle with Berries',
      category: 'Waffle',
      price: 6.5,
    };

    const mockSelectedProducts: ProductItem[] = [mockProduct];

    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('selectedProducts', mockSelectedProducts);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate product quantity based on selected products and product name', () => {
    const mockProduct = { name: 'test1' } as ProductItem;
    const mockSelectedProducts = [
      { name: 'test1', quantity: 2 },
    ] as ProductItem[];
    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('selectedProducts', mockSelectedProducts);
    expect(component.quantity()).toEqual(2);
  });

  it('should return 0 if product quantity is not found in selected products', () => {
    const mockProduct = { name: 'test1' } as ProductItem;
    const mockSelectedProducts = [
      { name: 'test2', quantity: 2 },
    ] as ProductItem[];
    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('selectedProducts', mockSelectedProducts);
    expect(component.quantity()).toEqual(0);
  });
});
