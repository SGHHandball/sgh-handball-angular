import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsDeleteDialogComponent } from './teams-delete-dialog.component';

describe('TeamsDeleteDialogComponent', () => {
  let component: TeamsDeleteDialogComponent;
  let fixture: ComponentFixture<TeamsDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
