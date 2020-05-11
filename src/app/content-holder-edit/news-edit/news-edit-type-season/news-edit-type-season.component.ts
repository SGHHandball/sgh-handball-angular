import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {News, NewsType} from "../../../model/news";
import {FormControl} from "@angular/forms";
import {Season} from "../../../model/season";
import {filter, first, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../../../data/data.service";
import {Subject} from "rxjs";
import {SeasonService} from "../../../admin/seasons/season.service";
import {AdminService} from "../../../admin/admin.service";

@Component({
  selector: 'app-news-edit-type-season',
  templateUrl: './news-edit-type-season.component.html',
  styleUrls: ['./news-edit-type-season.component.css']
})
export class NewsEditTypeSeasonComponent implements OnInit, OnDestroy {

  @Input() news: News;
  @Output() changedValueListener = new EventEmitter();

  destroy$ = new Subject();
  currentSeason: Season;
  seasons: Season[];

  constructor(
    private dataService: DataService,
    private seasonService: SeasonService,
    private adminService: AdminService) {
  }

  possibleTypes = [];

  ngOnInit() {
    this.initSeasons();
    this.initCurrentSeason();
    this.initTypes();
  }

  initTypes() {
    this.adminService.hasUserTeamRights()
      .pipe(
        first(),
        switchMap(teamRight => {
          if (teamRight) {
            this.possibleTypes.push(
              NewsType.NEWS_TYPE_REPORT);
            this.possibleTypes.push(
              NewsType.NEWS_TYPE_TEAM_EVENT);
          }
          return this.dataService.getSghUser();
        })
      ).subscribe(user => {
      if (user.eventsAdmin) {
        this.possibleTypes.push(
          NewsType.NEWS_TYPE_SPECIAL);
        this.possibleTypes.push(
          NewsType.NEWS_TYPE_EVENT);

      } else if (user.admin) {
        this.possibleTypes = [
          NewsType.NEWS_TYPE_REPORT,
          NewsType.NEWS_TYPE_TEAM_EVENT,
          NewsType.NEWS_TYPE_SPECIAL,
          NewsType.NEWS_TYPE_EVENT
        ]
      }
    })

  }

  initSeasons() {
    this.dataService.getSeasons()
      .pipe(takeUntil(this.destroy$))
      .subscribe(seasons => this.seasons = seasons.sort(
        (seasonA, seasonB) => {
          if (seasonA.beginningYear < seasonB.beginningYear) {
            return -1
          } else return 1
        }
      ))
  }

  initCurrentSeason() {
    this.dataService.getCurrentSeason()
      .pipe(takeUntil(this.destroy$), filter(currentSeason => !!currentSeason))
      .subscribe(currentSeason => {
        this.currentSeason = currentSeason;
        if (!this.news.teamSeason) {
          this.changeSeason(this.seasonService.getSeasonAsString(this.currentSeason))
        }
      })
  }

  changeSeason(teamSeason: string) {
    this.news.teamSeason = teamSeason;
    this.changedValueListener.next();
  }

  changeType(type: NewsType) {
    this.news.type = type;
    this.changedValueListener.next();
  }

  getTypeNames(type: NewsType): string {
    switch (type) {
      case NewsType.NEWS_TYPE_REPORT:
        return "Spielbericht";
      case NewsType.NEWS_TYPE_TEAM_EVENT:
        return "Team Event";
      case NewsType.NEWS_TYPE_SPECIAL:
        return "Sonderbericht";
      case NewsType.NEWS_TYPE_EVENT:
        return "Veranstaltung";
      default:
        "";

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
