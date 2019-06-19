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


  constructor(breakpointObserver: BreakpointObserver, newsService: NewsService, translationService: TranslationService, dialog: MatDialog, snackBar: MatSnackBar) {
    super(breakpointObserver, newsService, translationService, dialog, snackBar);
  }

  ngOnInit(): void {
    this.filterNews([]);
  }

  filterNews(filterValues: string[]) {
    this.filteredNews = this.newsService.getFilterNews(filterValues);
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

}
