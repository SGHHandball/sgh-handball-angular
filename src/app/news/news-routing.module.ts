import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TC_PATH_EDIT, TC_ROUTE_DETAIL, TC_ROUTE_EVENTS, TC_ROUTE_NEWS} from "../translation.service";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {NewsComponent} from "./news.component";
import {PendingChangesGuard} from "../guards/pending-changes.guard";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsCardDetailComponent} from "./news-card-detail/news-card-detail.component";
import {EventsComponent} from "./events/events.component";

export const NEWS_ROUTES: Routes = [
  {path: TC_ROUTE_DETAIL + '/' + ':newsId', component: NewsCardDetailComponent},
  {
    path: TC_PATH_EDIT + '/' + ':newsId',
    component: NewsEditComponent,
    canDeactivate: [PendingChangesGuard]
  },
  {path: TC_ROUTE_EVENTS, component: EventsComponent},
  {path: TC_ROUTE_NEWS, component: NewsComponent},
  {path: ROUTE_INDEX, component: NewsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(NEWS_ROUTES)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}

