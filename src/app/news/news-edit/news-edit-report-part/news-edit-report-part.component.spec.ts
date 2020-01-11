import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditReportPartComponent } from './news-edit-report-part.component';

describe('NewsEditReportPartComponent', () => {
  let component: NewsEditReportPartComponent;
  let fixture: ComponentFixture<NewsEditReportPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEditReportPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditReportPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
