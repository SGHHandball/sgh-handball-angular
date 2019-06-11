import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDialogComponent } from './admin-user-dialog.component';

describe('AdminUserDialogComponent', () => {
  let component: AdminUserDialogComponent;
  let fixture: ComponentFixture<AdminUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
