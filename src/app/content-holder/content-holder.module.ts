import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderComponent} from "./content-holder.component";
import {MatButtonModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {RichTextEditorComponent} from "./rich-text-editor/rich-text-editor.component";
import {NgxEditorModule} from "ngx-editor";
import {FormsModule} from "@angular/forms";
import {ContentHolderRoutingModule} from "./content-holder-routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [ContentHolderComponent, RichTextEditorComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ImageUploadManagerModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatMenuModule,
    NgxEditorModule,
    FormsModule,
    ContentHolderRoutingModule,
    HttpClientModule
  ],
  exports: [ContentHolderComponent, RichTextEditorComponent],
})
export class ContentHolderModule {
}
