import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirestoreSettingsToken} from "@angular/fire/firestore";
import {
  MatCardModule,
  MAT_DATE_LOCALE, MatProgressSpinnerModule, MatMenuModule, MatButtonModule
} from "@angular/material";
import {PendingChangesGuard} from "./guards/pending-changes.guard";
import {ImprintComponent} from './imprint/imprint.component';
import {LoginDialogComponent} from './app-shell/auth/login-dialog/login-dialog.component';
import {AdminUserDialogComponent} from './admin/admin-user-dialog/admin-user-dialog.component';
import {FunctionsRegionToken} from "@angular/fire/functions";
import {DefaultDialogComponent} from './shared/default-dialog/default-dialog.component';
import {HallsEditDialogComponent} from './halls/halls-edit-dialog/halls-edit-dialog.component';
import {TeamsChangeDialogComponent} from './teams/teams-change-dialog/teams-change-dialog.component';
import {DefaultInputDialogComponent} from './shared/default-input-dialog/default-input-dialog.component';
import {TeamsDeleteDialogComponent} from "./teams/teams-delete-dialog/teams-delete-dialog.component";
import {AbstractNewsComponent} from "./abstract/abstract-news.component";
import {TrainingsEditDialogComponent} from "./trainings/trainings-edit-dialog/trainings-edit-dialog.component";
import {HomeComponent} from './home/home.component';
import {RichTextEditorComponent} from './shared/rich-text-editor/rich-text-editor.component';
import {ContentHolderComponent} from "./content-holder/content-holder.component";
import {SponsorsComponent} from './sponsors/sponsors.component';
import {SponsorCardComponent} from './sponsors/sponsor-card/sponsor-card.component';
import {SponsorEditComponent} from './sponsors/sponsor-edit/sponsor-edit.component';
import {CookieDisclaimerComponent} from './cookie-disclaimer/cookie-disclaimer.component';
import {CookieService} from "ngx-cookie-service";
import {DataModule} from "./data/data.module";
import {SharedModule} from "./shared/shared.module";
import {AppShellModule} from "./app-shell/app-shell.module";
import {NewsModule} from "./news/news.module";
import {AdminModule} from "./admin/admin.module";
import {TeamsModule} from "./teams/teams.module";
import {HallsModule} from "./halls/halls.module";
import {TrainingsModule} from "./trainings/trainings.module";
import {DocumentsModule} from "./documents/documents.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {ContentHolderModule} from "./content-holder/content-holder.module";
import {SponsorsModule} from "./sponsors/sponsors.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ImprintComponent,
// @ts-ignore
    AbstractNewsComponent,
    HomeComponent,
    CookieDisclaimerComponent
  ],
  imports: [
    DataModule,
    SharedModule,
    NewsModule,
    AdminModule,
    AppShellModule,
    TeamsModule,
    BrowserModule,
    HallsModule,
    AppRoutingModule,
    MatCardModule,
    TrainingsModule,
    DocumentsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ContentHolderModule,
    SponsorsModule,
    LazyLoadImageModule.forRoot({}),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: FunctionsRegionToken, useValue: 'europe-west1'},
    {provide: FirestoreSettingsToken, useValue: {}},
    PendingChangesGuard,
    CookieService
  ],
  bootstrap: [AppComponent],
  exports: [
    RichTextEditorComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    AdminUserDialogComponent,
    DefaultDialogComponent,
    HallsEditDialogComponent,
    TeamsChangeDialogComponent,
    TeamsDeleteDialogComponent,
    CookieDisclaimerComponent,
    DefaultInputDialogComponent,
    TrainingsEditDialogComponent]
})
export class AppModule {
}
