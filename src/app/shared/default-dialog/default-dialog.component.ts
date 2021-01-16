import {Component, Inject,} from '@angular/core';
import {
  TC_CANCEL,
  TC_OK, TranslationService
} from "../../translation.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-default-dialog',
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.css']
})
export class DefaultDialogComponent {

  cancelTC = TC_CANCEL;
  okTC = TC_OK;


  constructor(public translationService: TranslationService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

}

export class DialogData {
  header: string;
  message: string;


  constructor(header: string | undefined, message: string | undefined) {
    this.header = header;
    this.message = message;
  }
}
