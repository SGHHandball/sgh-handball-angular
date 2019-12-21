import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUploadManagerComponent} from "./image-upload-manager.component";
import {ImageUploadComponent} from "./image-upload/image-upload.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule} from "@angular/material";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [ImageUploadManagerComponent, ImageUploadComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    LazyLoadImageModule.forRoot({}),
    MatProgressSpinnerModule,
  ],
  exports: [
    ImageUploadManagerComponent
  ]
})
export class ImageUploadManagerModule {
}
