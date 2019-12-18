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
  MatSortModule,
  MatTableModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatDividerModule,
  MatChipsModule,
  MatTabsModule, MatTooltipModule, MatTreeModule, MatCheckboxModule
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
import {TeamsComponent} from './teams/teams.component';
import {HallsComponent} from './halls/halls.component';
import {SidenavListItemComponent} from './app-shell/sidenav/sidenav-list-item/sidenav-list-item.component';
import {HallsEditDialogComponent} from './halls/halls-edit-dialog/halls-edit-dialog.component';
import {AddBtnComponent} from './abstract/add-btn/add-btn.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TeamsChangeDialogComponent} from './teams/teams-change-dialog/teams-change-dialog.component';
import {DefaultInputDialogComponent} from './abstract/default-input-dialog/default-input-dialog.component';
import {TeamsDetailComponent} from './teams/teams-detail/teams-detail.component';
import {NewsCardListComponent} from './news/news-card-list/news-card-list.component';
import {AngularFireStorageModule} from "@angular/fire/storage";
import {SlideshowModule} from "ng-simple-slideshow";
import {ImageUploadComponent} from './abstract/image-upload/image-upload.component';
import {TeamsDeleteDialogComponent} from "./teams/teams-delete-dialog/teams-delete-dialog.component";
import {ImageUploadManagerComponent} from './abstract/image-upload-manager/image-upload-manager.component';
import {SeasonsComponent} from './seasons/seasons.component';
import {EventsComponent} from './events/events.component';
import {AbstractNewsComponent} from "./abstract/abstract-news.component";
import {AdminUserToggleComponent} from './admin/admin-user-toggle/admin-user-toggle.component';
import {TrainingsComponent} from "./trainings/trainings.component";
import {TrainingsEditDialogComponent} from "./trainings/trainings-edit-dialog/trainings-edit-dialog.component";
import {DocumentsComponent} from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { NewsCardComponent } from './news/news-card/news-card.component';
import {HttpClientModule} from "@angular/common/http";
import { SidenavSubMenuComponent } from './app-shell/sidenav/sidenav-sub-menu/sidenav-sub-menu.component';
import { EmptyComponent } from './empty/empty.component';
import { NewsCardDetailComponent } from './news/news-card-detail/news-card-detail.component';

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
    AddBtnComponent,
    TeamsChangeDialogComponent,
    DefaultInputDialogComponent,
    TeamsDetailComponent,
    NewsCardListComponent,
    ImageUploadComponent,
    TeamsDeleteDialogComponent,
    ImageUploadManagerComponent,
    SeasonsComponent,
    EventsComponent,
// @ts-ignore
    AbstractNewsComponent,
    AdminUserToggleComponent,
    TrainingsComponent,
    TrainingsEditDialogComponent,
    DocumentsComponent,
    HomeComponent,
    NewsCardComponent,
    SidenavSubMenuComponent,
    EmptyComponent,
    NewsCardDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/auth, only needed for auth features,
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
    MatChipsModule,
    MatTabsModule,
    DragDropModule,
    SlideshowModule,
    MatTooltipModule,
    MatTreeModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: FunctionsRegionToken, useValue: 'europe-west1'},
    {provide: FirestoreSettingsToken, useValue: {}},
    PendingChangesGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, AdminUserDialogComponent,
    DefaultDialogComponent, HallsEditDialogComponent, TeamsChangeDialogComponent, TeamsDeleteDialogComponent,
    DefaultInputDialogComponent, TrainingsEditDialogComponent]
})
export class AppModule {
}
