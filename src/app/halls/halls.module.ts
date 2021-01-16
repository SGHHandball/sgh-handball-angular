import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HallsComponent} from "./halls.component";
import {HallsEditDialogComponent} from "./halls-edit-dialog/halls-edit-dialog.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HallsRoutingModule} from "./halls-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [HallsComponent,
    HallsEditDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    HallsRoutingModule
  ],
  exports: [HallsComponent],
  entryComponents: [
    HallsEditDialogComponent,]
})
export class HallsModule {
}
