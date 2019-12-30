import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TC_ROUTE_NEWS} from "../translation.service";
import {getDateString, News} from "../model/news";
import {NewsService} from "../news/news.service";
import {SliderImage} from "../model/slider-image";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public router: Router,
    private newsService: NewsService,) {
  }


  getImageUrls(news: News[]): SliderImage[] {
    const images: SliderImage[] = [];
    news.forEach(news => {
      if (news.imgLinks.length > 0) {
        images.push(this.getIImage(news, news.imgLinks[0]))
      } else
        images.push(this.getIImage(news, "assets/img/SghLogo.png"));
    });
    return images;

  }

  getIImage(news: News, link: string): SliderImage {
    return {
      newsId: news.id,
      img: link,
      text: this.getCaption(news),
      alt: news.title
    };
  }


  getCaption(news: News): string {
    let caption = "";
    if (news.eventDate) caption += getDateString(news.eventDate) + ': ';
    if (news.teamAge) caption += ' ' + news.teamAge;
    if (news.score) caption += ' - ' + news.score;
    return caption;
  }

  gotoDetailNews(newsIndex: string) {
    this.newsService.openNewsDetail(newsIndex);
  }
}
