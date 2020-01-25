import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from "./news.component";
import {NewsEditComponent} from "../content-holder-edit/news-edit/news-edit.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {NewsCardListComponent} from "./news-card-list/news-card-list.component";
import {NewsCardDetailComponent} from "./news-card-detail/news-card-detail.component";
import {NewsMoreMenuComponent} from "./news-more-menu/news-more-menu.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatTooltipModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {EventsComponent} from "./events/events.component";
import {NewsRoutingModule} from "./news-routing.module";
import { NewsEditAdminDateComponent } from '../content-holder-edit/news-edit/news-edit-admin-date/news-edit-admin-date.component';
import {SpecialComponent} from "./special/special.component";
import { NewsEditReportPartComponent } from '../content-holder-edit/news-edit/news-edit-report-part/news-edit-report-part.component';
import { NewsEditTypeSeasonComponent } from '../content-holder-edit/news-edit/news-edit-type-season/news-edit-type-season.component';

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
