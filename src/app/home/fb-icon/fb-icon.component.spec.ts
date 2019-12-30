import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbIconComponent } from './fb-icon.component';

describe('FbIconComponent', () => {
  let component: FbIconComponent;
  let fixture: ComponentFixture<FbIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
