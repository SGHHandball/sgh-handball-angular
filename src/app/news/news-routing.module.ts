import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TC_ROUTE_DETAIL, TC_ROUTE_EVENTS, TC_ROUTE_NEWS, TC_ROUTE_SPECIAL} from "../translation.service";
import {ROUTE_INDEX} from "../app-shell/sidenav/navigation-item";
import {NewsComponent} from "./news.component";
import {NewsCardDetailComponent} from "./news-card-detail/news-card-detail.component";
import {EventsComponent} from "./events/events.component";
import {SpecialComponent} from "./special/special.component";

export const NEWS_ROUTES: Routes = [
  {path: TC_ROUTE_DETAIL + '/' + ':newsId', component: NewsCardDetailComponent},
  {path: TC_ROUTE_EVENTS + "/" + ":season", component: EventsComponent},
  {path: TC_ROUTE_SPECIAL + "/" + ":season", component: SpecialComponent},
  {path: TC_ROUTE_EVENTS, component: EventsComponent},
  {path: TC_ROUTE_SPECIAL, component: SpecialComponent},
  {path: TC_ROUTE_NEWS, component: NewsComponent},
  {path: ROUTE_INDEX, component: NewsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(NEWS_ROUTES)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}

