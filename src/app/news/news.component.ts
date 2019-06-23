import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {News} from "./news";
import {
  TC_NEWS_TYPE_REPORT,
  TranslationService, TC_NEWS_TYPE_EVENT, TC_FILTER
} from "../translation.service";
import {NewsService} from "./news.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {NEWS_TYPE_EVENT, NEWS_TYPE_REPORT} from "../abstract/abstract-news.service";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {AdminService} from "../admin/admin.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends AbstractNewsComponent implements OnInit {

  filterTC = TC_FILTER;
  newsTypeReportTC = TC_NEWS_TYPE_REPORT;
  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeReport = NEWS_TYPE_REPORT;
  newsTypeEvent = NEWS_TYPE_EVENT;

  filteredNews: News[];

  filters: string[] = [];

  constructor(breakpointObserver: BreakpointObserver, newsService: NewsService, translationService: TranslationService, dialog: MatDialog, snackBar: MatSnackBar,
              public adminService: AdminService) {
    super(breakpointObserver, newsService, translationService, dialog, snackBar);
  }

  ngOnInit(): void {
    this.filterNews(this.filters);
  }

  filterNews(filterValues: string[]) {
    this.filters = filterValues;
    this.filteredNews = this.newsService.getFilterNews(this.filters);
  }

  getAllPossibleFilterValues(): string[] {
    const filterValues = [];
    this.newsService.newsTeamAges.forEach(age => {
      filterValues.push(age);
    });
    this.newsService.clubs.forEach(club => {
      filterValues.push(club.name);
    });
    return filterValues;
  }

  onNewsDeleted() {
    this.filterNews(this.filters);
  }

}
