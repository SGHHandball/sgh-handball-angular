import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditAdminDateComponent } from './news-edit-admin-date.component';

describe('NewsEditAdminDateComponent', () => {
  let component: NewsEditAdminDateComponent;
  let fixture: ComponentFixture<NewsEditAdminDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEditAdminDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditAdminDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
