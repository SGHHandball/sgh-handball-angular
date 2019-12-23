import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentsComponent} from "./documents.component";
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTreeModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {DocumentsRoutingModule} from "./documents-routing.module";

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
