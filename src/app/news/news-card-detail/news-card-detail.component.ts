import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {getDateString, getDateWithTeamAgeAsString, getTeamsWithScoreAsString, News, NewsType} from "../news";
import {DataService} from "../../common/data.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {SliderService} from "../../abstract/slider/slider.service";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {NewsService} from "../news.service";
import {SliderComponent} from "../../abstract/slider/slider.component";

@Component({
  selector: 'app-news-card-detail',
  templateUrl: './news-card-detail.component.html',
  styleUrls: ['./news-card-detail.component.scss']
})
export class NewsCardDetailComponent extends AbstractComponent implements OnInit, OnDestroy {
  @ViewChild('slider', {static: false}) slider: SliderComponent;

  destroy$ = new Subject();
  news: News;

  reportType = NewsType.NEWS_TYPE_REPORT;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public sliderService: SliderService,
    breakpointObserver: BreakpointObserver,
    snackBar: MatSnackBar,
    private newsService: NewsService
  ) {
    super(breakpointObserver, snackBar)
  }

  ngOnInit() {
    this.initNews();
  }

  initNews() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const newsId = params['newsId'];
          return this.dataService.getNewsById(newsId)
        })
      ).subscribe(newsList => {
      if (newsList.length > 0) {
        this.news = newsList[0];
      }
    })
  }

  getDateString(news: News): string {
    return getDateString(news.date);
  }

  getDateWithTeamAgeAsString(news: News): string {
    return getDateWithTeamAgeAsString(news);
  }

  getTeamsWithScoreAsString(news: News): string {
    return getTeamsWithScoreAsString(news);
  }

  closeNews() {
    this.newsService.closeExpandedNews();
  }

  nextSlide() {
    if (this.slider) {
      this.slider.increaseIndex();
    }
  }

  lastSlide() {
    if (this.slider) {
      this.slider.decreaseIndex();
    }
  }

  getSliderIndex(): string {
    if (this.news) {
      return [this.sliderService.currentIndex + 1, this.news.imgLinks.length].join(' / ')
    }
    return ''
  }

  openImage(url: string) {
    window.open(url);
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}
