import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsChangeDialogComponent } from './teams-change-dialog.component';

describe('TeamsChangeDialogComponent', () => {
  let component: TeamsChangeDialogComponent;
  let fixture: ComponentFixture<TeamsChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
