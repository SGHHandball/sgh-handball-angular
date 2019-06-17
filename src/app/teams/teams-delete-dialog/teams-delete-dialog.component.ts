import {Component, Inject} from '@angular/core';
import {
  TC_CANCEL,
  TC_SAVE,
  TC_TEAMS_CHANGE_ORDER,
  TC_TEAMS_DELETE_TEAM,
  TranslationService
} from "../../translation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Team} from "../team";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-teams-delete-dialog',
  templateUrl: './teams-delete-dialog.component.html',
  styleUrls: ['./teams-delete-dialog.component.css']
})
export class TeamsDeleteDialogComponent {


  cancelTC = TC_CANCEL;
  deleteTeamTC = TC_TEAMS_DELETE_TEAM;

  constructor(public translationService: TranslationService,
              public dialogRef: MatDialogRef<TeamsDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Team[]) {
  }

  deleteItem(team: Team) {
    this.dialogRef.close(team);
  }
}
