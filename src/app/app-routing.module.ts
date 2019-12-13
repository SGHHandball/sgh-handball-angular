import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ROUTE_INDEX} from "./app-shell/sidenav/navigation-item";
import {NewsComponent} from "./news/news.component";
import {NewsEditComponent} from "./news/news-edit/news-edit.component";
import {
  TC_NEWS_PATH_EDIT,
  TC_ROUTE_CDH,
  TC_ROUTE_DOCUMENTS,
  TC_ROUTE_EVENTS,
  TC_ROUTE_EXECUTIVES,
  TC_ROUTE_HALLS,
  TC_ROUTE_HOME,
  TC_ROUTE_IMPRINT,
  TC_ROUTE_NEWS, TC_ROUTE_REFEREES,
  TC_ROUTE_SPONSORS,
  TC_ROUTE_TEAMS, TC_ROUTE_TIME_KEEPER,
  TC_ROUTE_TRAINING,
  TC_USERS
} from "./translation.service";
import {PendingChangesGuard} from "./guards/pending-changes.guard";
import {ImprintComponent} from "./imprint/imprint.component";
import {AdminUserComponent} from "./admin/admin-user.component";
import {AuthGuard} from "./guards/auth.guard";
import {TeamsComponent} from "./teams/teams.component";
import {HallsComponent} from "./halls/halls.component";
import {EventsComponent} from "./events/events.component";
import {TrainingsComponent} from "./trainings/trainings.component";
import {DocumentsComponent} from "./documents/documents.component";
import {HomeComponent} from "./home/home.component";
import {EmptyComponent} from "./empty/empty.component";

export const routes = [
  {path: ROUTE_INDEX, redirectTo: TC_ROUTE_HOME, pathMatch: 'full'},
  {path: TC_ROUTE_HOME, component: HomeComponent},
  {path: TC_ROUTE_NEWS, component: NewsComponent},
  {path: TC_ROUTE_TEAMS + '/:teamAge', component: TeamsComponent},
  {path: TC_ROUTE_HALLS, component: HallsComponent},
  {path: TC_ROUTE_EVENTS, component: EventsComponent},
  {path: TC_ROUTE_TRAINING, component: TrainingsComponent},
  {path: TC_ROUTE_DOCUMENTS, component: DocumentsComponent},
  {path: TC_ROUTE_CDH, component: EmptyComponent},
  {path: TC_ROUTE_SPONSORS, component: EmptyComponent},
  {path: TC_ROUTE_EXECUTIVES, component: EmptyComponent},
  {path: TC_ROUTE_REFEREES, component: EmptyComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: EmptyComponent},
  {path: TC_ROUTE_DOCUMENTS, component: EmptyComponent},
  {
    path: [TC_ROUTE_NEWS, TC_NEWS_PATH_EDIT, ':newsId'].join('/'),
    component: NewsEditComponent,
    canDeactivate: [PendingChangesGuard]
  },
  {
    path: TC_ROUTE_EVENTS + '/' + TC_NEWS_PATH_EDIT,
    component: NewsEditComponent,
    canDeactivate: [PendingChangesGuard]
  },
  {
    path: TC_ROUTE_TEAMS + '/:teamAge' + '/' + TC_NEWS_PATH_EDIT,
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

