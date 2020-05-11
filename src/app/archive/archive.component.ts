import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data/data.service";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {combineLatest, forkJoin, Subject} from "rxjs";
import {SeasonService} from "../admin/seasons/season.service";
import {ArchiveTeam} from "./archive-team";
import {Router} from "@angular/router";
import {Team} from "../model/team";
import {NavigationItem} from "../app-shell/sidenav/navigation-item";
import {TC_ROUTE_EVENTS, TC_ROUTE_SGH, TC_ROUTE_SPECIAL, TC_ROUTE_TEAMS} from "../translation.service";
import {Season} from "../model/season";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  archiveTeams: ArchiveTeam[];

  constructor(public dataService: DataService, public seasonService: SeasonService, private router: Router) {
  }

  ngOnInit(): void {
    this.initSeasons();
  }

  initSeasons() {
    this.dataService.getSeasons()
      .pipe(takeUntil(this.destroy$),
        map(seasons => seasons.sort(
          (seasonA, seasonB) => {
            if (seasonA.beginningYear < seasonB.beginningYear) {
              return -1
            } else return 1
          }
        )),
        switchMap(seasons => {
          return this.dataService.getCurrentSeason().pipe(map(currentSeason => seasons.filter(season => season.beginningYear < currentSeason.beginningYear)))
        }),
        switchMap(seasons => {
          return combineLatest(seasons.map(season =>
            this.dataService.getTeamsBySeason(this.seasonService.getSeasonAsString(season))
              .pipe(map(teams => {
                return {season: season, teams: teams}
              }))));
        })
      ).subscribe(archiveTeams => {
      this.archiveTeams = archiveTeams;
    })
  }

  gotoTeam(team: Team) {
    this.router.navigate([[TC_ROUTE_TEAMS, team.teamSeason, team.teamAge].join('/')]);
  }


  gotoEvents(season: Season) {
    this.router.navigate([[TC_ROUTE_SGH, TC_ROUTE_EVENTS, this.seasonService.getSeasonAsString(season)].join('/')]);
  }

  gotoSpecial(season: Season) {
    this.router.navigate([[TC_ROUTE_SGH, TC_ROUTE_SPECIAL, this.seasonService.getSeasonAsString(season)].join('/')]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
