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
import {FunctionsRegionToken} from "@angular/fire/functions";
import {DefaultDialogComponent} from './shared/default-dialog/default-dialog.component';
import {HallsEditDialogComponent} from './halls/halls-edit-dialog/halls-edit-dialog.component';
import {DefaultInputDialogComponent} from './shared/default-input-dialog/default-input-dialog.component';
import {AbstractNewsComponent} from "./abstract/abstract-news.component";
import {TrainingsEditDialogComponent} from "./trainings/trainings-edit-dialog/trainings-edit-dialog.component";
import {HomeComponent} from './home/home.component';
import {CookieDisclaimerComponent} from './cookie-disclaimer/cookie-disclaimer.component';
import {CookieService} from "ngx-cookie-service";
import {DataModule} from "./data/data.module";
import {SharedModule} from "./shared/shared.module";
import {AppShellModule} from "./app-shell/app-shell.module";
import {HallsModule} from "./halls/halls.module";
import {TrainingsModule} from "./trainings/trainings.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
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
    AppShellModule,
    BrowserModule,
    HallsModule,
    AppRoutingModule,
    MatCardModule,
    TrainingsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    LazyLoadImageModule.forRoot({}),
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: FunctionsRegionToken, useValue: 'europe-west1'},
    {provide: FirestoreSettingsToken, useValue: {}},
    PendingChangesGuard,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DefaultDialogComponent,
    HallsEditDialogComponent,
    CookieDisclaimerComponent,
    DefaultInputDialogComponent,
    TrainingsEditDialogComponent]
})
export class AppModule {
}
