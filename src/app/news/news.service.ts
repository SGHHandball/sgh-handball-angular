import {Injectable} from '@angular/core';
import {News, NEWS_TEAM_YOUTH_AGES, NewsType} from "../model/news";
import {Router} from "@angular/router";
import {
  TC_NEWS_GENDER_M,
  TC_NEWS_GENDER_W,
  TC_NEWS_TEAM_MEN,
  TC_NEWS_TEAM_WOMEN,
  TC_NEWS_TEAM_YOUTH,
  TC_PATH_EDIT,
  TC_ROUTE_DETAIL, TC_ROUTE_SGH,
  TranslationService
} from "../translation.service";
import {Club,} from "../model/club";
import {Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {DataService} from "../data/data.service";
import {Location} from '@angular/common';
import {SghUser} from "../model/sgh-user";

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  lastItem: any;
  finished = true;
  allNewsLoaded = false;
  actualNews: News[] = [];
  actualNewsClicked: string;

  constructor(
    private router: Router,
    private location: Location,
    private dataService: DataService,
    private translationService: TranslationService,
  ) {
  }

  resetActualNews(){
    this.lastItem = undefined;
    this.finished = false;
    this.allNewsLoaded = false;
    this.actualNewsClicked = undefined;
    this.actualNews = [];
  }

  isNewsVisibleForUser(sghUser: SghUser, news: News): boolean {
    if (news.type === NewsType.NEWS_TYPE_EVENT) return true;
    if (news.type === NewsType.NEWS_TYPE_SPECIAL) return true;
    if (news.checked) return true;
    else if (!sghUser) return false;
    else if (news.creator === sghUser.id) return true;
    return this.hasUserRightsForTeam(sghUser, news.teamAge, news.teamSeason);
  }

  hasUserRightsForTeam(user: SghUser, teamAge: string, teamSeason: string): boolean {
    if (!user || !user.teams) return false;
    return user.teams
      .filter(
        team =>
          user.admin ||
          team.includes(teamAge) &&
          team.includes(teamSeason)
      ).length > 0;
  }

  filterEvents(events: News[]): Observable<News[]> {
    return this.dataService.getSghUser()
      .pipe(
        map(user => {
          if (user && user.eventsAdmin) return events;
          return events.filter(event => event.checked)
        })
      )
  }


  getTeamAges(): Observable<string[]> {
    const youthTC = this.translationService.get(TC_NEWS_TEAM_YOUTH);
    const genderWoman = this.translationService.get(TC_NEWS_GENDER_W);
    const genderMen = this.translationService.get(TC_NEWS_GENDER_M);
    return of(
      [
        this.translationService.get(TC_NEWS_TEAM_MEN),
        this.translationService.get(TC_NEWS_TEAM_WOMEN)
      ].concat(
        NEWS_TEAM_YOUTH_AGES.map(age => genderMen + age + youthTC)
      ).concat(
        NEWS_TEAM_YOUTH_AGES.map(age => genderWoman + age + youthTC)
      )
    );
  }

  openNewsEdit(toExpandNewsId: string) {
    const url = [
      TC_PATH_EDIT,
      toExpandNewsId
    ].join('/');
    this.router.navigate([url])
  }


  openNewsDetail(newsId: string) {
    const url = [
      TC_ROUTE_SGH,
      TC_ROUTE_DETAIL,
      newsId
    ].join('/');
    this.router.navigate([url])
  }

  closeExpandedNews() {
    this.location.back();
  }

}

