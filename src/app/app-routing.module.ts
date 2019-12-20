import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ROUTE_INDEX} from "./app-shell/sidenav/navigation-item";
import {NewsComponent} from "./news/news.component";
import {NewsEditComponent} from "./news/news-edit/news-edit.component";
import {
  TC_PATH_EDIT,
  TC_ROUTE_CDH, TC_ROUTE_DETAIL,
  TC_ROUTE_DOCUMENTS,
  TC_ROUTE_EVENTS,
  TC_ROUTE_EXECUTIVES,
  TC_ROUTE_HALLS,
  TC_ROUTE_HOME,
  TC_ROUTE_IMPRINT,
  TC_ROUTE_NEWS, TC_ROUTE_REFEREES, TC_ROUTE_SEASONS,
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
import {SeasonsComponent} from "./seasons/seasons.component";
import {NewsCardDetailComponent} from "./news/news-card-detail/news-card-detail.component";
import {ContentHolderComponent} from "./abstract/content-holder/content-holder.component";
import {SponsorsComponent} from "./sponsors/sponsors.component";
import {SponsorEditComponent} from "./sponsors/sponsor-edit/sponsor-edit.component";

export const routes = [
  {path: TC_ROUTE_HOME, component: HomeComponent},
  {path: TC_ROUTE_NEWS, component: NewsComponent},
  {path: TC_ROUTE_TEAMS + '/' + ':season' + '/' + ':teamAge', component: TeamsComponent},
  {path: TC_ROUTE_TEAMS + '/' + ':season', component: TeamsComponent},
  {path: TC_ROUTE_DETAIL + '/' + ':newsId', component: NewsCardDetailComponent},
  {path: TC_ROUTE_HALLS, component: HallsComponent},
  {path: TC_ROUTE_EVENTS, component: EventsComponent},
  {path: TC_ROUTE_TRAINING, component: TrainingsComponent},
  {path: TC_ROUTE_DOCUMENTS, component: DocumentsComponent},
  {path: TC_ROUTE_CDH, component: ContentHolderComponent},
  {path: TC_ROUTE_SPONSORS, component: SponsorsComponent},
  {path: TC_ROUTE_SPONSORS + '/' + TC_PATH_EDIT + '/' + ':sponsorId', component: SponsorEditComponent},
  {path: TC_ROUTE_EXECUTIVES, component: ContentHolderComponent},
  {path: TC_ROUTE_REFEREES, component: ContentHolderComponent},
  {path: TC_ROUTE_TIME_KEEPER, component: ContentHolderComponent},
  {
    path: TC_PATH_EDIT + '/' + ':newsId',
    component: NewsEditComponent,
    canDeactivate: [PendingChangesGuard]
  },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

