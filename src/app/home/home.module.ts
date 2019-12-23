import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatMenuModule,
    LazyLoadImageModule.forRoot({}),
  ],
  exports: [HomeComponent, ]
})
export class TrainingsModule {
}
