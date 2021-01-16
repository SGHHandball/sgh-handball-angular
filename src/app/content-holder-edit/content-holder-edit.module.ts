import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderEditComponent} from "./content-holder-edit.component";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {SharedModule} from "../shared/shared.module";
import {RichTextEditorComponent} from "./rich-text-editor/rich-text-editor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContentHolderEditRoutingModule} from "./content-holder-edit-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsEditAdminDateComponent} from "./news-edit/news-edit-admin-date/news-edit-admin-date.component";
import {NewsEditReportPartComponent} from "./news-edit/news-edit-report-part/news-edit-report-part.component";
import {NewsEditTypeSeasonComponent} from "./news-edit/news-edit-type-season/news-edit-type-season.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {JoditAngularModule} from "jodit-angular";

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
    JoditAngularModule,
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
