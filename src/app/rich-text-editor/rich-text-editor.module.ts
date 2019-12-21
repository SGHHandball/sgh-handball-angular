import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RichTextEditorComponent} from "./rich-text-editor.component";
import {NgxEditorModule} from "ngx-editor";
import {MatButtonModule, MatCardModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [RichTextEditorComponent],
  imports: [
    CommonModule,
    NgxEditorModule,
    MatCardModule,
    FormsModule,
    MatButtonModule
  ],
  exports:[
    RichTextEditorComponent
  ]
})
export class RichTextEditorModule { }
