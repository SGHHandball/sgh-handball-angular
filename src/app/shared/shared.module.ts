import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "@angular/cdk/layout";
import {AddBtnComponent} from "./add-btn/add-btn.component";
import {DefaultInputDialogComponent} from "./default-input-dialog/default-input-dialog.component";
import {DefaultDialogComponent} from "./default-dialog/default-dialog.component";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {SliderComponent} from "./slider/slider.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";

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
    LazyLoadImageModule,
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
