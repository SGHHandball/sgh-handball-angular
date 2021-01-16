import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppShellComponent} from "./app-shell.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {RouterModule} from "@angular/router";
import {SidenavListItemComponent} from "./sidenav/sidenav-list-item/sidenav-list-item.component";
import {SidenavSubMenuComponent} from "./sidenav/sidenav-sub-menu/sidenav-sub-menu.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppShellComponent,
    ToolbarComponent,
    SidenavComponent,
    SidenavListItemComponent,
    SidenavSubMenuComponent,],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    AppShellComponent,
    ToolbarComponent,
    SidenavComponent,
    SidenavListItemComponent,
    SidenavSubMenuComponent]
})
export class AppShellModule {
}
