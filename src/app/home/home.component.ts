import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../model/news";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {AbstractComponent} from "../abstract/abstract.component";
import {HomeService} from "./home.service";
import {DataService} from "../common/data.service";
import {Subject} from "rxjs";
import {share, takeUntil} from "rxjs/operators";
import {SliderImage} from "../model/slider-image";
import {DB_COLLECTION_CONTENT_HOME} from "../constants";
import {AdminService} from "../admin/admin.service";
import {Content} from "../model/content";
import {AbstractService} from "../abstract/abstract.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(public abstractService: AbstractService,
              public homeService: HomeService,
              private adminService: AdminService,
              private dataService: DataService
  ) {
  }

  news: News[];
  images: SliderImage[] = [];

  editContent = false;
  homeContent: Content;
  contentLoaded = false;

  adminRight$ = this.adminService.isUserAdmin().pipe(share());

  ngOnInit(): void {
    this.getNews();
    this.initHomeContent();
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

  initHomeContent() {
    this.dataService
      .getContent(DB_COLLECTION_CONTENT_HOME)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(content => {
        this.homeContent = content;
        this.contentLoaded = true;
      });
  }

  saveContent(content: string) {
    this.dataService
      .addContent(DB_COLLECTION_CONTENT_HOME,
        {contentText: content}
      )
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(_ => {
        this.abstractService.openSnackBar("Inhalt erfolgreich bearbeitet")
      });
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
