import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCartComponent } from './your-cart.component';
import { ProductItem } from '../product-item/product-item';
import { By } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('YourCartComponent', () => {
  let component: YourCartComponent;
  let fixture: ComponentFixture<YourCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourCartComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(YourCartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedProducts', []);
    fixture.componentRef.setInput('totalCost', 10);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty cart if no product is selected', () => {
    const mockSelectedProducts = [] as ProductItem[];
    fixture.componentRef.setInput('selectedProducts', mockSelectedProducts);
    const emptyCart = fixture.debugElement.query(
      By.css('img[src="assets/images/illustration-empty-cart.svg"]'),
    );
    expect(emptyCart).toBeTruthy();
  });

  it('should show selected products', async () => {
    const mockSelectedProducts = [
      { name: 'Product 1', price: 10, quantity: 2 } as ProductItem,
      { name: 'Product 2', price: 30, quantity: 1 } as ProductItem,
    ];
    fixture.componentRef.setInput('selectedProducts', mockSelectedProducts);
    fixture.detectChanges();
    const productElements = fixture.debugElement.queryAll(
      By.css('[data-testid="selected-products"]'),
    );
    expect(productElements.length).toEqual(mockSelectedProducts.length);
  });

  it('should emit removeAllProduct event with product item', async () => {
    const mockSelectedProducts = [
      { name: 'Product 1', price: 10, quantity: 2 } as ProductItem,
    ];
    fixture.componentRef.setInput('selectedProducts', mockSelectedProducts);
    fixture.detectChanges();
    const removeAllButton = fixture.debugElement.query(
      By.css('[data-testid="remove-all-button"]'),
    );
    const removeAllProductSpy = spyOn(component.removeAllProduct, 'emit');
    removeAllButton.nativeElement.click();
    expect(removeAllProductSpy).toHaveBeenCalledWith(mockSelectedProducts[0]);
  });
});
