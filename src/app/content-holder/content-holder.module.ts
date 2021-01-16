import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderComponent} from "./content-holder.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {FbIconComponent} from "./fb-icon/fb-icon.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [ContentHolderComponent,FbIconComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatMenuModule,
  ],
  exports: [ContentHolderComponent,FbIconComponent],
})
export class ContentHolderModule {
}
