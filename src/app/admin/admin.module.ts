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
import {AuthComponent} from "./auth/auth.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {DefaultDialogComponent} from "../shared/default-dialog/default-dialog.component";
import {HallsEditDialogComponent} from "../halls/halls-edit-dialog/halls-edit-dialog.component";
import {CookieDisclaimerComponent} from "../cookie-disclaimer/cookie-disclaimer.component";
import {DefaultInputDialogComponent} from "../shared/default-input-dialog/default-input-dialog.component";
import {TrainingsEditDialogComponent} from "../trainings/trainings-edit-dialog/trainings-edit-dialog.component";

@NgModule({
  declarations: [
    AdminUserDetailComponent,
    AdminUserDialogComponent,
    AdminUserToggleComponent,
    AdminUserComponent,
    SeasonsComponent,
    AuthComponent
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
    MatIconModule,
    AdminRoutingModule
  ],
  exports: [AdminUserComponent,
    SeasonsComponent,
    AuthComponent],
  entryComponents: [
    LoginDialogComponent,
    AdminUserDialogComponent,]
})
export class AdminModule {
}
