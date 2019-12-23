import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {DocumentsComponent} from "./documents.component";

export const DOCUMTENTS_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: DocumentsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(DOCUMTENTS_ROUTES)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule {
}

