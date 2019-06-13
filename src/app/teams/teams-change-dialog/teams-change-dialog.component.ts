import {Component, Inject} from '@angular/core';
import {TC_CANCEL, TC_SAVE, TC_TEAMS_CHANGE_ORDER, TranslationService} from "../../translation.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Team} from "../team";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-teams-change-dialog',
  templateUrl: './teams-change-dialog.component.html',
  styleUrls: ['./teams-change-dialog.component.css']
})
export class TeamsChangeDialogComponent {


  cancelTC = TC_CANCEL;
  saveTC = TC_SAVE;
  changeOrderTC = TC_TEAMS_CHANGE_ORDER;

  unsavedChanges = false;


  constructor(public translationService: TranslationService,
              @Inject(MAT_DIALOG_DATA) public data: Team[]) {
  }

  drop(event: CdkDragDrop<Team[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.unsavedChanges = true;
  }
}
