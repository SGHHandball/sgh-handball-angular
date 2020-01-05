import {Component, OnInit} from '@angular/core';
import {News, NewsType} from "../model/news";
import {
  TC_NEWS_TYPE_REPORT,
   TC_NEWS_TYPE_EVENT,
} from "../translation.service";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {first,  share, switchMap, takeUntil} from "rxjs/operators";
import {SghUser} from "../model/sgh-user";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent extends AbstractNewsComponent implements OnInit {
  newsTypeReportTC = TC_NEWS_TYPE_REPORT;
  newsTypeEventTC = TC_NEWS_TYPE_EVENT;

  newsTypeReport = NewsType.NEWS_TYPE_REPORT;
  newsTypeEvent = NewsType.NEWS_TYPE_EVENT;
  newsTypeSpecial = NewsType.NEWS_TYPE_SPECIAL;
  newsTypeTeamEvent = NewsType.NEWS_TYPE_TEAM_EVENT;
  lastItem: any;
  finished = true;
  allNewsLoaded = false;
  addNewsAccess = this.adminService.hasUserAddNewsAccess().pipe(share());
  eventAdmin = this.adminService.isUserEventAdmin().pipe(share());
  teamRights = this.adminService.hasUserTeamRights().pipe(share());

  user: SghUser;


  ngOnInit(): void {
    this.initUser();
    this.getNews();
  }

  initUser() {
    this.dataService.getSghUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user)
  }

  onScroll() {
    if (!this.allNewsLoaded) {
      this.finished = false;
      this.getNews();
    }
  }

  getNews() {
    this.adminService.hasUserAddNewsAccess()
      .pipe(
        first(),
        switchMap(
          access =>
            this.dataService.getNewsWithInfinite(this.lastItem, !access)
        )
      )
      .subscribe(news => {
          this.lastItem = news.lastItem;
          this.finished = true;
          if (!news.lastItem || news.news.length == 0) this.allNewsLoaded = true;
          else {
            this.news = this.news.concat(news.news);
          }
        }
      );
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

}
