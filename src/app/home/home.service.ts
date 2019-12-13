import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TC_ROUTE_NEWS} from "../translation.service";
import {getDateString, News} from "../news/news";
import {NewsService} from "../news/news.service";
import {IImage} from "ng-simple-slideshow";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public router: Router,
    private newsService: NewsService,) {
  }


  getImageUrls(news: News[]): IImage[] {
    const images = [];
    news.forEach(news => {
      let image = "assets/img/SghLogo.png";
      if (news.imgLinks.length > 0) {
        image = news.imgLinks[0];
      }
      images.push({
        url: image,
        title: news.title,
        caption: this.getCaption(news)
      })
    });
    return images;
  }


  getCaption(news: News): string {
    let caption = "";
    if (news.date) caption += getDateString(news.date) + ': ';
    if (news.title) caption += news.title;
    if (news.score) caption += ' ' + news.score;
    if (news.summary) caption += ' - ' + news.summary;
    return caption;
  }

  gotoDetailNews(news: News) {
    if (news.title) this.newsService.filters.push(news.title);
    if (news.teamAge) this.newsService.filters.push(news.teamAge);
    this.router.navigate([TC_ROUTE_NEWS])
  }
}
