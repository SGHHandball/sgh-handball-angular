import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {BookComponent} from "./book.component";

export const BOOK_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: BookComponent},
];


@NgModule({
  imports: [RouterModule.forChild(BOOK_ROUTES)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}

