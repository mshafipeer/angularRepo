import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMobilePartsComponent } from './modify-mobile-parts.component';

describe('ModifyMobilePartsComponent', () => {
  let component: ModifyMobilePartsComponent;
  let fixture: ComponentFixture<ModifyMobilePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyMobilePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMobilePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
