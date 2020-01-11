import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderEditComponent} from "./content-holder-edit.component";
import {MatButtonModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {RichTextEditorComponent} from "./rich-text-editor/rich-text-editor.component";
import {NgxEditorModule} from "ngx-editor";
import {FormsModule} from "@angular/forms";
import {ContentHolderEditRoutingModule} from "./content-holder-edit-routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [ContentHolderEditComponent, RichTextEditorComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ImageUploadManagerModule,
    MatButtonModule,
    SharedModule,
    NgxEditorModule,
    FormsModule,
    ContentHolderEditRoutingModule,
    HttpClientModule
  ],
  exports: [ContentHolderEditComponent, RichTextEditorComponent],
})
export class ContentHolderEditModule {
}
