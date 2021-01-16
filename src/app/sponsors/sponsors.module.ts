import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SponsorsComponent} from "./sponsors.component";
import {SponsorCardComponent} from "./sponsor-card/sponsor-card.component";
import {SponsorEditComponent} from "./sponsor-edit/sponsor-edit.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {SponsorsRoutingModule} from "./sponsors-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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
    LazyLoadImageModule,
    SponsorsRoutingModule
  ],
  exports: [
    SponsorsComponent,]
})
export class SponsorsModule {
}
