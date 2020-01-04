import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
  TC_ROUTE_CDH,
  TC_ROUTE_EXECUTIVES, TC_ROUTE_HOME,
  TC_ROUTE_REFEREES, TC_ROUTE_TIME_KEEPER
} from "../translation.service";
import {ContentHolderComponent} from "./content-holder.component";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";

export const CONTENT_HOLDER_ROUTES: Routes = [

  {path: TC_ROUTE_EXECUTIVES, component: ContentHolderComponent},
  {path: TC_ROUTE_REFEREES, component: ContentHolderComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: ContentHolderComponent},
  {path: TC_ROUTE_CDH, component: ContentHolderComponent},
  {path: ROUTE_INDEX, component: ContentHolderComponent},
];


@NgModule({
  imports: [RouterModule.forChild(CONTENT_HOLDER_ROUTES)],
  exports: [RouterModule]
})
export class ContentHolderRoutingModule {
}

