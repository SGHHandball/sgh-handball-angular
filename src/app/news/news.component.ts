import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {News, NewsType} from "./news";
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
import {share, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends AbstractNewsComponent implements OnInit {
  newsTypeReportTC = TC_NEWS_TYPE_REPORT;
  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeReport = NewsType.NEWS_TYPE_REPORT;
  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;

  exportTC = TC_NEWS_EXPORT;

  filteredNews: News[];

  exportNews: News[] = [];

  possibleFilterValues: string[];

  addNewsAccess = this.adminService.hasUserAddNewsAccess().pipe(share());
  eventAdmin = this.adminService.isUserEventAdmin().pipe(share());
  teamRights = this.adminService.hasUserTeamRights().pipe(share());


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
    this.getAllPossibleFilterValues();
    this.getFilterNews();
    this.initFilterNews();
  }

  addNewNews(newsType: NewsType) {
    this.dataService.addNewNews(newsType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }

  initFilterNews() {
    this.newsService.filterVisible = true;
    this.destroy$.subscribe(_ => {
      this.newsService.filterVisible = false;
    });

    this.newsService.filterChange$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(filterValue =>
          this.newsService.getFilterNews([filterValue])
        )
      )
      .subscribe(news => {
        this.filteredNews = news;
      });
  }

  getFilterNews() {
    this.newsService.getFilterNews([this.newsService.filter])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(news => {
          this.filteredNews = news;
        }
      );
  }

  getAllPossibleFilterValues() {
    this.newsService
      .getAllPossibleFilterValues()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(values => {
        this.possibleFilterValues = values;
      })
  }

  onNewsDeleted() {
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

}
