import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductStockViewDetailsComponent } from './get-product-stock-view-details.component';

describe('GetProductStockViewDetailsComponent', () => {
  let component: GetProductStockViewDetailsComponent;
  let fixture: ComponentFixture<GetProductStockViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProductStockViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProductStockViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
