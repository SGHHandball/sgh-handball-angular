import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {ImprintComponent} from "./imprint.component";
export const IMPRINT_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: ImprintComponent},
];


@NgModule({
  imports: [RouterModule.forChild(IMPRINT_ROUTES)],
  exports: [RouterModule]
})
export class ImprintRoutingModule {
}

