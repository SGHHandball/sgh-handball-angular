import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardDetailComponent } from './news-card-detail.component';

describe('NewsCardDetailComponent', () => {
  let component: NewsCardDetailComponent;
  let fixture: ComponentFixture<NewsCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
