import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from "./admin-user.component";
import {AdminUserDetailComponent} from "./admin-user-detail/admin-user-detail.component";
import {AdminUserDialogComponent} from "./admin-user-dialog/admin-user-dialog.component";
import {AdminUserToggleComponent} from "./admin-user-toggle/admin-user-toggle.component";
import {
  MatButtonModule, MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSlideToggleModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SeasonsComponent} from "./seasons/seasons.component";

@NgModule({
  declarations: [
    AdminUserDetailComponent,
    AdminUserDialogComponent,
    AdminUserToggleComponent,
    AdminUserComponent,
    SeasonsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    MatDividerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [AdminUserComponent,
    SeasonsComponent]
})
export class AdminModule {
}
