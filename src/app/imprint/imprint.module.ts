import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImprintComponent} from "./imprint.component";
import {ImprintRoutingModule} from "./imprint-routing.module";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [ImprintComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ImprintRoutingModule
  ],
  exports: [ImprintComponent,]
})
export class ImprintModule {
}
