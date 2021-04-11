import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCodeComponent } from './system-code.component';

describe('SystemCodeComponent', () => {
  let component: SystemCodeComponent;
  let fixture: ComponentFixture<SystemCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
