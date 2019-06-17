import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TeamsService} from "./teams.service";
import {AdminService} from "../admin/admin.service";
import {MatDialog, MatSnackBar, MatTab, MatTabChangeEvent} from "@angular/material";
import {TeamsChangeDialogComponent} from "./teams-change-dialog/teams-change-dialog.component";
import {DialogData} from "../abstract/default-dialog/default-dialog.component";
import {
  TC_CANCEL, TC_GENERAL_DELETE_FAIL, TC_GENERAL_DELETE_SUCCESS, TC_GENERAL_EDIT_FAIL, TC_GENERAL_EDIT_SUCCESS,
  TC_GENERAL_REQUIRED_ERROR,
  TC_NEWS_CHECKED_HEADER,
  TC_NEWS_CHECKED_MESSAGE, TC_OK, TC_TEAMS_ADD_NEW_TEAM, TC_TEAMS_ADD_NEW_TEAM_FAIL, TC_TEAMS_ADD_NEW_TEAM_SUCCESS,
  TC_TEAMS_CHANGE_ORDER, TC_TEAMS_DELETE_TEAM, TC_TEAMS_NEWS_HEADER, TC_TEAMS_TEAM,
  TranslationService
} from "../translation.service";
import {
  DefaultInputDialogComponent,
  DefaultInputDialogData
} from "../abstract/default-input-dialog/default-input-dialog.component";
import {NewsService} from "../news/news.service";
import {News} from "../news/news";
import {TeamsDeleteDialogComponent} from "./teams-delete-dialog/teams-delete-dialog.component";
import {Team} from "./team";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent extends AbstractComponent {

  addTeamTC = TC_TEAMS_ADD_NEW_TEAM;
  orderChangeTC = TC_TEAMS_CHANGE_ORDER;
  deleteTeamTC = TC_TEAMS_DELETE_TEAM;

  newsHeaderTC = TC_TEAMS_NEWS_HEADER;

  filteredNews: News[];

  constructor(breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              public teamsService: TeamsService,
              private dialog: MatDialog,
              private newsService: NewsService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
    this.teamsService.loadAllTeams()
      .then(() => {
        this.changeNews(0)
      });
  }


  onOtherTabSelected(tab: MatTabChangeEvent) {
    this.changeNews(tab.index)
  }

  changeNews(index: number) {
    const teamWithIndex = this.teamsService.teams[index];
    this.filteredNews = this.newsService.getFilterNews([teamWithIndex.teamAge, teamWithIndex.teamYear]);
  }

  addNewTeamToTab() {
    const dialogRef = this.dialog.open(DefaultInputDialogComponent, {
      width: this.dialogWidth,
      data: new DefaultInputDialogData(
        this.translationService.get(TC_TEAMS_ADD_NEW_TEAM),
        this.translationService.get(TC_TEAMS_TEAM),
        this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
        this.translationService.get(TC_CANCEL),
        this.translationService.get(TC_OK)
      ).withAutocompleteValues(this.newsService.newsTeamAges)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamsService.addNewTeam(result)
          .then(() => this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_SUCCESS)))
          .catch(() => this.openSnackBar(this.translationService.get(TC_TEAMS_ADD_NEW_TEAM_FAIL)))
      }
    })
  }

  changeOrderOfTabs() {
    const dialogRef = this.dialog.open(TeamsChangeDialogComponent, {
      width: this.dialogWidth,
      data: this.teamsService.teams
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamsService.changeOrder()
          .then(() => this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS)))
          .catch(() => this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL)))
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
        this.teamsService.deleteTeam(teamToDelete)
          .then(() => this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS)))
          .catch(() => this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL)))
      }
    })
  }
}
