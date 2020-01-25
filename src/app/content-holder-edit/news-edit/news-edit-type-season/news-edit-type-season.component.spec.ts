import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditTypeSeasonComponent } from './news-edit-type-season.component';

describe('NewsEditTypeSeasonComponent', () => {
  let component: NewsEditTypeSeasonComponent;
  let fixture: ComponentFixture<NewsEditTypeSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEditTypeSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditTypeSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
