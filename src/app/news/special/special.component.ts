import {Component, OnInit} from '@angular/core';
import {AbstractNewsComponent} from "../../abstract/abstract-news.component";
import {News, NewsType} from "../../model/news";
import {map, share, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent extends AbstractNewsComponent implements OnInit {


  newsTypeSpecial = NewsType.NEWS_TYPE_SPECIAL;

  specialNews: News[];


  eventsAdmin = this.adminService.isUserEventAdmin().pipe(share());

  ngOnInit(): void {
    this.initSpecials();
  }

  addNewNews(newsType: NewsType) {
    this.dataService.addNewNews(newsType)
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }

  openNewsDetail(news: News) {
    this.newsService.openNewsDetail(news.id);
  }

  initSpecials() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map(params => {
          return params['season'];
        }),
        switchMap((season: string) => {
          if (!!season) {
            return this.dataService
              .getAllNewsBySeason(NewsType.NEWS_TYPE_SPECIAL, season);
          } else {
            return this.dataService
              .getAllNews(NewsType.NEWS_TYPE_SPECIAL);
          }
        }),
        switchMap(events => {
          return this.newsService.filterEvents(events);
        })
      )
      .subscribe(events => {
        this.specialNews = events;
      });
  }
}
