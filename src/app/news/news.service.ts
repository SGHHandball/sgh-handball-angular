import {Injectable} from '@angular/core';
import {News, NEWS_TEAM_YOUTH_AGES} from "./news";
import {Router} from "@angular/router";
import {
  TC_NEWS_GENDER_M, TC_NEWS_GENDER_W,
  TC_NEWS_PATH_EDIT,
  TC_NEWS_TEAM_MEN, TC_NEWS_TEAM_WOMEN, TC_NEWS_TEAM_YOUTH,
  TranslationService
} from "../translation.service";
import {Club,} from "../clubs/club";
import {Observable, of} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../common/data.service";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  filters: string[] = [];

  constructor(
    private router: Router,
    private dataService: DataService,
    private translationService: TranslationService) {
  }

  getFilterNews(filterValues: string[]): Observable<News[]> {
    return this.dataService.getAllNews(true)
      .pipe(
        map(
          (newsList: News[]) => {
            return newsList
              .filter(
                (news: News) =>
                  this.areFiltersInNews(news, filterValues)
              )
          }
        )
      )
  }

  areFiltersInNews(news: News, filterValues: string[]): boolean {
    let allFiltersInNews = true;
    filterValues.forEach(filter => {
      if (!this.isFilterInNews(news, filter.toLowerCase())) {
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
      this.getNormalizedUrl(this.router.url),
      TC_NEWS_PATH_EDIT,
      toExpandNewsId
    ].join('/');
    this.router.navigate([url])
  }

  getNormalizedUrl(url: string): string {
    if (url.charAt(url.length - 1) === '/') {
      url = url.replace('/', '');
    }
    return url;
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

