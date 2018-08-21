import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousTrickComponent } from './previous-trick.component';

describe('PreviousTrickComponent', () => {
  let component: PreviousTrickComponent;
  let fixture: ComponentFixture<PreviousTrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousTrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousTrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
