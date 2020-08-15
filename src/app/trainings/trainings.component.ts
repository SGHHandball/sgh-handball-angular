import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Training, TrainingDate, TrainingGroup} from "../model/training";
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
  TC_TRAININGS_TRAINING_TEAM_NAME,
  TC_TRAININGS_TRAINING_TEAM_VINTAGE,
  TC_TRAININGS_TRAINING_DATES_DAY,
  TC_TRAININGS_TRAINING_DATES_TIME,
  TC_TRAININGS_TRAINING_DATES_HALL,
  TC_TRAININGS_TRAINING_TRAINER_NAME, TC_TRAININGS_TRAINING_TRAINER_MAIL,
} from "../translation.service";
import {TrainingsEditDialogComponent} from "./trainings-edit-dialog/trainings-edit-dialog.component";
import {AdminService} from "../admin/admin.service";
import {DefaultDialogComponent, DialogData} from "../shared/default-dialog/default-dialog.component";
import {environment} from "../../environments/environment";
import {DataService} from "../data/data.service";
import {forkJoin, of, Subject, zip} from "rxjs";
import {catchError, first, switchMap, takeUntil} from "rxjs/operators";
import {TeamService} from "../teams/team.service";
import {Team} from "../model/team";
import {Hall} from "../model/hall";
import {SeasonService} from "../admin/seasons/season.service";
import {AbstractService} from "../shared/abstract.service";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit, OnDestroy {

  displayedColumnsAdmin: string[] = [
    TC_TRAININGS_TRAINING_TEAM_NAME,
    TC_TRAININGS_TRAINING_TEAM_VINTAGE,
    TC_TRAININGS_TRAINING_DATES_DAY,
    TC_TRAININGS_TRAINING_DATES_TIME,
    TC_TRAININGS_TRAINING_DATES_HALL,
    TC_TRAININGS_TRAINING_TRAINER_NAME,
    TC_TRAININGS_TRAINING_TRAINER_MAIL,
    'edit', 'delete', 'order'];
  displayedColumns: string[] = [
    TC_TRAININGS_TRAINING_TEAM_NAME,
    TC_TRAININGS_TRAINING_TEAM_VINTAGE,
    TC_TRAININGS_TRAINING_DATES_DAY,
    TC_TRAININGS_TRAINING_DATES_TIME,
    TC_TRAININGS_TRAINING_DATES_HALL,
    TC_TRAININGS_TRAINING_TRAINER_NAME,
    TC_TRAININGS_TRAINING_TRAINER_MAIL
  ];
  dataSource: MatTableDataSource<TrainingGroup> = new MatTableDataSource();

  destroy$ = new Subject();

  teams: Team[];
  halls: Hall[];

  trainingsAdmin: boolean;
  trainingsAdminOnceReceived = false;

  dialogWidth: string;

  constructor(
    public translationService: TranslationService,
    private dialog: MatDialog,
    public adminService: AdminService,
    private dataService: DataService,
    public teamService: TeamService,
    private seasonService: SeasonService,
    public abstractService: AbstractService
  ) {
  }

  ngOnInit() {
    this.initDialogWidth();
    this.initTrainingsAdmin();
    this.initHalls();
    this.initTeams();
    this.initTrainings();
  }

  initDialogWidth() {
    this.abstractService
      .dialogWidth$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dialogWidth => this.dialogWidth = dialogWidth);
  }

  initTrainingsAdmin() {
    this.adminService
      .isUserTrainingsAdmin()
      .pipe(takeUntil(this.destroy$))
      .subscribe(admin => {
        this.trainingsAdmin = admin;
        this.trainingsAdminOnceReceived = true;
      })
  }

  initTrainings() {
    this.dataService
      .getAllTrainings()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(trainings => {
        this.dataSource = new MatTableDataSource(this.getAllTrainingGroups(trainings));
      })
  }

  initTeams() {
    this.dataService.getCurrentSeason()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(currentSeason => this.dataService.getTeamsBySeason(this.seasonService.getSeasonAsString(currentSeason)))
      )
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
          data: {training: training, halls: this.halls, teams: this.teams, length: this.dataSource.data.length}
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
          this.abstractService.openSnackBar(this.translationService.get(TC_TRAININGS_EDIT_TRAINING_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (!error) this.abstractService.openSnackBar(this.translationService.get(TC_TRAININGS_EDIT_TRAINING_SUCCESS));
        }
      );
  }

  getTrainingDateAsString(date: TrainingDate): string {
    const possibleHalls = this.halls.filter(hall => hall.id === date.hallId);
    return possibleHalls.length > 0 ? this.getHallName(possibleHalls[0]) : '';
  }

  getHallName(hall: Hall): string {
    return [hall.name, hall.street, hall.city].join("; ")
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
          this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (!error) {
            this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS));
          }
        }
      );
  }


  moveOrderTraining(trainingGroup: TrainingGroup, up: boolean) {
    const currentPosition = trainingGroup.trainings && trainingGroup.trainings.length > 0 ? trainingGroup.trainings[0].position : -1;
    if (currentPosition > -1) {
      const newPosition = up ? currentPosition - 1 : currentPosition + 1;
      const otherTrainingGroup = this.dataSource.data.find(group => !!group.trainings && group.trainings.length > 0 &&
        group.trainings[0].position === newPosition);
      zip(
        forkJoin(trainingGroup.trainings.map(training => {
          return this.dataService.changeTraining({...training, position: newPosition})
        })),
        forkJoin(otherTrainingGroup.trainings.map(training => {
          return this.dataService.changeTraining({...training, position: currentPosition})
        }))
      ).pipe(first()).subscribe(_=>{
        this.abstractService.openSnackBar("Position erfolgreich geändert.");
      })
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}

