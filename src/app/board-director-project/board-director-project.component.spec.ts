import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDirectorProjectComponent } from './board-director-project.component';

describe('BoardDirectorProjectComponent', () => {
  let component: BoardDirectorProjectComponent;
  let fixture: ComponentFixture<BoardDirectorProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDirectorProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDirectorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
