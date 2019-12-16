import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  TC_CANCEL,
  TC_SAVE,
  TC_TEAMS_CHANGE_ORDER,
  TC_TEAMS_DELETE_TEAM,
  TranslationService
} from "../../translation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Team} from "../team";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DEFAULT_YEAR} from "../../constants";
import {takeUntil} from "rxjs/operators";
import {DataService} from "../../common/data.service";
import {Subject} from "rxjs";

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
              private dataService: DataService) {
  }


  ngOnInit(): void {
    this.dataService
      .getTeamsBySeason(DEFAULT_YEAR)
      .pipe(
        takeUntil(this.destroy$)
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
