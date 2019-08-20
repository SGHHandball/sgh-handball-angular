import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit {

  @ViewChild('slideshow', {static: true}) slideshow: any;

  constructor(breakpointObserver: BreakpointObserver, public homeService: HomeService, snackBar: MatSnackBar, public router: Router, private newsService: NewsService) {
    super(breakpointObserver, snackBar);
  }

  images: IImage[] = [];

  ngOnInit(): void {
    if (!this.homeService.newsLoaded)
      this.homeService.$newsLoaded.subscribe(onLoad => {
          this.getImageUrls();
        }
      );
    else this.getImageUrls();
  }

  getImageUrls() {
    this.images = [];
    this.homeService.news.forEach(news => {
      let image = "assets/img/SghLogo.png";
      if (news.imgLinks.length > 0) {
        image = news.imgLinks[0];
      }
      this.images.push({
        url: image,
        title: news.title,
        caption: this.getCaption(news)
      })
    });
  }

  gotoDetailNews() {
    let slideIndex = this.slideshow.slideIndex;
    let news = this.homeService.news[slideIndex];
    if (news.title) this.newsService.filters.push(news.title);
    if (news.teamAge) this.newsService.filters.push(news.teamAge);
    this.router.navigate([TC_ROUTE_NEWS])
  }

  getCaption(news: News): string {
    let caption = "";
    if (news.date) caption += getDateString(news.date) + ': ';
    if (news.title) caption += news.title;
    if (news.score) caption += ' ' + news.score;
    if (news.summary) caption += ' - ' + news.summary;
    return caption;
  }
}
