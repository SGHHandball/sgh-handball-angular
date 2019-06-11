import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ROUTE_INDEX} from "./app-shell/sidenav/navigation-item";
import {NewsComponent} from "./news/news.component";
import {NewsEditComponent} from "./news/news-edit/news-edit.component";
import {
  TC_NEWS_PATH_DETAIL,
  TC_NEWS_PATH_EDIT, TC_ROUTE_HALLS,
  TC_ROUTE_IMPRINT,
  TC_ROUTE_NEWS, TC_ROUTE_TEAMS, TC_USERS
} from "./translation.service";
import {PendingChangesGuard} from "./guards/pending-changes.guard";
import {ImprintComponent} from "./imprint/imprint.component";
import {AdminUserComponent} from "./admin/admin-user.component";
import {AuthGuard} from "./guards/auth.guard";
import {TeamsComponent} from "./teams/teams.component";
import {HallsComponent} from "./halls/halls.component";

export const routes = [
  {path: ROUTE_INDEX, redirectTo: TC_ROUTE_NEWS, pathMatch: 'full'},
  {path: TC_ROUTE_NEWS, component: NewsComponent},
  {path: TC_ROUTE_TEAMS, component: TeamsComponent},
  {path: TC_ROUTE_HALLS, component: HallsComponent},
  {
    path: TC_ROUTE_NEWS + '/' + TC_NEWS_PATH_EDIT,
    component: NewsEditComponent,
    canDeactivate: [PendingChangesGuard]
  },
  {
    path: TC_ROUTE_NEWS + '/' + TC_NEWS_PATH_DETAIL,
    component: NewsEditComponent,
    canDeactivate: [PendingChangesGuard]
  },
  {
    path: TC_USERS,
    component: AdminUserComponent,
    canActivate: [AuthGuard]
  },
  {path: TC_ROUTE_IMPRINT, component: ImprintComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

