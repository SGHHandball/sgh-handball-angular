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
@NgModule({
  declarations: [AddBtnComponent,
    DefaultInputDialogComponent,
    DefaultDialogComponent, SliderComponent],
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
    LazyLoadImageModule.forRoot({}),
    MatCardModule,
  ],
  exports: [
    AddBtnComponent,
    DefaultInputDialogComponent,
    DefaultDialogComponent,
    SliderComponent
  ]
})
export class SharedModule {
}
