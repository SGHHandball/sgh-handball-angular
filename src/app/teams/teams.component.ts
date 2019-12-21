import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {AdminService} from "../admin/admin.service";
import {MatDialog, MatSnackBar,} from "@angular/material";
import {TeamsChangeDialogComponent} from "./teams-change-dialog/teams-change-dialog.component";
import {
  TC_CANCEL, TC_GENERAL_DELETE_FAIL, TC_GENERAL_DELETE_SUCCESS, TC_GENERAL_EDIT_FAIL, TC_GENERAL_EDIT_SUCCESS,
  TC_GENERAL_REQUIRED_ERROR,
  TC_NEWS_TYPE_REPORT,
  TC_OK,
  TC_TEAMS_ADD_NEW_TEAM, TC_TEAMS_ADD_NEW_TEAM_FAIL, TC_TEAMS_ADD_NEW_TEAM_SUCCESS,
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
import {News, NewsType} from "../model/news";
import {TeamsDeleteDialogComponent} from "./teams-delete-dialog/teams-delete-dialog.component";
import {Team} from "./team";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../common/data.service";
import {catchError, share, switchMap, takeUntil} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {SeasonService} from "../seasons/season.service";

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
  teamLoaded = false;
  allTeams: Team[];

  editTeamsActive = false;
  editTeamLinkActive = false;

  teamsAdmin = this.adminService.isUserTeamsAdmin().pipe(share());
  rightsForTeam: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              public dialog: MatDialog,
              public newsService: NewsService,
              dataService: DataService,
              private adminService: AdminService,
              snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private seasonService: SeasonService) {
    super(breakpointObserver, translationService, dialog, dataService, snackBar);
  }

  ngOnInit(): void {
    this.initAllTeamsForSeason();
    this.initTeam();
  }

  initAllTeamsForSeason() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => {
          let season = this.route.snapshot.paramMap.get('season');
          return this.dataService.getTeamsBySeason(season);
        })
      )
      .subscribe(teams => {
        this.allTeams = teams;
      });
  }

  initTeam() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => {
          let teamAge = this.route.snapshot.paramMap.get('teamAge');
          let season = this.route.snapshot.paramMap.get('season');
          if (!teamAge) return of(undefined);
          return this.dataService.getTeamsBySeasonAndAge(season, teamAge);
        })
      )
      .subscribe(teams => {
        if (teams && teams.length > 0) {
          this.currentTeam = teams[0];
          this.rightsForTeam =
            this.dataService
              .hasUserRightsForTeam(
                this.currentTeam.teamAge,
                this.currentTeam.teamSeason
              )
              .pipe(share());
          this.changeNews();
        }
        this.teamLoaded = true;
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


  addNewTeam() {
    this.newsService.getTeamAges()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(ages => this.getInputDialogObservable(ages)),
        switchMap(result => {
            if (result) {
              return this.getOnAddNewTeamObservable(result);
            }
            return of(false);
          }
        ),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        cancel => {
          if (cancel) this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_SUCCESS));
          else this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_FAIL));
        }
      );
  }

  getOnAddNewTeamObservable(team: string): Observable<string> {
    return this.dataService.getCurrentSeason()
      .pipe(
        switchMap(
          currentSeason =>
            this.dataService
              .addNewTeam(
                this.allTeams.length - 1,
                this.seasonService.getSeasonAsString(currentSeason),
                team
              )
        )
      );
  }


  getInputDialogObservable(teamAges: string[]): Observable<string | undefined> {
    return this.dialog.open(
      DefaultInputDialogComponent, {
        width: this.dialogWidth,
        data: new DefaultInputDialogData(
          this.translationService.get(TC_TEAMS_ADD_NEW_TEAM),
          this.translationService.get(TC_TEAMS_TEAM),
          this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
          this.translationService.get(TC_CANCEL),
          this.translationService.get(TC_OK)
        ).withAutocompleteValues(teamAges)
      }
    ).afterClosed()
  }

  changeOrderOfTeams() {
    this.dialog.open(
      TeamsChangeDialogComponent,
      {
        width: this.dialogWidth,
      }
    ).afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(teams => {
          return teams ? this.dataService.changeOrderOfTeams(teams) : of("cancelBtn");
        }),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        cancel => {
          if (cancel) this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
          else this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS));
        }
      );
  }

  deleteTeam() {
    this.dialog.open(
      TeamsDeleteDialogComponent,
      {
        width: this.dialogWidth,
      }
    ).afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(team => {
          return team ? this.dataService.deleteTeam(team) : of("cancelBtn");
        }),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        cancel => {
          if (cancel) this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          else this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS));
        }
      );
  }

  editTeamPage() {
    this.editTeamsActive = !this.editTeamsActive;
  }

  editTeamLink() {
    this.editTeamLinkActive = !this.editTeamLinkActive;
  }

  openNewsDetail(news: News) {
    this.newsService.openNewsDetail(news.id);
  }

}
