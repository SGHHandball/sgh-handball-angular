import {Component} from '@angular/core';
import {EventService} from "./event.service";
import {NewsService} from "../news/news.service";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TC_NEWS_TYPE_EVENT, TC_NEWS_TYPE_REPORT, TranslationService} from "../translation.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {NEWS_TYPE_EVENT, NEWS_TYPE_REPORT} from "../abstract/abstract-news.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent extends AbstractNewsComponent {

  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeEvent = NEWS_TYPE_EVENT;

  constructor(breakpointObserver: BreakpointObserver,
              newsService: NewsService, translationService: TranslationService,
              dialog: MatDialog, snackBar: MatSnackBar, public eventService: EventService) {
    super(breakpointObserver, newsService, translationService, dialog, snackBar);
  }
}
