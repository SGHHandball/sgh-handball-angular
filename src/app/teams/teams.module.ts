import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamsChangeDialogComponent} from "./teams-change-dialog/teams-change-dialog.component";
import {TeamsDetailComponent} from "./teams-detail/teams-detail.component";
import {TeamsDeleteDialogComponent} from "./teams-delete-dialog/teams-delete-dialog.component";
import {TeamsComponent} from "./teams.component";
import {NewsModule} from "../news/news.module";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {TeamsRoutingModule} from "./teams-routing.module";
import {ContentHolderModule} from "../content-holder/content-holder.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { TeamInformation } from './teams-detail/team-information/team-information';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    TeamsChangeDialogComponent,
    TeamsDeleteDialogComponent,
    TeamsDetailComponent,
    TeamsComponent,
    TeamInformation,],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NewsModule,
    SharedModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    ImageUploadManagerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    LazyLoadImageModule,
    TeamsRoutingModule,
    ContentHolderModule,
    FlexLayoutModule,
    MatTabsModule,
    MatDividerModule
  ],
  exports: [
    TeamsComponent,
    TeamsChangeDialogComponent,
    TeamsDeleteDialogComponent,],
  entryComponents: [
    TeamsChangeDialogComponent,
    TeamsDeleteDialogComponent,
  ]
})
export class TeamsModule {
}
