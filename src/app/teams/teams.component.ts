import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin/admin.service";
import {MatDialog,} from "@angular/material";
import {TeamsChangeDialogComponent} from "./teams-change-dialog/teams-change-dialog.component";
import {
  TC_CANCEL, TC_EDIT,
  TC_GENERAL_DELETE_FAIL,
  TC_GENERAL_DELETE_SUCCESS,
  TC_GENERAL_EDIT_FAIL,
  TC_GENERAL_EDIT_SUCCESS,
  TC_GENERAL_REQUIRED_ERROR,
  TC_NEWS_TYPE_REPORT,
  TC_OK, TC_ROUTE_EDIT, TC_ROUTE_TEAMS,
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
} from "../shared/default-input-dialog/default-input-dialog.component";
import {NewsService} from "../news/news.service";
import {News, NewsType} from "../model/news";
import {TeamsDeleteDialogComponent} from "./teams-delete-dialog/teams-delete-dialog.component";
import {Team} from "../model/team";
import {AbstractNewsComponent} from "../abstract/abstract-news.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../data/data.service";
import {catchError, filter, first, share, switchMap, takeUntil} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {SeasonService} from "../admin/seasons/season.service";
import {AbstractService} from "../shared/abstract.service";
import {TeamService} from "./team.service";
import {SghUser} from "../model/sgh-user";

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

  filteredNews: News[];
  user: SghUser;

  currentTeam: Team;
  teamLoaded = false;
  allTeams: Team[];

  teamsAdmin = this.adminService.isUserTeamsAdmin().pipe(share());
  rightsForTeam: Observable<boolean>;

  constructor(
    public translationService: TranslationService,
    public dialog: MatDialog,
    public dataService: DataService,
    public abstractService: AbstractService,
    public adminService: AdminService,
    public newsService: NewsService,
    public route: ActivatedRoute,
    public seasonService: SeasonService,
    private teamService: TeamService,
    private router: Router
  ) {
    super(translationService, dialog, dataService, abstractService, adminService, newsService, route, seasonService)
  }

  ngOnInit(): void {
    this.initUser();
    this.initAllTeamsForSeason();
    this.initTeam();
  }

  initUser() {
    this.dataService.getSghUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user)
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
          this.teamService.teamDetail$.next(this.currentTeam);
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
        first(),
        switchMap(ages => this.getInputDialogObservable(ages)),
        filter(result => !!result),
        switchMap(result => {
            return this.getOnAddNewTeamObservable(result);
          }
        ),
        catchError(error => {
          this.abstractService.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        cancel => {
          if (cancel) this.abstractService.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_SUCCESS));
          else this.abstractService.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_FAIL));
        }
      );
  }

  getOnAddNewTeamObservable(team: string): Observable<string> {
    return this.dataService.getCurrentSeason()
      .pipe(
        first(),
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
    return this.abstractService.dialogWidth$
      .pipe(
        switchMap(dialogWidth =>
          this.dialog.open(
            DefaultInputDialogComponent, {
              width: dialogWidth,
              data: new DefaultInputDialogData(
                this.translationService.get(TC_TEAMS_ADD_NEW_TEAM),
                this.translationService.get(TC_TEAMS_TEAM),
                this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
                this.translationService.get(TC_CANCEL),
                this.translationService.get(TC_OK)
              ).withAutocompleteValues(teamAges)
            }
          ).afterClosed())
      );
  }

  changeOrderOfTeams() {
    this.abstractService.dialogWidth$
      .pipe(
        first(),
        switchMap(dialogWidth =>
          this.dialog.open(
            TeamsChangeDialogComponent,
            {
              width: dialogWidth,
            }
          ).afterClosed()
        ),
        switchMap(teams => {
          return teams ? this.dataService.changeOrderOfTeams(teams) : of("cancelBtn");
        }),
        catchError(error => {
          this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        cancel => {
          if (cancel) this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
          else this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS));
        }
      );
  }

  deleteTeam() {
    this.abstractService.dialogWidth$
      .pipe(
        first(),
        switchMap(dialogWidth =>
          this.dialog.open(
            TeamsDeleteDialogComponent,
            {
              width: dialogWidth,
            }
          ).afterClosed()
        ),
        switchMap(team => {
          return team ? this.dataService.deleteTeam(team) : of("cancelBtn");
        }),
        catchError(error => {
          this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        cancel => {
          if (cancel) this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          else this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS));
        }
      );
  }

  editTeamPage() {
    this.router.navigate([`${TC_ROUTE_EDIT}/${this.currentTeam.teamSeason}/${this.currentTeam.teamAge}`])
  }

  openNewsDetail(news: News) {
    this.newsService.openNewsDetail(news.id);
  }

  addNewNews(report: boolean) {
    this.dataService.addNewNews(report ? NewsType.NEWS_TYPE_REPORT : NewsType.NEWS_TYPE_TEAM_EVENT, this.currentTeam)
      .pipe(first())
      .subscribe(news => {
        this.newsService.openNewsEdit(news.id);
      })
  }

}
