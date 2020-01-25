import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {getDateString, getDateWithTeamAgeAsString, News, NewsType} from "../../model/news";
import {DataService} from "../../data/data.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {SliderService} from "../../shared/slider/slider.service";
import {NewsService} from "../news.service";
import {SliderComponent} from "../../shared/slider/slider.component";
import {AbstractService} from "../../shared/abstract.service";

@Component({
  selector: 'app-news-card-detail',
  templateUrl: './news-card-detail.component.html',
  styleUrls: ['./news-card-detail.component.scss']
})
export class NewsCardDetailComponent implements OnInit, OnDestroy {
  @ViewChild('slider', {static: false}) slider: SliderComponent;

  destroy$ = new Subject();
  news: News;


  scrollToTopVisible: boolean;
  topPosToStartShowing = 100;
  target;

  reportType = NewsType.NEWS_TYPE_REPORT;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public sliderService: SliderService,
    private newsService: NewsService,
    public abstractService: AbstractService
  ) {
  }

  gotoTop() {
    if (this.target) {
      this.target.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      this.target = undefined;
    }
  }

  scroll = (event): void => {
    const scrollPosition = event && event.target ? event.target.scrollTop : 0;
    this.scrollToTopVisible = scrollPosition >= this.topPosToStartShowing;
    if (this.scrollToTopVisible) {
      this.target = event.target;
    }
  };

  ngOnInit() {
    this.initNews();
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  initNews() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const newsId = params['newsId'];
          return this.dataService.getNewsById(newsId)
        })
      ).subscribe(news => {
      this.news = news;
    })
  }

  getDateString(news: News): string {
    return getDateString(news.eventDate);
  }

  getDateWithTeamAgeAsString(news: News): string {
    return getDateWithTeamAgeAsString(news);
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
    window.removeEventListener('scroll', this.scroll, true);
  }
}
