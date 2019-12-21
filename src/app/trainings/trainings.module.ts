import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingsComponent} from "./trainings.component";
import {TrainingsEditDialogComponent} from "./trainings-edit-dialog/trainings-edit-dialog.component";
import {
  MatButtonModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [TrainingsComponent, TrainingsEditDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    SharedModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [TrainingsComponent, TrainingsEditDialogComponent],
})
export class TrainingsModule {
}
