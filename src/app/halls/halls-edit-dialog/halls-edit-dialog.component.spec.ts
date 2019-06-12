import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallsEditDialogComponent } from './halls-edit-dialog.component';

describe('HallsEditDialogComponent', () => {
  let component: HallsEditDialogComponent;
  let fixture: ComponentFixture<HallsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
