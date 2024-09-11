import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmDialogComponent } from './order-confirm-dialog.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('OrderConfirmDialogComponent', () => {
  let component: OrderConfirmDialogComponent;
  let fixture: ComponentFixture<OrderConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmDialogComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedProducts', []);
    fixture.componentRef.setInput('totalCost', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
