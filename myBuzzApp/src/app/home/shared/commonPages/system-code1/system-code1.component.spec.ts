import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCode1Component } from './system-code1.component';

describe('SystemCode1Component', () => {
  let component: SystemCode1Component;
  let fixture: ComponentFixture<SystemCode1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCode1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCode1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
