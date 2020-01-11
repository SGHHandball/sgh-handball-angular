import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentHolderComponent} from "./content-holder.component";
import {MatButtonModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {FbIconComponent} from "./fb-icon/fb-icon.component";

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
