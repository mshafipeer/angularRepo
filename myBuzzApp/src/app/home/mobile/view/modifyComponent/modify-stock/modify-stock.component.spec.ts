import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStockComponent } from './modify-stock.component';

describe('ModifyStockComponent', () => {
  let component: ModifyStockComponent;
  let fixture: ComponentFixture<ModifyStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
