import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {News, NewsType} from "../model/news";
import {
  TC_NEWS_TYPE_REPORT,
  TranslationService, TC_NEWS_TYPE_EVENT, TC_FILTER, TC_NEWS_EXPORT
} from "../translation.service";
import {NewsService} from "./news.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {AdminService} from "../admin/admin.service";
import {exportNewsToText} from "./news-export/news-export";
import {DataService} from "../common/data.service";
import {first, last, share, switchMap, takeUntil} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {SghUser} from "../admin/sgh-user";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent extends AbstractNewsComponent implements OnInit {
  newsTypeReportTC = TC_NEWS_TYPE_REPORT;
  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeReport = NewsType.NEWS_TYPE_REPORT;
  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;

  exportTC = TC_NEWS_EXPORT;

  exportNews: News[] = [];

  lastItem: any;
  finished = true;
  allNewsLoaded = false;
  addNewsAccess = this.adminService.hasUserAddNewsAccess().pipe(share());
  eventAdmin = this.adminService.isUserEventAdmin().pipe(share());
  teamRights = this.adminService.hasUserTeamRights().pipe(share());

  user: SghUser;

  constructor(breakpointObserver: BreakpointObserver,
              translationService: TranslationService,
              dialog: MatDialog,
              snackBar: MatSnackBar,
              dataService: DataService,
              public adminService: AdminService,
              private newsService: NewsService
  ) {
    super(breakpointObserver, translationService, dialog, dataService, snackBar);
  }

  ngOnInit(): void {
    this.initUser();
    this.getNews();
  }

  initUser() {
    this.dataService.getSghUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user)
  }

  onScroll() {
    if (!this.allNewsLoaded) {
      this.finished = false;
      this.getNews();
    }
  }

  getNews() {
    this.adminService.hasUserAddNewsAccess()
      .pipe(
        first(),
        switchMap(
          access =>
            this.dataService.getNewsWithInfinite(this.lastItem, !access)
        )
      )
      .subscribe(news => {
          this.lastItem = news.lastItem;
          this.finished = true;
          if (!news.lastItem || news.news.length == 0) this.allNewsLoaded = true;
          else {
            this.news = this.news.concat(news.news);
          }
        }
      );
  }

  addNewNews(newsType: NewsType) {
    this.dataService.addNewNews(newsType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }


  changeExportNews(news: News) {
    if (this.exportNews.includes(news)) {
      this.exportNews.splice(this.exportNews.indexOf(news), 1);
    } else {
      this.exportNews.push(news);
    }
  }

  exportNewsToText() {
    exportNewsToText(this.exportNews);
  }

  openNewsDetail(news: News) {
    this.newsService.openNewsDetail(news.id);
  }

}
