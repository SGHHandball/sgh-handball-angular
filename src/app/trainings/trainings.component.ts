import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Trainer, Training, TrainingDate, TrainingGroup} from "./training";
import {TrainingsService} from "./trainings.service";
import {
  TC_FILTER,
  TC_GENERAL_DELETE_HEADER,
  TranslationService,
  TC_GENERAL_DELETE_SUCCESS,
  TC_GENERAL_DELETE_FAIL,
  TC_GENERAL_DELETE_MESSAGE,
  TC_TRAININGS_TRAINING_TEAM,
  TC_TRAININGS_TRAINING_DATE,
  TC_TRAININGS_TRAINING_TRAINER,
  TC_TRAININGS_EDIT_TRAINING_SUCCESS, TC_TRAININGS_ADD_NEW_TRAINING_SUCCESS, TC_TRAININGS_EDIT_TRAINING_FAIL
} from "../translation.service";
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TrainingsEditDialogComponent} from "./trainings-edit-dialog/trainings-edit-dialog.component";
import {AdminService} from "../admin/admin.service";
import {DefaultDialogComponent, DialogData} from "../abstract/default-dialog/default-dialog.component";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent extends AbstractComponent implements OnInit {


  displayedColumnsAdmin: string[] = [TC_TRAININGS_TRAINING_TEAM, TC_TRAININGS_TRAINING_DATE, TC_TRAININGS_TRAINING_TRAINER, 'edit', 'delete'];
  displayedColumns: string[] = [TC_TRAININGS_TRAINING_TEAM, TC_TRAININGS_TRAINING_DATE, TC_TRAININGS_TRAINING_TRAINER];
  dataSource: MatTableDataSource<TrainingGroup> = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public breakpointObserver: BreakpointObserver,
              private trainingsService: TrainingsService,
              public translationService: TranslationService,
              private dialog: MatDialog,
              public adminService: AdminService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit() {
    this.trainingsService.trainingsObservable.subscribe(trainings => {
      this.dataSource = new MatTableDataSource(this.getAllTrainingGroups(trainings));
      this.dataSource.paginator = this.paginator;
    });
  }


  getAllTrainingGroups(trainings: Training[]): TrainingGroup[] {
    const trainingGroups: TrainingGroup[] = [];
    trainings.forEach(training => {
      let existingGroup: TrainingGroup;
      trainingGroups.forEach(group => {
        if (training.team.teamId === group.teamId) {
          existingGroup = group;
        }
      });
      if (existingGroup) {
        existingGroup.trainings.push(training);
      } else {
        trainingGroups.push(new TrainingGroup(training.team.teamId, [training]))
      }
    });
    return trainingGroups;
  }


  openTrainingsEditDialog(training: Training | undefined) {
    if (this.adminService.isUserAdmin()) {
      const dialogRef = this.dialog.open(TrainingsEditDialogComponent, {
          width: this.dialogWidth,
          data: training
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.trainingsService.changeTraining(result.training, result.existing)
            .then((success) => {
              if (success) {
                this.openSnackBar(this.translationService.get(result.existing ? TC_TRAININGS_EDIT_TRAINING_SUCCESS : TC_TRAININGS_ADD_NEW_TRAINING_SUCCESS));
              } else {
                this.openSnackBar(this.translationService.get(TC_TRAININGS_EDIT_TRAINING_FAIL))
              }
            })
            .catch(() => this.openSnackBar(this.translationService.get(TC_TRAININGS_EDIT_TRAINING_FAIL)))
        }
      });
    }
  }

  getTrainingDateAsString(date: TrainingDate): string {
    let hallString = '';
    // TODO: Add this
   /* this.hallsService.halls.forEach(hall => {
      if (hall.id === date.hallId) {
        hallString = hall.name;
      }
    });*/
    return date.day + ' ' + date.time + '/ ' + hallString;
  }


  deleteTraining(training: Training) {
    //TODO: CHANGE THIS
    if (this.adminService.isUserAdmin()) {
      const dialogRef = this.dialog.open(DefaultDialogComponent, {
          width: this.dialogWidth,
          data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.trainingsService.deleteTraining(training).then(() => {
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS))
          }).catch(error => {
            if (!environment.production) console.log(error);
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL))
          });
        }
      });
    }
  }
}

