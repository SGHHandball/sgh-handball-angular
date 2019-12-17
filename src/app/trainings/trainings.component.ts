import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {Training, TrainingDate, TrainingGroup} from "./training";
import {
  TC_GENERAL_DELETE_HEADER,
  TranslationService,
  TC_GENERAL_DELETE_SUCCESS,
  TC_GENERAL_DELETE_FAIL,
  TC_GENERAL_DELETE_MESSAGE,
  TC_TRAININGS_TRAINING_TEAM,
  TC_TRAININGS_TRAINING_DATE,
  TC_TRAININGS_TRAINING_TRAINER,
  TC_TRAININGS_EDIT_TRAINING_SUCCESS,
  TC_TRAININGS_EDIT_TRAINING_FAIL,
} from "../translation.service";
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TrainingsEditDialogComponent} from "./trainings-edit-dialog/trainings-edit-dialog.component";
import {AdminService} from "../admin/admin.service";
import {DefaultDialogComponent, DialogData} from "../abstract/default-dialog/default-dialog.component";
import {environment} from "../../environments/environment";
import {DataService} from "../common/data.service";
import {Observable, of, Subject} from "rxjs";
import {catchError, switchMap, takeUntil} from "rxjs/operators";
import {TeamService} from "../teams/team.service";
import {DEFAULT_YEAR} from "../constants";
import {Team} from "../teams/team";
import {Hall} from "../halls/hall";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent extends AbstractComponent implements OnInit, OnDestroy {

  displayedColumnsAdmin: string[] = [TC_TRAININGS_TRAINING_TEAM, TC_TRAININGS_TRAINING_DATE, TC_TRAININGS_TRAINING_TRAINER, 'edit', 'delete'];
  displayedColumns: string[] = [TC_TRAININGS_TRAINING_TEAM, TC_TRAININGS_TRAINING_DATE, TC_TRAININGS_TRAINING_TRAINER];
  dataSource: MatTableDataSource<TrainingGroup> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  destroy$ = new Subject();

  teams: Team[];
  halls: Hall[];

  constructor(public breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              private dialog: MatDialog,
              public adminService: AdminService,
              private dataService: DataService,
              public teamService: TeamService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit() {
    this.initHalls();
    this.initTeams();
    this.initTrainings();
  }

  initTrainings() {
    this.dataService
      .getAllTrainings()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(trainings => {
        this.dataSource = new MatTableDataSource(this.getAllTrainingGroups(trainings));
        this.dataSource.paginator = this.paginator;
      })
  }

  initTeams() {
    this.dataService
      .getTeamsBySeason(DEFAULT_YEAR)
      .pipe(takeUntil(this.destroy$))
      .subscribe(teams => {
        this.teams = teams;
      })
  }

  initHalls() {
    this.dataService
      .getAllHalls()
      .pipe(takeUntil(this.destroy$))
      .subscribe(halls => {
        this.halls = halls;
      })
  }


  getAllTrainingGroups(trainings: Training[]): TrainingGroup[] {
    const trainingGroups: TrainingGroup[] = [];
    trainings.forEach(
      training => {
        const existingGroups = trainingGroups.filter(group => training.team.teamId === group.teamId);
        if (existingGroups.length > 0) {
          existingGroups[0].trainings.push(training);
        } else {
          trainingGroups.push({
            teamId: training.team.teamId,
            trainings: [training]
          })
        }
      }
    );
    return trainingGroups;
  }

  openTrainingsEditDialog(training: Training | undefined) {
    return this.dialog
      .open(
        TrainingsEditDialogComponent, {
          width: this.dialogWidth,
          data: {training: training, halls: this.halls, teams: this.teams}
        }
      )
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          result => {
            if (result) {
              if (result.existing) {
                return this.dataService.changeTraining(result.training);
              } else {
                return this.dataService.addTraining(result.training);
              }
            }
            return of("Cancel")
          }
        ),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_TRAININGS_EDIT_TRAINING_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (!error) this.openSnackBar(this.translationService.get(TC_TRAININGS_EDIT_TRAINING_SUCCESS));
        }
      );
  }

  getTrainingDateAsString(date: TrainingDate): string {
    const possibleHalls = this.halls.filter(hall => hall.id === date.hallId);
    return [date.day, date.time, '/', possibleHalls.length > 0 ? possibleHalls[0].name : ''].join(' ');
  }


  deleteTraining(training: Training) {
    this.dialog
      .open(
        DefaultDialogComponent, {
          width: this.dialogWidth,
          data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
        }
      )
      .afterClosed()
      .pipe(
        switchMap(
          result => {
            if (result) {
              return this.dataService.deleteTraining(training);
            }
            return of("Error")
          }
        ),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (!error) {
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS));
          }
        }
      );
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}

