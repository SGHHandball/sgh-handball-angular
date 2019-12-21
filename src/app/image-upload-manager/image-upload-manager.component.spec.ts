import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadManagerComponent } from './image-upload-manager.component';

describe('ImageUploadManagerComponent', () => {
  let component: ImageUploadManagerComponent;
  let fixture: ComponentFixture<ImageUploadManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
