import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {News} from "../news/news";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {AbstractComponent} from "../abstract/abstract.component";
import {HomeService} from "./home.service";
import {IImage} from "ng-simple-slideshow";
import {DataService} from "../common/data.service";
import {Subject} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit, OnDestroy {

  @ViewChild('slideshow', {static: false}) slideshow: any;

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
      .pipe(
        takeUntil(this.destroy$),
        switchMap(news => {
          this.news = news;
          return this.homeService.getImageUrls(news);
        })
      )
      .subscribe(images => {
        this.images.push(images);
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
