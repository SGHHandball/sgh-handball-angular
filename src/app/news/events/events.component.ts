import {Component, OnInit} from '@angular/core';
import {AbstractNewsComponent} from "../../abstract/abstract-news.component";
import {TC_NEWS_TYPE_EVENT} from "../../translation.service";
import {News, NewsType} from "../../model/news";
import {map, share, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent extends AbstractNewsComponent implements OnInit {

  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;

  eventNews: News[];


  eventsAdmin = this.adminService.isUserEventAdmin().pipe(share());

  ngOnInit(): void {
    this.initEvents();
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

  initEvents() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map(params => {
          return params['season'];
        }),
        switchMap((season: string) => {
          if (!!season) {
            return this.dataService
              .getAllNewsBySeason(NewsType.NEWS_TYPE_EVENT, season);
          } else {
            return this.dataService
              .getAllNews(NewsType.NEWS_TYPE_EVENT);
          }
        }),
        switchMap(events => {
          return this.newsService.filterEvents(events);
        })
      )
      .subscribe(events => {
        this.eventNews = events;
      });
  }
}
