import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {News} from "../news/news";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {AbstractComponent} from "../abstract/abstract.component";
import {HomeService} from "./home.service";
import {DataService} from "../common/data.service";
import {Subject} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {SliderImage} from "../model/slider-image";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(breakpointObserver: BreakpointObserver,
              public homeService: HomeService,
              snackBar: MatSnackBar,
              private dataService: DataService
  ) {
    super(breakpointObserver, snackBar);
  }

  news: News[];
  images: SliderImage[] = [];

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.dataService.getNormalUserNews(true, 10)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(news => {
        this.news = news;
        this.images = this.homeService.getImageUrls(news);
      })
  }

  gotoDetailNews(newsIndex: string) {
    this.homeService.gotoDetailNews(newsIndex);
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }


}
