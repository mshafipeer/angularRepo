import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBrandDetailsComponent } from './get-brand-details.component';

describe('GetBrandDetailsComponent', () => {
  let component: GetBrandDetailsComponent;
  let fixture: ComponentFixture<GetBrandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBrandDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBrandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
