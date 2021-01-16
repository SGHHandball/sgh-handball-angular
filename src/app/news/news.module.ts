import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from "./news.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {NewsCardListComponent} from "./news-card-list/news-card-list.component";
import {NewsCardDetailComponent} from "./news-card-detail/news-card-detail.component";
import {NewsMoreMenuComponent} from "./news-more-menu/news-more-menu.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {EventsComponent} from "./events/events.component";
import {NewsRoutingModule} from "./news-routing.module";
import {SpecialComponent} from "./special/special.component";

@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent,
    NewsCardListComponent,
    NewsCardDetailComponent,
    NewsMoreMenuComponent,
    EventsComponent,
    SpecialComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    LazyLoadImageModule.forRoot({}),
    NewsRoutingModule
  ],
  exports: [
    NewsComponent,
    NewsCardComponent,
    NewsCardListComponent,
    NewsCardDetailComponent,
    NewsMoreMenuComponent,
    EventsComponent,
    SpecialComponent
  ]
})
export class NewsModule {
}
