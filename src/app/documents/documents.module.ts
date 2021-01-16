import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentsComponent} from "./documents.component";
import {SharedModule} from "../shared/shared.module";
import {DocumentsRoutingModule} from "./documents-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    DocumentsRoutingModule
  ],
  exports:[DocumentsComponent]
})
export class DocumentsModule { }
