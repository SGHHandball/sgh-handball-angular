import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatSnackBarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "@angular/cdk/layout";
import {AddBtnComponent} from "./add-btn/add-btn.component";
import {DefaultInputDialogComponent} from "./default-input-dialog/default-input-dialog.component";
import {DefaultDialogComponent} from "./default-dialog/default-dialog.component";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {SliderComponent} from "./slider/slider.component";
import {RichTextEditorComponent} from "./rich-text-editor/rich-text-editor.component";
import {NgxEditorModule} from "ngx-editor";

@NgModule({
  declarations: [AddBtnComponent,
    DefaultInputDialogComponent,
    DefaultDialogComponent, SliderComponent,RichTextEditorComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    LayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    NgxEditorModule,
    LazyLoadImageModule.forRoot({}),
    MatCardModule,
  ],
  exports: [
    AddBtnComponent,
    DefaultInputDialogComponent,
    DefaultDialogComponent,
    SliderComponent,
    RichTextEditorComponent
  ]
})
export class SharedModule {
}
