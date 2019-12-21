import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from "./news.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {NewsCardListComponent} from "./news-card-list/news-card-list.component";
import {NewsCardDetailComponent} from "./news-card-detail/news-card-detail.component";
import {NewsMoreMenuComponent} from "./news-more-menu/news-more-menu.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatTooltipModule
} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AppModule} from "../app.module";
import {ImageUploadManagerModule} from "../image-upload-manager/image-upload-manager.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {EventsComponent} from "./events/events.component";

@NgModule({
  declarations: [
    NewsComponent,
    NewsEditComponent,
    NewsCardComponent,
    NewsCardListComponent,
    NewsCardDetailComponent,
    NewsMoreMenuComponent,
    EventsComponent
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
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDividerModule,
    ImageUploadManagerModule,
    LazyLoadImageModule.forRoot({}),
    MatCheckboxModule,
  ],
  exports: [
    NewsComponent,
    NewsEditComponent,
    NewsCardComponent,
    NewsCardListComponent,
    NewsCardDetailComponent,
    NewsMoreMenuComponent,
    EventsComponent
  ]
})
export class NewsModule {
}
