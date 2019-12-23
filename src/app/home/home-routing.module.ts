import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {HomeComponent} from "./home.component";
export const HOME_ROUTES: Routes = [
  {path: ROUTE_INDEX, component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

