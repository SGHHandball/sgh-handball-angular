import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMoreMenuComponent } from './news-more-menu.component';

describe('NewsMoreMenuComponent', () => {
  let component: NewsMoreMenuComponent;
  let fixture: ComponentFixture<NewsMoreMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsMoreMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
