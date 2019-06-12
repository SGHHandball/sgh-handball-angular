import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AppShellComponent} from './app-shell/app-shell.component';
import {ToolbarComponent} from './app-shell/toolbar/toolbar.component';
import {AngularFirestoreModule, FirestoreSettingsToken} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatDialogModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSortModule, MatTableModule, MatSlideToggleModule, MatSnackBarModule, MatDividerModule, MatChipsModule
} from "@angular/material";
import {SidenavComponent} from './app-shell/sidenav/sidenav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {AbstractComponent} from './abstract/abstract.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NewsComponent} from './news/news.component';
import {NewsEditComponent} from './news/news-edit/news-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NewsMoreMenuComponent} from './news/news-more-menu/news-more-menu.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {PendingChangesGuard} from "./guards/pending-changes.guard";
import {ImprintComponent} from './imprint/imprint.component';
import {AuthComponent} from './app-shell/auth/auth.component';
import {LoginDialogComponent} from './app-shell/auth/login-dialog/login-dialog.component';
import {AdminUserComponent} from './admin/admin-user.component';
import {AdminUserDetailComponent} from './admin/admin-user-detail/admin-user-detail.component';
import {AdminUserDialogComponent} from './admin/admin-user-dialog/admin-user-dialog.component';
import {AngularFireFunctionsModule, FunctionsRegionToken} from "@angular/fire/functions";
import {DefaultDialogComponent} from './abstract/default-dialog/default-dialog.component';
import { TeamsComponent } from './teams/teams.component';
import { HallsComponent } from './halls/halls.component';
import { SidenavListItemComponent } from './app-shell/sidenav/sidenav-list-item/sidenav-list-item.component';
import { HallsEditDialogComponent } from './halls/halls-edit-dialog/halls-edit-dialog.component';
import { NewsFilterComponent } from './news/news-filter/news-filter.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
    ToolbarComponent,
    SidenavComponent,
    AbstractComponent,
    NewsComponent,
    NewsEditComponent,
    NewsMoreMenuComponent,
    ImprintComponent,
    AuthComponent,
    LoginDialogComponent,
    AdminUserComponent,
    AdminUserDetailComponent,
    AdminUserDialogComponent,
    DefaultDialogComponent,
    TeamsComponent,
    HallsComponent,
    SidenavListItemComponent,
    HallsEditDialogComponent,
    NewsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireFunctionsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: FunctionsRegionToken, useValue: 'europe-west1'},
    {provide: FirestoreSettingsToken, useValue: {}},
    PendingChangesGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, AdminUserDialogComponent, DefaultDialogComponent, HallsEditDialogComponent]
})
export class AppModule {
}
