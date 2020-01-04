import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTE_INDEX} from "./app-shell/sidenav/navigation-item";
import {
  TC_ADMIN,
  TC_ROUTE_DOCUMENTS,
  TC_ROUTE_HALLS,
  TC_ROUTE_HOME,
  TC_ROUTE_IMPRINT, TC_ROUTE_LOADING,
  TC_ROUTE_SGH,
  TC_ROUTE_SPONSORS,
  TC_ROUTE_TEAMS,
  TC_ROUTE_TRAINING,
} from "./translation.service";
import {ImprintComponent} from "./imprint/imprint.component";
import {LoadingComponent} from "./app-shell/loading/loading.component";

export const routes = [
  {
    path: TC_ROUTE_SGH,
    loadChildren: './news/news.module#NewsModule'
  },
  {
    path: TC_ROUTE_TEAMS,
    loadChildren: './teams/teams.module#TeamsModule'
  },
  {
    path: TC_ROUTE_HOME,
    loadChildren: './content-holder/content-holder.module#ContentHolderModule'
  },
  {
    path: TC_ADMIN,
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: TC_ROUTE_SPONSORS,
    loadChildren: './sponsors/sponsors.module#SponsorsModule'
  },
  {
    path: TC_ROUTE_DOCUMENTS,
    loadChildren: './documents/documents.module#DocumentsModule'
  },
  {
    path: TC_ROUTE_HALLS,
    loadChildren: './halls/halls.module#HallsModule'
  },
  {
    path: TC_ROUTE_TRAINING,
    loadChildren: './trainings/trainings.module#TrainingsModule'
  },
  {
    path: TC_ROUTE_IMPRINT,
    loadChildren: './imprint/imprint.module#ImprintModule'
  },

  {path: TC_ROUTE_LOADING, component: LoadingComponent},
  {path: ROUTE_INDEX, redirectTo: TC_ROUTE_LOADING, pathMatch: 'full'},
  {path: '**', redirectTo: TC_ROUTE_LOADING}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

