import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../data/data.service";
import {of, Subject} from "rxjs";
import {catchError, first, switchMap, takeUntil} from "rxjs/operators";
import {Season} from "../../model/season";
import {DefaultDialogComponent, DialogData} from "../../shared/default-dialog/default-dialog.component";
import {environment} from "../../../environments/environment";
import {AbstractService} from "../../shared/abstract.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  seasons: Season[];
  currentSeason: Season;

  constructor(private dataService: DataService, private abstractService: AbstractService,
              private dialog: MatDialog,) {
  }

  ngOnInit() {
    this.initSeasons();
    this.initCurrentSeason();
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(season => this.currentSeason = season)
  }

  changeCurrentYear(season: Season) {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth =>
          this.dialog
            .open(
              DefaultDialogComponent, {
                width: dialogWidth,
                data: new DialogData("Saison wechseln", "Wollen Sie die aktuelle Saison wechseln?")
              }
            )
            .afterClosed()
        ),
        switchMap(
          result => {
            if (result) {
              return this.dataService.changeCurrentSeason(season);
            }
            return of("Error")
          }
        ),
        catchError(error => {
          this.abstractService.openSnackBar("Saison konnte nicht geändert werden.");
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (!error) this.abstractService.openSnackBar("Saison wurde erfolgreich geändert.");
        }
      );
  }

  addNewSeason() {
    const lastSeason = this.seasons[this.seasons.length - 1];
    const newSeason: Season = {
      beginningYear: lastSeason.beginningYear + 1,
      endingYear: lastSeason.endingYear + 1,
    };
    this.dataService.addSeason(newSeason).pipe(first()).subscribe()
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
