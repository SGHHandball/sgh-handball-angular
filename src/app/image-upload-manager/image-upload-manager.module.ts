import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUploadManagerComponent} from "./image-upload-manager.component";
import {ImageUploadComponent} from "./image-upload/image-upload.component";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [ImageUploadManagerComponent, ImageUploadComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    LazyLoadImageModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ImageUploadManagerComponent
  ]
})
export class ImageUploadManagerModule {
}
