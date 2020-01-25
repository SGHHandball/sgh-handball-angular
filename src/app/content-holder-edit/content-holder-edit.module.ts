import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderEditComponent} from "./content-holder-edit.component";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatSelectModule
} from "@angular/material";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {SharedModule} from "../shared/shared.module";
import {RichTextEditorComponent} from "./rich-text-editor/rich-text-editor.component";
import {NgxEditorModule} from "ngx-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContentHolderEditRoutingModule} from "./content-holder-edit-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsEditAdminDateComponent} from "./news-edit/news-edit-admin-date/news-edit-admin-date.component";
import {NewsEditReportPartComponent} from "./news-edit/news-edit-report-part/news-edit-report-part.component";
import {NewsEditTypeSeasonComponent} from "./news-edit/news-edit-type-season/news-edit-type-season.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [ContentHolderEditComponent, RichTextEditorComponent,
    NewsEditComponent,
    NewsEditAdminDateComponent,
    NewsEditReportPartComponent,
    NewsEditTypeSeasonComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ImageUploadManagerModule,
    MatButtonModule,
    SharedModule,
    NgxEditorModule,
    FormsModule,
    ContentHolderEditRoutingModule,
    HttpClientModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDividerModule,
    ImageUploadManagerModule,
    MatSelectModule,
    MatNativeDateModule,
  ],
  exports: [ContentHolderEditComponent, RichTextEditorComponent,
    NewsEditComponent,],
})
export class ContentHolderEditModule {
}
