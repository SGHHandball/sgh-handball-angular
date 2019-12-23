import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
  TC_LOGIN, TC_LOGOUT,
  TC_ROUTE_SEASONS,
  TC_USERS
} from "../translation.service";
import {AdminUserComponent} from "./admin-user.component";
import {AuthGuard} from "../guards/auth.guard";
import {SeasonsComponent} from "./seasons/seasons.component";
import {AuthComponent} from "./auth/auth.component";
export const ADMIN_ROUTES: Routes = [
  {path: TC_LOGIN, component: AuthComponent},
  {path: TC_LOGOUT, component: AuthComponent},
  {
    path: TC_ROUTE_SEASONS,
    component: SeasonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: TC_USERS,
    component: AdminUserComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

