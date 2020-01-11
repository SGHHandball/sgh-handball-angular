import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
  TC_ROUTE_CDH,
  TC_ROUTE_EXECUTIVES, TC_ROUTE_HOME,
  TC_ROUTE_REFEREES, TC_ROUTE_TIME_KEEPER,
} from "../translation.service";
import {ContentHolderEditComponent} from "./content-holder-edit.component";
import {TeamsComponent} from "../teams/teams.component";

export const CONTENT_HOLDER_EDIT_ROUTES: Routes = [

  {path: TC_ROUTE_EXECUTIVES, component: ContentHolderEditComponent},
  {path: TC_ROUTE_REFEREES, component: ContentHolderEditComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: ContentHolderEditComponent},
  {path: TC_ROUTE_CDH, component: ContentHolderEditComponent},
  {path: TC_ROUTE_HOME, component: ContentHolderEditComponent},
  {path: ':season' + '/' + ':teamAge', component: ContentHolderEditComponent},
];


@NgModule({
  imports: [RouterModule.forChild(CONTENT_HOLDER_EDIT_ROUTES)],
  exports: [RouterModule]
})
export class ContentHolderEditRoutingModule {
}

