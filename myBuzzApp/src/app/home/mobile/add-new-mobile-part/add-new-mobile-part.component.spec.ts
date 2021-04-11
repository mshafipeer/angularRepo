import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMobilePartComponent } from './add-new-mobile-part.component';

describe('AddNewMobilePartComponent', () => {
  let component: AddNewMobilePartComponent;
  let fixture: ComponentFixture<AddNewMobilePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMobilePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMobilePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
