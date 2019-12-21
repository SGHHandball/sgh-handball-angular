import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
  TC_ROUTE_CDH,
  TC_ROUTE_EXECUTIVES, TC_ROUTE_HOME_EDIT,
   TC_ROUTE_REFEREES, TC_ROUTE_TIME_KEEPER
} from "../translation.service";
import {ContentHolderComponent} from "./content-holder.component";

export const CONTENT_HOLDER_ROUTES: Routes = [

  {path: TC_ROUTE_EXECUTIVES, component: ContentHolderComponent},
  {path: TC_ROUTE_REFEREES, component: ContentHolderComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: ContentHolderComponent},
  {path: TC_ROUTE_CDH, component: ContentHolderComponent},
  {path: TC_ROUTE_HOME_EDIT, component: ContentHolderComponent},
];


@NgModule({
  imports: [RouterModule.forChild(CONTENT_HOLDER_ROUTES)],
  exports: [RouterModule]
})
export class ContentHolderRoutingModule {
}

