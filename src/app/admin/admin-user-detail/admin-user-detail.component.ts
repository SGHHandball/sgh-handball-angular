import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {SghUser} from "../sgh-user";
import {
  TC_ADMIN, TC_CANCEL, TC_GENERAL_REQUIRED_ERROR, TC_OK,
  TC_ROUTE_EVENTS,
  TC_ROUTE_HALLS,
  TC_ROUTE_TEAMS, TC_ROUTE_TRAINING,
  TC_TEAMS_ADD_NEW_TEAM,
  TC_TEAMS_TEAM,
  TranslationService
} from "../../translation.service";
import {MatDialog} from "@angular/material";
import {
  DefaultInputDialogComponent,
  DefaultInputDialogData
} from "../../abstract/default-input-dialog/default-input-dialog.component";
import {DataService} from "../../common/data.service";
import {Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {SeasonService} from "../../seasons/season.service";
import {AbstractService} from "../../abstract/abstract.service";

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnDestroy {
  @Input() sghUser: SghUser;
  @Output() toggleChangeListener = new EventEmitter();

  destroy$ = new Subject();

  adminTC = TC_ADMIN;

  hallsTC = TC_ROUTE_HALLS;

  teamsTC = TC_ROUTE_TEAMS;

  eventsTC = TC_ROUTE_EVENTS;

  trainingsTC = TC_ROUTE_TRAINING;

  constructor(public translationService: TranslationService,
              public dialog: MatDialog,
              private dataService: DataService,
              private seasonService: SeasonService,
              private abstractService: AbstractService
  ) {
  }

  changeAdminMode() {
    this.sghUser.admin = !this.sghUser.admin;
    this.toggleChangeListener.next();
  }


  changeHallAdminMode() {
    this.sghUser.hallsAdmin = !this.sghUser.hallsAdmin;
    this.toggleChangeListener.next();
  }


  changeTeamsAdminMode() {
    this.sghUser.teamsAdmin = !this.sghUser.teamsAdmin;
    this.toggleChangeListener.next();
  }

  changeEventsAdminMode() {
    this.sghUser.eventsAdmin = !this.sghUser.eventsAdmin;
    this.toggleChangeListener.next();
  }

  changeTrainingsAdminMode() {
    this.sghUser.trainingsAdmin = !this.sghUser.trainingsAdmin;
    this.toggleChangeListener.next();
  }

  removeTeam(team: string) {
    this.sghUser.teams.splice(this.sghUser.teams.indexOf(team), 1);

    this.toggleChangeListener.next();
  }

  openAddTeamDialog() {
    this.dataService.getCurrentSeason()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(currentSeason => this.dataService.getTeamsBySeason(this.seasonService.getSeasonAsString(currentSeason))),
        switchMap(teams => {
          const teamsAsStrings = teams.map(team => [team.teamAge, team.teamSeason].join(" - "));
          return this.abstractService.dialogWidth$
            .pipe(
              switchMap(dialogWidth =>
                this.dialog.open(DefaultInputDialogComponent, {
                  width: dialogWidth,
                  data: new DefaultInputDialogData(
                    this.translationService.get(TC_TEAMS_ADD_NEW_TEAM),
                    this.translationService.get(TC_TEAMS_TEAM),
                    this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
                    this.translationService.get(TC_CANCEL),
                    this.translationService.get(TC_OK)
                  )
                    .withAutocompleteValues(teamsAsStrings)
                }).afterClosed()
              )
            )
        }))
      .subscribe(result => {
        if (result) {
          if (!this.sghUser.teams) this.sghUser.teams = [];
          this.sghUser.teams.push(result);
          this.toggleChangeListener.next();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}
