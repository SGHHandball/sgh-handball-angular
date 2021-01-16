import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUserComponent} from "./admin-user.component";
import {AdminUserDetailComponent} from "./admin-user-detail/admin-user-detail.component";
import {AdminUserDialogComponent} from "./admin-user-dialog/admin-user-dialog.component";
import {AdminUserToggleComponent} from "./admin-user-toggle/admin-user-toggle.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SeasonsComponent} from "./seasons/seasons.component";
import {AuthComponent} from "./auth/auth.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDividerModule} from "@angular/material/divider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AdminUserDetailComponent,
    AdminUserDialogComponent,
    AdminUserToggleComponent,
    AdminUserComponent,
    SeasonsComponent,
    AuthComponent,
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
    AdminRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [AdminUserComponent,
    SeasonsComponent,
    AuthComponent],
  entryComponents: [
    AdminUserDialogComponent,]
})
export class AdminModule {
}
