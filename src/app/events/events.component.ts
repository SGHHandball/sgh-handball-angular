import {Component, OnInit} from '@angular/core';
import {NewsService} from "../news/news.service";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TC_NEWS_TYPE_EVENT, TranslationService} from "../translation.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AdminService} from "../admin/admin.service";
import {News, NewsType} from "../model/news";
import {DataService} from "../common/data.service";
import {share, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent extends AbstractNewsComponent implements OnInit {

  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;

  eventNews: News[];


  eventsAdmin = this.adminService.isUserEventAdmin().pipe(share());

  constructor(breakpointObserver: BreakpointObserver,
              private newsService: NewsService,
              translationService: TranslationService,
              dialog: MatDialog,
              snackBar: MatSnackBar,
              public adminService: AdminService,
              dataService: DataService
  ) {
    super(breakpointObserver, translationService, dialog, dataService, snackBar);
  }

  onNewsDeleted() {
  }

  ngOnInit(): void {
    this.initEvents();
  }

  addNewNews(newsType: NewsType) {
    this.dataService.addNewNews(newsType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }
  openNewsDetail(news: News) {
    this.newsService.openNewsDetail(news.id);
  }

  initEvents() {
    this.dataService
      .getAllNews(NewsType.NEWS_TYPE_EVENT)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(events => {
          return this.newsService.filterEvents(events);
        })
      )
      .subscribe(events => {
        this.eventNews = events;
      })
  }
}
