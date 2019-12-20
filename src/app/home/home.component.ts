import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {News} from "../news/news";
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


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(breakpointObserver: BreakpointObserver,
              public homeService: HomeService,
              private adminService: AdminService,
              snackBar: MatSnackBar,
              private dataService: DataService
  ) {
    super(breakpointObserver, snackBar);
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
        this.openSnackBar("Inhalt erfolgreich bearbeitet")
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
