import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SponsorsComponent} from "./sponsors.component";
import {SponsorCardComponent} from "./sponsor-card/sponsor-card.component";
import {SponsorEditComponent} from "./sponsor-edit/sponsor-edit.component";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [
    SponsorsComponent,
    SponsorCardComponent,
    SponsorEditComponent,],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    SharedModule,
    MatMenuModule,
    MatCardModule,
    ImageUploadManagerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LazyLoadImageModule.forRoot({}),
  ],
  exports: [
    SponsorsComponent,]
})
export class SponsorsModule {
}
