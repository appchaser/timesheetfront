import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovepageComponent } from './approvepage.component';

describe('ApprovepageComponent', () => {
  let component: ApprovepageComponent;
  let fixture: ComponentFixture<ApprovepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
