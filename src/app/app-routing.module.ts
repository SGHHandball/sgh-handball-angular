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
  TC_ROUTE_TRAINING, TC_ROUTE_ARCHIVE, TC_ROUTE_CORONA, TC_ROUTE_BOOK, TC_ROUTE_HANDBALL,
} from "./translation.service";
import {ContentHolderComponent} from "./content-holder/content-holder.component";

export const routes = [
  {
    path: TC_ROUTE_SGH,
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  },
  {
    path: TC_ROUTE_TEAMS,
    loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule)
  },
  {path: TC_ROUTE_EXECUTIVES, component: ContentHolderComponent},
  {path: TC_ROUTE_REFEREES, component: ContentHolderComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: ContentHolderComponent},
  {path: TC_ROUTE_CORONA, component: ContentHolderComponent},
  {path: TC_ROUTE_HANDBALL, component: ContentHolderComponent},
  {path: TC_ROUTE_CDH, component: ContentHolderComponent},
  {path: TC_ROUTE_HOME, component: ContentHolderComponent},
  {
    path: TC_ROUTE_EDIT,
    loadChildren: () => import('./content-holder-edit/content-holder-edit.module').then(m => m.ContentHolderEditModule)
  },
  {
    path: TC_ADMIN,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: TC_ROUTE_SPONSORS,
    loadChildren: () => import('./sponsors/sponsors.module').then(m => m.SponsorsModule)
  },
  {
    path: TC_ROUTE_DOCUMENTS,
    loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
  },
  {
    path: TC_ROUTE_HALLS,
    loadChildren: () => import('./halls/halls.module').then(m => m.HallsModule)
  },
  {
    path: TC_ROUTE_TRAINING,
    loadChildren: () => import('./trainings/trainings.module').then(m => m.TrainingsModule)
  },
  {
    path: TC_ROUTE_IMPRINT,
    loadChildren: () => import('./imprint/imprint.module').then(m => m.ImprintModule)
  },
  {
    path: TC_ROUTE_ARCHIVE,
    loadChildren: () => import('./archive/archive.module').then(m => m.ArchiveModule)
  },
  {
    path: TC_ROUTE_BOOK,
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
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

