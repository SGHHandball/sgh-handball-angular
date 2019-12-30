import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {MatCardModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {HomeRoutingModule} from "./home-routing.module";
import { FbIconComponent } from './fb-icon/fb-icon.component';

@NgModule({
  declarations: [HomeComponent, FbIconComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatMenuModule,
    LazyLoadImageModule.forRoot({}),
    HomeRoutingModule,
  ],
  exports: [HomeComponent,FbIconComponent]
})
export class HomeModule {
}
