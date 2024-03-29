import {Component, Inject, OnInit, Optional} from '@angular/core';
import {
  TC_BACK,
  TC_SAVE,
  TC_TRAININGS_EDIT_TRAINING,
  TC_TRAININGS_TRAINING_DATES_DAY,
  TC_TRAININGS_TRAINING_DATES_HALL,
  TC_TRAININGS_TRAINING_DATES_TIME,
  TC_TRAININGS_TRAINING_TEAM_NAME, TC_TRAININGS_TRAINING_TEAM_VINTAGE,
  TC_TRAININGS_TRAINING_TRAINER_MAIL, TC_TRAININGS_TRAINING_TRAINER_NAME,
  TranslationService
} from "../../translation.service";
import {FormControl, Validators} from "@angular/forms";
import {Training, TrainingsDialogData} from "../../model/training";
import {Hall} from "../../model/hall";
import {Team} from "../../model/team";
import {TeamService} from "../../teams/team.service";
import {AbstractService} from "../../shared/abstract.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-trainings-edit-dialog',
  templateUrl: './trainings-edit-dialog.component.html',
  styleUrls: ['./trainings-edit-dialog.component.css']
})
export class TrainingsEditDialogComponent implements OnInit {

  editTrainingHeader = TC_TRAININGS_EDIT_TRAINING;

  backTc = TC_BACK;
  saveTC = TC_SAVE;

  teamNameTC = TC_TRAININGS_TRAINING_TEAM_NAME;
  teamVintageTC = TC_TRAININGS_TRAINING_TEAM_VINTAGE;
  dayTC = TC_TRAININGS_TRAINING_DATES_DAY;
  timeTC = TC_TRAININGS_TRAINING_DATES_TIME;
  hallTC = TC_TRAININGS_TRAINING_DATES_HALL;
  trainerNameTC = TC_TRAININGS_TRAINING_TRAINER_NAME;
  trainerMailTC = TC_TRAININGS_TRAINING_TRAINER_MAIL;

  teamIdFormControl = new FormControl('', [
    Validators.required,
  ]);
  teamVintageFormControl = new FormControl('', [
    Validators.required,
  ]);
  positionFormControl = new FormControl('',);

  dayFormControl = new FormControl('', [
    Validators.required
  ]);
  timeFormControl = new FormControl('', [
    Validators.required
  ]);
  hallFormControl = new FormControl('', [
    Validators.required
  ]);

  trainerNameFormControl = new FormControl();
  trainerMailFormControl = new FormControl();

  training: Training = {
    team: {
      teamId: '',
      teamVintage: ''
    },
    date: {
      day: '',
      time: '',
      hallId: ''
    },
    trainer: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    teamId: '',
    editTime: new Date(),
    position: 0,
  };
  halls: Hall[];
  teams: Team[];
  existing: boolean = false;


  constructor(
    public teamService: TeamService,
    public translationService: TranslationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingsDialogData,
    public dialogRef: MatDialogRef<TrainingsEditDialogComponent>,
    public abstractService: AbstractService) {
  }

  ngOnInit(): void {
    if (this.data.training) {
      this.training = this.data.training;
      this.existing = true;
    }
    this.halls = this.data.halls;
    this.teams = this.data.teams;

    this.teamIdFormControl.setValue(this.training.teamId);
    this.teamVintageFormControl.setValue(this.training.team.teamVintage);
    this.positionFormControl.setValue(this.training.position ? this.training.position : this.data.length);
    this.dayFormControl.setValue(this.training.date.day);
    this.timeFormControl.setValue(this.training.date.time);
    this.hallFormControl.setValue(this.training.date.hallId);
    this.trainerNameFormControl.setValue(this.training.trainer.name);
    this.trainerMailFormControl.setValue(this.training.trainer.email);
  }


  saveTraining() {
    this.training.teamId = this.teamIdFormControl.value;
    this.training.team.teamId = this.teamIdFormControl.value;
    this.training.team.teamVintage = this.teamVintageFormControl.value;
    this.training.position = this.positionFormControl.value;
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
