import {Component,  OnDestroy, OnInit} from '@angular/core';
import {
  TC_CANCEL,
  TC_TEAMS_DELETE_TEAM,
  TranslationService
} from "../../translation.service";
import { MatDialogRef} from "@angular/material/dialog";
import {Team} from "../../model/team";
import {switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../../data/data.service";
import {Subject} from "rxjs";
import {SeasonService} from "../../admin/seasons/season.service";

@Component({
  selector: 'app-teams-delete-dialog',
  templateUrl: './teams-delete-dialog.component.html',
  styleUrls: ['./teams-delete-dialog.component.css']
})
export class TeamsDeleteDialogComponent implements OnInit, OnDestroy {


  cancelTC = TC_CANCEL;
  deleteTeamTC = TC_TEAMS_DELETE_TEAM;

  destroy$ = new Subject();

  teams: Team[];

  constructor(public translationService: TranslationService,
              public dialogRef: MatDialogRef<TeamsDeleteDialogComponent>,
              private dataService: DataService,
              private seasonService: SeasonService) {
  }


  ngOnInit(): void {
    this.dataService.getCurrentSeason()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(currentSeason => this.dataService.getTeamsBySeason(this.seasonService.getSeasonAsString(currentSeason))),
      )
      .subscribe(teams => {
          this.teams = teams;
        }
      )
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

  deleteItem(team: Team) {
    this.dialogRef.close(team);
  }
}
