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


  getImageUrls(news: News[]): Observable<IImage> {
    return from(news)
      .pipe(
        switchMap(news => {
          if (news.imgLinks.length > 0) {
            return this.dataService.downloadImage(news.imgLinks[0])
              .pipe(switchMap(link => this.getIImageObservable(news, link)))
          }
          return this.getIImageObservable(news, "assets/img/SghLogo.png");
        })
      );
  }

  getIImageObservable(news: News, link: string): Observable<IImage> {
    return of({
      url: link,
      title: news.title,
      caption: this.getCaption(news)
    });
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
