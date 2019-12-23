import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {TrainingsComponent} from "./trainings.component";
export const TRAININGS_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: TrainingsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(TRAININGS_ROUTES)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule {
}

