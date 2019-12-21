import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderComponent} from "./content-holder.component";
import {MatButtonModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {RichTextEditorModule} from "../rich-text-editor/rich-text-editor.module";

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
    MatMenuModule,
    RichTextEditorModule
  ],
  exports: [ContentHolderComponent],
})
export class ContentHolderModule {
}
