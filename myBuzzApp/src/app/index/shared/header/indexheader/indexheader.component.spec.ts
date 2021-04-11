import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexheaderComponent } from './indexheader.component';

describe('IndexheaderComponent', () => {
  let component: IndexheaderComponent;
  let fixture: ComponentFixture<IndexheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
