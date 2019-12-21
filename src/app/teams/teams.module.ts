import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamsChangeDialogComponent} from "./teams-change-dialog/teams-change-dialog.component";
import {TeamsDetailComponent} from "./teams-detail/teams-detail.component";
import {TeamsDeleteDialogComponent} from "./teams-delete-dialog/teams-delete-dialog.component";
import {TeamsComponent} from "./teams.component";
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {NewsModule} from "../news/news.module";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [
    TeamsChangeDialogComponent,
    TeamsDeleteDialogComponent,
    TeamsDetailComponent,
    TeamsComponent,],
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
    LazyLoadImageModule.forRoot({}),
  ],
  exports:[
    TeamsComponent,
    TeamsChangeDialogComponent,
    TeamsDeleteDialogComponent,]
})
export class TeamsModule { }
