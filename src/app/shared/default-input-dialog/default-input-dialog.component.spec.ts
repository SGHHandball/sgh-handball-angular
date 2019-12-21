import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInputDialogComponent } from './default-input-dialog.component';

describe('DefaultInputDialogComponent', () => {
  let component: DefaultInputDialogComponent;
  let fixture: ComponentFixture<DefaultInputDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultInputDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
