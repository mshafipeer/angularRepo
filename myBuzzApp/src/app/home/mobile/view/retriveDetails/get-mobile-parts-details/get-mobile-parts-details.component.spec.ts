import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMobilePartsDetailsComponent } from './get-mobile-parts-details.component';

describe('GetMobilePartsDetailsComponent', () => {
  let component: GetMobilePartsDetailsComponent;
  let fixture: ComponentFixture<GetMobilePartsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMobilePartsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMobilePartsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
