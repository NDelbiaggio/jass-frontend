import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtoutSelectorComponent } from './atout-selector.component';

describe('AtoutSelectorComponent', () => {
  let component: AtoutSelectorComponent;
  let fixture: ComponentFixture<AtoutSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtoutSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtoutSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
