import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../model/news";
import {HomeService} from "./home.service";
import {DataService} from "../data/data.service";
import {Subject} from "rxjs";
import {share, takeUntil} from "rxjs/operators";
import {SliderImage} from "../model/slider-image";
import {DB_COLLECTION_CONTENT_HOME} from "../constants";
import {AdminService} from "../admin/admin.service";
import {Content} from "../model/content";
import {AbstractService} from "../shared/abstract.service";
import {Router} from "@angular/router";
import {TC_ROUTE_CONTENT, TC_ROUTE_HOME_EDIT} from "../translation.service";


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
              private dataService: DataService,
              private router: Router
  ) {
  }

  news: News[];
  images: SliderImage[] = [];

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

  openEdit() {
    this.router.navigate([[TC_ROUTE_CONTENT, TC_ROUTE_HOME_EDIT].join("/")])
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }


}
