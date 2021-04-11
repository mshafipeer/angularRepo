import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifybrandComponent } from './modifybrand.component';

describe('ModifybrandComponent', () => {
  let component: ModifybrandComponent;
  let fixture: ComponentFixture<ModifybrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifybrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
