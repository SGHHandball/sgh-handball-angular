import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material";
import {ImprintComponent} from "./imprint.component";
import {ImprintRoutingModule} from "./imprint-routing.module";

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
