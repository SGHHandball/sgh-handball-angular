import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HallsComponent} from "./halls.component";
import {HallsEditDialogComponent} from "./halls-edit-dialog/halls-edit-dialog.component";
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HallsRoutingModule} from "./halls-routing.module";

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
