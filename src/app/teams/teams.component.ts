import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TeamsService} from "./teams.service";
import {AdminService} from "../admin/admin.service";
import {MatDialog, MatSnackBar, MatTab, MatTabChangeEvent} from "@angular/material";
import {TeamsChangeDialogComponent} from "./teams-change-dialog/teams-change-dialog.component";
import {DialogData} from "../abstract/default-dialog/default-dialog.component";
import {
  TC_CANCEL,
  TC_GENERAL_DELETE_FAIL,
  TC_GENERAL_DELETE_SUCCESS,
  TC_GENERAL_EDIT_FAIL,
  TC_GENERAL_EDIT_SUCCESS,
  TC_GENERAL_REQUIRED_ERROR,
  TC_NEWS_CHECKED_HEADER,
  TC_NEWS_CHECKED_MESSAGE, TC_NEWS_TYPE_EVENT, TC_NEWS_TYPE_REPORT,
  TC_OK,
  TC_TEAMS_ADD_NEW_TEAM,
  TC_TEAMS_ADD_NEW_TEAM_FAIL,
  TC_TEAMS_ADD_NEW_TEAM_SUCCESS,
  TC_TEAMS_CHANGE_ORDER,
  TC_TEAMS_DELETE_TEAM,
  TC_TEAMS_EDIT_TEAM_PAGE,
  TC_TEAMS_NEWS_HEADER,
  TC_TEAMS_NO_TEAMS,
  TC_TEAMS_TEAM,
  TranslationService
} from "../translation.service";
import {
  DefaultInputDialogComponent,
  DefaultInputDialogData
} from "../abstract/default-input-dialog/default-input-dialog.component";
import {NewsService} from "../news/news.service";
import {News, NewsType} from "../news/news";
import {TeamsDeleteDialogComponent} from "./teams-delete-dialog/teams-delete-dialog.component";
import {Team} from "./team";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../common/data.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent extends AbstractNewsComponent implements OnInit {

  addTeamTC = TC_TEAMS_ADD_NEW_TEAM;
  orderChangeTC = TC_TEAMS_CHANGE_ORDER;
  deleteTeamTC = TC_TEAMS_DELETE_TEAM;
  editTeamPageTC = TC_TEAMS_EDIT_TEAM_PAGE;

  newsHeaderTC = TC_TEAMS_NEWS_HEADER;
  noTeamsTC = TC_TEAMS_NO_TEAMS;

  newsTypeReportTC = TC_NEWS_TYPE_REPORT;

  newsTypeReport = NewsType.NEWS_TYPE_REPORT;

  filteredNews: News[];

  currentTeam: Team;

  constructor(breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              public teamsService: TeamsService,
              public dialog: MatDialog,
              public newsService: NewsService,
              dataService: DataService,
              private adminService: AdminService,
              snackBar: MatSnackBar,
              private route: ActivatedRoute) {
    super(breakpointObserver, translationService, dialog, dataService, snackBar);
  }

  ngOnInit(): void {
    this.initTeam();
  }

  initTeam() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => {
          let teamAge = this.route.snapshot.paramMap.get('teamAge');
          let season = this.route.snapshot.paramMap.get('season');
          return this.dataService.getTeamsBySeasonAndAge(season, teamAge);
        })
      )
      .subscribe(teams => {
        if (teams.length > 0) {
          this.currentTeam = teams[0];
          this.changeNews();
        }
      });
  }

  changeNews() {
    if (this.currentTeam) {
      this.dataService
        .getTeamNews(
          this.currentTeam.teamAge,
          this.currentTeam.teamSeason
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          news => {
            if (!environment.production) {
              console.log("changeNews");
              console.log(news);
            }
            this.filteredNews = news;
          }
        )
      ;
    } else {
      this.filteredNews = [];
    }
  }

  addNewTeamToTab() {
    this.newsService.getTeamAges()
      .pipe(takeUntil(this.destroy$))
      .subscribe(ages => {
        const dialogRef = this.dialog.open(DefaultInputDialogComponent, {
          width: this.dialogWidth,
          data: new DefaultInputDialogData(
            this.translationService.get(TC_TEAMS_ADD_NEW_TEAM),
            this.translationService.get(TC_TEAMS_TEAM),
            this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
            this.translationService.get(TC_CANCEL),
            this.translationService.get(TC_OK)
          ).withAutocompleteValues(ages)
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            /*this.teamsService.addNewTeam(result)
              .then(() => this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_SUCCESS)))
              .catch(() => this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_FAIL)))*/
          }
        })
      });
  }

  changeOrderOfTabs() {
    const dialogRef = this.dialog.open(TeamsChangeDialogComponent, {
      width: this.dialogWidth,
      data: this.teamsService.teams
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /*this.teamsService.changeOrder()
          .then(() => this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS)))
          .catch(() => this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL)))*/
      }
    })
  }


  deleteTab() {
    const dialogRef = this.dialog.open(TeamsDeleteDialogComponent, {
      width: this.dialogWidth,
      data: this.teamsService.teams
    });
    dialogRef.afterClosed().subscribe((teamToDelete: Team) => {
      if (teamToDelete) {
   /*     this.teamsService.deleteTeam(teamToDelete)
          .then(() => this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS)))
          .catch(() => this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL)))*/
      }
    })
  }

  editTeamPage() {
    this.teamsService.editTeamsActive = !this.teamsService.editTeamsActive;
  }

  onNewsDeleted() {
    this.changeNews();
  }
}
