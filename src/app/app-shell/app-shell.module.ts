import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppShellComponent} from "./app-shell.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {RouterModule} from "@angular/router";
import {
  MatButtonModule, MatDialogModule,
  MatDividerModule,
  MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import {SidenavListItemComponent} from "./sidenav/sidenav-list-item/sidenav-list-item.component";
import {SidenavSubMenuComponent} from "./sidenav/sidenav-sub-menu/sidenav-sub-menu.component";
import {ReactiveFormsModule} from "@angular/forms";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppShellComponent,
    ToolbarComponent,
    SidenavComponent,
    SidenavListItemComponent,
    SidenavSubMenuComponent,
    LoadingComponent],
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
