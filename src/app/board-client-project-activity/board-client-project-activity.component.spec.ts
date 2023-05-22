import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardClientProjectActivityComponent } from './board-client-project-activity.component';

describe('BoardClientProjectActivityComponent', () => {
  let component: BoardClientProjectActivityComponent;
  let fixture: ComponentFixture<BoardClientProjectActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardClientProjectActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardClientProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
