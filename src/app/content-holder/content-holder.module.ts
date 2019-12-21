import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderComponent} from "./content-holder.component";
import {MatButtonModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [ContentHolderComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ImageUploadManagerModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatMenuModule
  ],
  exports: [ContentHolderComponent],
})
export class ContentHolderModule {
}
