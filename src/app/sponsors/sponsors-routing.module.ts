import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
  TC_PATH_EDIT,
} from "../translation.service";
import {SponsorsComponent} from "./sponsors.component";
import {SponsorEditComponent} from "./sponsor-edit/sponsor-edit.component";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";

export const ADMIN_ROUTES: Routes = [
  {path: TC_PATH_EDIT + '/' + ':sponsorId', component: SponsorEditComponent},
  {path: ROUTE_INDEX, component: SponsorsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule {
}

