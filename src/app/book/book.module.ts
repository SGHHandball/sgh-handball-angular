import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookComponent} from "./book.component";
import {BookRoutingModule} from "./book-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    PdfViewerModule,
    FlexLayoutModule
  ],
  exports: [BookComponent]
})
export class BookModule {
}
