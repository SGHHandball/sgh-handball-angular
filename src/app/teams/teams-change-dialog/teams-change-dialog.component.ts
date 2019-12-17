import {Component, OnDestroy, OnInit} from '@angular/core';
import {TC_CANCEL, TC_SAVE, TC_TEAMS_CHANGE_ORDER, TranslationService} from "../../translation.service";
import {Team} from "../team";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DataService} from "../../common/data.service";
import {Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {SeasonService} from "../../seasons/season.service";

@Component({
  selector: 'app-teams-change-dialog',
  templateUrl: './teams-change-dialog.component.html',
  styleUrls: ['./teams-change-dialog.component.css']
})
export class TeamsChangeDialogComponent implements OnInit, OnDestroy {


  cancelTC = TC_CANCEL;
  saveTC = TC_SAVE;
  changeOrderTC = TC_TEAMS_CHANGE_ORDER;

  unsavedChanges = false;

  destroy$ = new Subject();

  teams: Team[];

  constructor(public translationService: TranslationService,
              private dataService: DataService,
              private seasonService: SeasonService) {
  }

  drop(event: CdkDragDrop<Team[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.unsavedChanges = true;
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
}
