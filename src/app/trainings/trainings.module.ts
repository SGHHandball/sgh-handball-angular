import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingsComponent} from "./trainings.component";
import {TrainingsEditDialogComponent} from "./trainings-edit-dialog/trainings-edit-dialog.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TrainingsRoutingModule} from "./trainings-routing.module";
import {FlexModule} from "@angular/flex-layout";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";

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
    MatDialogModule,
    TrainingsRoutingModule,
    FlexModule
  ],
  exports: [TrainingsComponent, TrainingsEditDialogComponent],
  entryComponents: [
    TrainingsEditDialogComponent]
})
export class TrainingsModule {
}
