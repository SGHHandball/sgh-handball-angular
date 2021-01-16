import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirestoreSettingsToken} from "@angular/fire/firestore";
import {
  MAT_DATE_LOCALE,
} from "@angular/material";
import {PendingChangesGuard} from "./guards/pending-changes.guard";
import {FunctionsRegionToken} from "@angular/fire/functions";
import {DefaultDialogComponent} from './shared/default-dialog/default-dialog.component';
import {DefaultInputDialogComponent} from './shared/default-input-dialog/default-input-dialog.component';
import {AbstractNewsComponent} from "./abstract/abstract-news.component";
import {CookieDisclaimerComponent} from './cookie-disclaimer/cookie-disclaimer.component';
import {CookieService} from "ngx-cookie-service";
import {DataModule} from "./data/data.module";
import {SharedModule} from "./shared/shared.module";
import {AppShellModule} from "./app-shell/app-shell.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ContentHolderModule} from "./content-holder/content-holder.module";

@NgModule({
  declarations: [
    AppComponent,
// @ts-ignore
    AbstractNewsComponent,
    CookieDisclaimerComponent
  ],
  imports: [
    DataModule,
    SharedModule,
    AppShellModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ContentHolderModule
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
    CookieDisclaimerComponent,
    DefaultInputDialogComponent,
  ]
})
export class AppModule {
}
