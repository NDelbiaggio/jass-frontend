import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresBoardComponent } from './scores-board.component';

describe('ScoresBoardComponent', () => {
  let component: ScoresBoardComponent;
  let fixture: ComponentFixture<ScoresBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
