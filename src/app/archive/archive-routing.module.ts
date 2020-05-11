import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {ArchiveComponent} from "./archive.component";
export const ARCHIVE_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: ArchiveComponent},
];


@NgModule({
  imports: [RouterModule.forChild(ARCHIVE_ROUTES)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule {
}

