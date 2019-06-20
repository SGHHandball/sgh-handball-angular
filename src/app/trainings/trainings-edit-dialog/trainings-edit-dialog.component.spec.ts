import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsEditDialogComponent } from './trainings-edit-dialog.component';

describe('TrainingsEditDialogComponent', () => {
  let component: TrainingsEditDialogComponent;
  let fixture: ComponentFixture<TrainingsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
