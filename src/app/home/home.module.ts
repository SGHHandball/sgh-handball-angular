import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {HomeRoutingModule} from "./home-routing.module";

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
    HomeRoutingModule
  ],
  exports: [HomeComponent,]
})
export class HomeModule {
}
