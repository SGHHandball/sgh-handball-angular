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
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends AbstractNewsComponent implements OnInit {
  filterTC = TC_FILTER;
  newsTypeReportTC = TC_NEWS_TYPE_REPORT;
  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeReport = NewsType.NEWS_TYPE_REPORT;
  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;

  exportTC = TC_NEWS_EXPORT;

  filteredNews: News[];

  exportNews: News[] = [];

  filters: string[] = this.newsService.filters;

  possibleFilterValues: string[];

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
    this.getFilterNews(this.filters);
  }

  addNewNews(newsType: NewsType) {
    this.dataService.addNewNews(newsType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }

  getFilterNews(filterValues: string[]) {
    this.filters = filterValues;
    this.newsService.getFilterNews(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.filteredNews = news;
      });
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
    this.getFilterNews(this.filters);
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
