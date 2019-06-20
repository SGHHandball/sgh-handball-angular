import {Component, Inject, Optional} from '@angular/core';
import {
  TC_BACK,
  TC_GENERAL_REQUIRED_ERROR,
  TC_SAVE,
  TC_TRAININGS_EDIT_TRAINING,
  TC_TRAININGS_TRAINING_DATES,
  TC_TRAININGS_TRAINING_DATES_DAY,
  TC_TRAININGS_TRAINING_DATES_HALL,
  TC_TRAININGS_TRAINING_DATES_TIME,
  TC_TRAININGS_TRAINING_TEAM,
  TC_TRAININGS_TRAINING_TRAINER, TC_TRAININGS_TRAINING_TRAINER_MAIL, TC_TRAININGS_TRAINING_TRAINER_NAME,
  TranslationService
} from "../../translation.service";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {TrainingsService} from "../trainings.service";
import {Training} from "../training";
import {TeamsService} from "../../teams/teams.service";
import {HallsService} from "../../halls/halls.service";
import {Hall} from "../../halls/hall";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-trainings-edit-dialog',
  templateUrl: './trainings-edit-dialog.component.html',
  styleUrls: ['./trainings-edit-dialog.component.css']
})
export class TrainingsEditDialogComponent extends AbstractComponent {

  editTrainingHeader = TC_TRAININGS_EDIT_TRAINING;

  backTc = TC_BACK;
  saveTC = TC_SAVE;

  requiredErrorTC = TC_GENERAL_REQUIRED_ERROR;

  teamsIdTC = TC_TRAININGS_TRAINING_TEAM;
  dayTC = TC_TRAININGS_TRAINING_DATES_DAY;
  timeTC = TC_TRAININGS_TRAINING_DATES_TIME;
  hallTC = TC_TRAININGS_TRAINING_DATES_HALL;
  trainerNameTC = TC_TRAININGS_TRAINING_TRAINER_NAME;
  trainerMailTC = TC_TRAININGS_TRAINING_TRAINER_MAIL;


  dayValues = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.'];

  teamIdFormControl = new FormControl('', [
    Validators.required,
  ]);

  dayFormControl = new FormControl('', [
    Validators.required
  ]);
  timeFormControl = new FormControl('', [
    Validators.required
  ]);
  hallFormControl = new FormControl('', [
    Validators.required
  ]);

  trainerNameFormControl = new FormControl('', [
    Validators.required
  ]);
  trainerMailFormControl = new FormControl('', [
    Validators.required
  ]);

  training: Training = new Training();
  existing: boolean = false;


  constructor(breakpointObserver: BreakpointObserver, snackBar: MatSnackBar,
              public translationService: TranslationService,
              public teamsService: TeamsService,
              public hallsService: HallsService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TrainingsEditDialogComponent>) {
    super(breakpointObserver, snackBar);
    if (data) {
      this.training = data;
      this.existing = true;
    }

    this.teamIdFormControl.setValue(this.training.teamId);
    this.dayFormControl.setValue(this.training.date.day);
    this.timeFormControl.setValue(this.training.date.time);
    this.hallFormControl.setValue(this.training.date.hallId);
    this.trainerNameFormControl.setValue(this.training.trainer.name);
    this.trainerMailFormControl.setValue(this.training.trainer.email);
  }

  saveTraining() {
    this.training.teamId = this.teamIdFormControl.value;
    this.training.date.day = this.dayFormControl.value;
    this.training.date.time = this.timeFormControl.value;
    this.training.date.hallId = this.hallFormControl.value;
    this.training.trainer.name = this.trainerNameFormControl.value;
    this.training.trainer.email = this.trainerMailFormControl.value;
    this.dialogRef.close({
      training: this.training,
      existing: this.existing
    })
  }

}
