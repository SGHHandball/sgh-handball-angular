import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTE_INDEX} from "./app-shell/sidenav/navigation-item";
import {
  TC_LOGIN, TC_LOGOUT,
  TC_PATH_EDIT,
  TC_ROUTE_CONTENT,
  TC_ROUTE_DOCUMENTS,
  TC_ROUTE_HALLS,
  TC_ROUTE_HOME,
  TC_ROUTE_IMPRINT,
  TC_ROUTE_SEASONS, TC_ROUTE_SGH,
  TC_ROUTE_SPONSORS,
  TC_ROUTE_TEAMS,
  TC_ROUTE_TRAINING,
  TC_USERS
} from "./translation.service";
import {ImprintComponent} from "./imprint/imprint.component";
import {AdminUserComponent} from "./admin/admin-user.component";
import {AuthGuard} from "./guards/auth.guard";
import {HallsComponent} from "./halls/halls.component";
import {TrainingsComponent} from "./trainings/trainings.component";
import {DocumentsComponent} from "./documents/documents.component";
import {HomeComponent} from "./home/home.component";
import {SeasonsComponent} from "./admin/seasons/seasons.component";
import {SponsorsComponent} from "./sponsors/sponsors.component";
import {SponsorEditComponent} from "./sponsors/sponsor-edit/sponsor-edit.component";
import {AuthComponent} from "./admin/auth/auth.component";

export const routes = [
  {path: TC_ROUTE_HOME, component: HomeComponent},
  {
    path: TC_ROUTE_SGH,
    loadChildren: './news/news.module#NewsModule'
  },
  {
    path: TC_ROUTE_TEAMS,
    loadChildren: './teams/teams.module#TeamsModule'
  },
  {
    path: TC_ROUTE_CONTENT,
    loadChildren: './content-holder/content-holder.module#ContentHolderModule'
  },
  {path: TC_ROUTE_HALLS, component: HallsComponent},
  {path: TC_LOGIN, component: AuthComponent},
  {path: TC_LOGOUT, component: AuthComponent},
  {path: TC_ROUTE_TRAINING, component: TrainingsComponent},
  {path: TC_ROUTE_DOCUMENTS, component: DocumentsComponent},
  {path: TC_ROUTE_SPONSORS, component: SponsorsComponent},
  {path: TC_ROUTE_SPONSORS + '/' + TC_PATH_EDIT + '/' + ':sponsorId', component: SponsorEditComponent},
  {
    path: TC_USERS,
    component: AdminUserComponent,
    canActivate: [AuthGuard]
  },
  {path: TC_ROUTE_IMPRINT, component: ImprintComponent},
  {
    path: TC_ROUTE_SEASONS,
    component: SeasonsComponent,
    canActivate: [AuthGuard]
  },
  {path: ROUTE_INDEX, redirectTo: TC_ROUTE_HOME, pathMatch: 'full'},
  {path: '**', redirectTo: TC_ROUTE_HOME}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

