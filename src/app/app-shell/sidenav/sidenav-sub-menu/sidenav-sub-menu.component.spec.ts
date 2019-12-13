import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSubMenuComponent } from './sidenav-sub-menu.component';

describe('SidenavSubMenuComponent', () => {
  let component: SidenavSubMenuComponent;
  let fixture: ComponentFixture<SidenavSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
