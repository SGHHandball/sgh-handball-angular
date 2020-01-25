import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {News, NewsType} from "../model/news";
import {
  TC_NEWS_TYPE_REPORT,
  TC_NEWS_TYPE_EVENT, TranslationService,
} from "../translation.service";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {first, share, switchMap, takeUntil} from "rxjs/operators";
import {SghUser} from "../model/sgh-user";
import {MatDialog} from "@angular/material";
import {DataService} from "../data/data.service";
import {AbstractService} from "../shared/abstract.service";
import {AdminService} from "../admin/admin.service";
import {NewsService} from "./news.service";
import {ActivatedRoute} from "@angular/router";
import {SeasonService} from "../admin/seasons/season.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent extends AbstractNewsComponent implements OnInit, AfterViewInit {

  @ViewChild("infiniteScroll", {static: true}) infiniteScroll: ElementRef;

  newsTypeReportTC = TC_NEWS_TYPE_REPORT;
  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeReport = NewsType.NEWS_TYPE_REPORT;
  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;
  newsTypeSpecial = NewsType.NEWS_TYPE_SPECIAL;
  newsTypeTeamEvent = NewsType.NEWS_TYPE_TEAM_EVENT;
  addNewsAccess = this.adminService.hasUserAddNewsAccess().pipe(share());
  eventAdmin = this.adminService.isUserEventAdmin().pipe(share());
  teamRights = this.adminService.hasUserTeamRights().pipe(share());

  user: SghUser;

  constructor(
    public translationService: TranslationService,
    public dialog: MatDialog,
    public dataService: DataService,
    public abstractService: AbstractService,
    public adminService: AdminService,
    public newsService: NewsService,
    public route: ActivatedRoute,
    public seasonService: SeasonService,
    @Inject(DOCUMENT) document) {
    super(translationService, dialog, dataService, abstractService, adminService, newsService, route, seasonService);
  }

  ngOnInit(): void {
    this.initUser();
    this.getNews();
  }

  ngAfterViewInit(): void {
    if (this.newsService.actualNewsClicked) {
      const element = document.getElementById(this.newsService.actualNewsClicked);
      element.scrollIntoView();
    }
  }

  initUser() {
    this.dataService.getSghUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user)
  }

  onScroll() {
    if (!this.newsService.allNewsLoaded) {
      this.newsService.finished = false;
      this.getNews();
    }
  }

  getNews() {
    if (!this.newsService.allNewsLoaded) {
      this.adminService.hasUserAddNewsAccess()
        .pipe(
          first(),
          switchMap(
            access =>
              this.dataService.getNewsWithInfinite(this.newsService.lastItem, !access)
          )
        )
        .subscribe(news => {
            this.newsService.lastItem = news.lastItem;
            this.newsService.finished = true;
            if (!news.lastItem || news.news.length == 0) this.newsService.allNewsLoaded = true;
            else {
              this.newsService.actualNews = this.newsService.actualNews.concat(news.news);
            }
          }
        );
    }
  }

  addNewNews(newsType: NewsType) {
    this.dataService.addNewNews(newsType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }

  openNewsDetail(news: News) {
    this.newsService.actualNewsClicked = news.id;
    this.newsService.openNewsDetail(news.id);
  }

}
