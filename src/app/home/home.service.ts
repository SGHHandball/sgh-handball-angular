import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TC_ROUTE_NEWS} from "../translation.service";
import {getDateString, News} from "../news/news";
import {NewsService} from "../news/news.service";
import {IImage} from "ng-simple-slideshow";
import {DataService} from "../common/data.service";
import {from, Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public router: Router,
    private newsService: NewsService,
    private dataService: DataService) {
  }


  getImageUrls(news: News[]): IImage[] {
    const images: IImage[] = [];
    news.forEach(news => {
      if (news.imgLinks.length > 0) {
        images.push(this.getIImage(news, news.imgLinks[0]))
      }
      images.push(this.getIImage(news, "assets/img/SghLogo.png"));
    });
    return images;

  }

  getIImage(news: News, link: string): IImage {
    return {
      url: link,
      title: news.title,
      caption: this.getCaption(news)
    };
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
    this.newsService.filterChange$.next(news.title);
    this.router.navigate([TC_ROUTE_NEWS])
  }
}
