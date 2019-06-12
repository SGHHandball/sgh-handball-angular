import {Component, Inject, OnInit, Optional} from '@angular/core';
import {
  TC_BACK,
  TC_GENERAL_REQUIRED_ERROR, TC_HALLS_ADD_NEW_HALL_SUCCESS,
  TC_HALLS_CITY,
  TC_HALLS_EDIT_HALL, TC_HALLS_EDIT_HALL_FAIL, TC_HALLS_EDIT_HALL_SUCCESS,
  TC_HALLS_HALL_ID,
  TC_HALLS_NAME, TC_HALLS_POST_CODE,
  TC_HALLS_STREET,
  TC_SAVE,
  TranslationService
} from "../../translation.service";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {HallsService} from "../halls.service";
import {Hall} from "../hall";

@Component({
  selector: 'app-halls-edit-dialog',
  templateUrl: './halls-edit-dialog.component.html',
  styleUrls: ['./halls-edit-dialog.component.css']
})
export class HallsEditDialogComponent {

  editHallHeader = TC_HALLS_EDIT_HALL;

  backTc = TC_BACK;
  saveTC = TC_SAVE;

  requiredErrorTC = TC_GENERAL_REQUIRED_ERROR;

  hallIdTC = TC_HALLS_HALL_ID;
  hallNameTC = TC_HALLS_NAME;
  hallStreetTC = TC_HALLS_STREET;
  hallCityTC = TC_HALLS_CITY;
  postalCodeTC = TC_HALLS_POST_CODE;

  hallIdFormControl = new FormControl('', [
    Validators.required,
  ]);

  hallNameFormControl = new FormControl('', [
    Validators.required
  ]);

  hallStreetFormControl = new FormControl('', [
    Validators.required
  ]);

  hallCityFormControl = new FormControl('', [
    Validators.required
  ]);

  postalCodeControl = new FormControl('', [
    Validators.required
  ]);

  hall: Hall = new Hall();
  existing: boolean = false;

  constructor(public translationService: TranslationService,
              private hallService: HallsService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<HallsEditDialogComponent>) {
    if (data) {
      this.hall = data;
      this.existing = true;
    }
    this.hallIdFormControl.setValue(this.hall.hallId);
    this.hallNameFormControl.setValue(this.hall.name);
    this.hallStreetFormControl.setValue(this.hall.street);
    this.hallCityFormControl.setValue(this.hall.city);
    this.postalCodeControl.setValue(this.hall.postCode);
  }


  saveHall() {
    this.hall.hallId = this.hallIdFormControl.value;
    this.hall.name = this.hallNameFormControl.value;
    this.hall.street = this.hallStreetFormControl.value;
    this.hall.city = this.hallCityFormControl.value;
    this.hall.postCode = this.postalCodeControl.value;
    this.dialogRef.close({
      hall: this.hall,
      existing: this.existing
    })
  }

}
