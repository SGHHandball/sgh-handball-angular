import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {getDateString, News} from "../news/news";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NewsService} from "../news/news.service";
import {TC_ROUTE_NEWS, TranslationService} from "../translation.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AdminService} from "../admin/admin.service";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {AbstractComponent} from "../abstract/abstract.component";
import {HomeService} from "./home.service";
import {IImage} from "ng-simple-slideshow";
import {Router} from "@angular/router";
import {DataService} from "../common/data.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit, OnDestroy {

  @ViewChild('slideshow', {static: true}) slideshow: any;

  destroy$ = new Subject();

  constructor(breakpointObserver: BreakpointObserver,
              public homeService: HomeService,
              snackBar: MatSnackBar,
              private dataService: DataService
  ) {
    super(breakpointObserver, snackBar);
  }

  news: News[];
  images: IImage[] = [];

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.dataService.getNormalUserNews(true, 10)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.news = news;
        this.images = this.homeService.getImageUrls(news);
      })
  }

  gotoDetailNews() {
    let slideIndex = this.slideshow.slideIndex;
    let news = this.news[slideIndex];
    this.homeService.gotoDetailNews(news);
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }


}
