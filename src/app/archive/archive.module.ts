import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchiveComponent} from "./archive.component";
import {ArchiveRoutingModule} from "./archive-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [ArchiveComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ArchiveRoutingModule
  ],
  exports: [ArchiveComponent,]
})
export class ArchiveModule {
}
