import {Injectable} from '@angular/core';
import {News, NEWS_TEAM_YOUTH_AGES} from "./news";
import {Router} from "@angular/router";
import {
  TC_NEWS_GENDER_M, TC_NEWS_GENDER_W,
  TC_NEWS_PATH_EDIT,
  TC_NEWS_TEAM_MEN, TC_NEWS_TEAM_WOMEN, TC_NEWS_TEAM_YOUTH, TC_ROUTE_DETAIL, TC_ROUTE_NEWS,
  TranslationService
} from "../translation.service";
import {Club,} from "../clubs/club";
import {Observable, of, Subject} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../common/data.service";
import {Location} from '@angular/common';
import {AdminService} from "../admin/admin.service";
import {SghUser} from "../admin/sgh-user";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private router: Router,
    private location: Location,
    private dataService: DataService,
    private translationService: TranslationService,
    private adminService: AdminService
  ) {
  }

  getFilterNews(filterValues: string[]): Observable<News[]> {
    return this.adminService.hasUserAddNewsAccess()
      .pipe(
        switchMap(
          access => {
            if (access) {
              return this.dataService.getSghUser()
                .pipe(
                  switchMap(user => {
                    return this.dataService.getAllNews()
                      .pipe(
                        map(news => this.enableAccessFilter(user, news))
                      )
                  })
                )
            }
            return this.dataService.getNormalUserNews(true)
          }
        ),
        map((newsList: News[]) => this.filterNews(filterValues, newsList))
      );
  }

  enableAccessFilter(sghUser: SghUser, newsList: News[]): News[] {
    return newsList.filter(news =>
      news.checked ||
      news.creator === sghUser.id ||
      this.hasUserRightsForTeam(sghUser, news.teamAge, news.teamSeason)
    )
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


  filterNews(filterValues: string[], newsList: News[]): News[] {
    return newsList
      .filter(
        (news: News) =>
          this.areFiltersInNews(news, filterValues)
      )
  }

  areFiltersInNews(news: News, filterValues: string[]): boolean {
    let allFiltersInNews = true;
    filterValues.forEach(filter => {
      if (filter && !this.isFilterInNews(news, filter.toLowerCase())) {
        allFiltersInNews = false;
      }
    });
    return allFiltersInNews;
  }


  isFilterInNews(news: News, filter: string): boolean {
    return (news.homeTeam && news.homeTeam.toLowerCase().includes(filter)) ||
      (news.enemyTeam && news.enemyTeam.toLowerCase().includes(filter)) ||
      (news.body && news.body.toLowerCase().includes(filter)) ||
      (news.title && news.title.toLowerCase().includes(filter)) ||
      (news.summary && news.summary.toLowerCase().includes(filter)) ||
      (news.teamAge && news.teamAge.toLowerCase() === filter) ||
      (news.teamSeason && news.teamSeason.toLowerCase() === filter)
      ;
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
        NEWS_TEAM_YOUTH_AGES.map(age => genderMen + ' ' + age + youthTC)
      ).concat(
        NEWS_TEAM_YOUTH_AGES.map(age => genderWoman + ' ' + age + youthTC)
      )
    );
  }

  openNewsEdit(toExpandNewsId: string) {
    const url = [
      TC_NEWS_PATH_EDIT,
      toExpandNewsId
    ].join('/');
    this.router.navigate([url])
  }


  openNewsDetail(newsId: string) {
    const url = [
      TC_ROUTE_DETAIL,
      newsId
    ].join('/');
    this.router.navigate([url])
  }

  closeExpandedNews() {
    this.location.back();
  }

  saveNewClubToCollection(clubName: string): Observable<boolean> {
    return this.dataService
      .getClubs()
      .pipe(
        switchMap(
          (clubs: Club[]) => {
            const isClubNotSaved = clubs.filter(club => club.name === clubName).length > 0;
            if (isClubNotSaved) {
              return this.dataService.addClub(clubName).pipe(
                map(ref => {
                  return !!ref.id;
                })
              );
            }
            return of(false);
          }
        )
      );
  }

  getAllPossibleFilterValues(): Observable<string[]> {
    return this.getTeamAges()
      .pipe(
        switchMap(
          (ages: string[]) => {
            return this.dataService
              .getClubs()
              .pipe(
                map((clubs: Club[]) =>
                  clubs
                    .map(club => club.name)
                    .concat(ages)
                )
              )
          }
        )
      );
  }


}

