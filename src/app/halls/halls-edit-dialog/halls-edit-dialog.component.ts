import {Component, Inject, OnInit, Optional} from '@angular/core';
import {
  TC_BACK,
  TC_GENERAL_REQUIRED_ERROR,
  TC_HALLS_CITY,
  TC_HALLS_EDIT_HALL,
  TC_HALLS_HALL_ID,
  TC_HALLS_NAME, TC_HALLS_POST_CODE,
  TC_HALLS_STREET,
  TC_SAVE,
  TranslationService
} from "../../translation.service";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Hall} from "../../model/hall";

@Component({
  selector: 'app-halls-edit-dialog',
  templateUrl: './halls-edit-dialog.component.html',
  styleUrls: ['./halls-edit-dialog.component.css']
})
export class HallsEditDialogComponent implements OnInit {

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

  hall: Hall = {
    name: '',
    street: '',
    city: '',
  };
  existing: boolean = false;

  constructor(public translationService: TranslationService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<HallsEditDialogComponent>) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.hall = this.data;
      this.existing = true;
    }
    this.hallIdFormControl.setValue(this.hall.hallId ? this.hall.hallId : undefined);
    this.hallNameFormControl.setValue(this.hall.name);
    this.hallStreetFormControl.setValue(this.hall.street);
    this.hallCityFormControl.setValue(this.hall.city);
    this.postalCodeControl.setValue(this.hall.postCode ? this.hall.postCode : undefined);
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
