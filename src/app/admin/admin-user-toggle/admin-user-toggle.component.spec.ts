import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserToggleComponent } from './admin-user-toggle.component';

describe('AdminUserToggleComponent', () => {
  let component: AdminUserToggleComponent;
  let fixture: ComponentFixture<AdminUserToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
