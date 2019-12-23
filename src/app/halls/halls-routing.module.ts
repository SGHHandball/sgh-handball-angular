import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {HallsComponent} from "./halls.component";

export const HALL_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: HallsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(HALL_ROUTES)],
  exports: [RouterModule]
})
export class HallsRoutingModule {
}

