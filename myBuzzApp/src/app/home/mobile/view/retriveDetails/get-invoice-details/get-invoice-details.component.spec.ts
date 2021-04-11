import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInvoiceDetailsComponent } from './get-invoice-details.component';

describe('GetInvoiceDetailsComponent', () => {
  let component: GetInvoiceDetailsComponent;
  let fixture: ComponentFixture<GetInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
