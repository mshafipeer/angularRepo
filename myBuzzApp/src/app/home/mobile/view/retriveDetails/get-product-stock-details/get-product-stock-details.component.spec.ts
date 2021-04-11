import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductStockDetailsComponent } from './get-product-stock-details.component';

describe('GetProductStockDetailsComponent', () => {
  let component: GetProductStockDetailsComponent;
  let fixture: ComponentFixture<GetProductStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProductStockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProductStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
