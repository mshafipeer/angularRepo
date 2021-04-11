import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetModelDetailsComponent } from './get-model-details.component';

describe('GetModelDetailsComponent', () => {
  let component: GetModelDetailsComponent;
  let fixture: ComponentFixture<GetModelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetModelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
