import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TC_ROUTE_TEAMS} from "../translation.service";
import {TeamsComponent} from "./teams.component";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";

export const NEWS_ROUTES: Routes = [
  {path: ':season' + '/' + ':teamAge', component: TeamsComponent},
  {path: ':season', component: TeamsComponent},
  {path: ROUTE_INDEX, component: TeamsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(NEWS_ROUTES)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {
}

