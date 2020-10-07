import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTE_INDEX} from "./app-shell/sidenav/navigation-item";
import {
  TC_ADMIN, TC_ROUTE_CDH,
  TC_ROUTE_DOCUMENTS, TC_ROUTE_EXECUTIVES,
  TC_ROUTE_HALLS,
  TC_ROUTE_HOME, TC_ROUTE_EDIT,
  TC_ROUTE_IMPRINT, TC_ROUTE_LOADING, TC_ROUTE_REFEREES,
  TC_ROUTE_SGH,
  TC_ROUTE_SPONSORS,
  TC_ROUTE_TEAMS, TC_ROUTE_TIME_KEEPER,
  TC_ROUTE_TRAINING, TC_ROUTE_ARCHIVE, TC_ROUTE_CORONA,
} from "./translation.service";
import {ContentHolderComponent} from "./content-holder/content-holder.component";

export const routes = [
  {
    path: TC_ROUTE_SGH,
    loadChildren: './news/news.module#NewsModule'
  },
  {
    path: TC_ROUTE_TEAMS,
    loadChildren: './teams/teams.module#TeamsModule'
  },
  {path: TC_ROUTE_EXECUTIVES, component: ContentHolderComponent},
  {path: TC_ROUTE_REFEREES, component: ContentHolderComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: ContentHolderComponent},
  {path: TC_ROUTE_CORONA, component: ContentHolderComponent},
  {path: TC_ROUTE_CDH, component: ContentHolderComponent},
  {path: TC_ROUTE_HOME, component: ContentHolderComponent},
  {
    path: TC_ROUTE_EDIT,
    loadChildren: './content-holder-edit/content-holder-edit.module#ContentHolderEditModule'
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
  {
    path: TC_ROUTE_ARCHIVE,
    loadChildren: './archive/archive.module#ArchiveModule'
  },
  {path: ROUTE_INDEX, redirectTo: TC_ROUTE_HOME, pathMatch: 'full'},
  {path: '**', redirectTo: TC_ROUTE_HOME}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

