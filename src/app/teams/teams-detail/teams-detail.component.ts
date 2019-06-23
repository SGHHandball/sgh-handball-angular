import {Component, Input} from '@angular/core';
import {Team} from "../team";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog, MatSnackBar} from "@angular/material";
import {TeamsService} from "../teams.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultDialogComponent, DialogData} from "../../abstract/default-dialog/default-dialog.component";
import {
  TC_CANCEL,
  TC_GENERAL_DELETE_HEADER,
  TC_GENERAL_DELETE_MESSAGE, TC_SAVE,
  TranslationService
} from "../../translation.service";

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent extends AbstractComponent {

  @Input() team: Team;

  uploadProgress: Observable<number>;
  changedValues = false;


  cancelTC = TC_CANCEL;
  saveTC = TC_SAVE;


  constructor(breakpointObserver: BreakpointObserver,
              snackBar: MatSnackBar,
              private dialog: MatDialog,
              public teamsService: TeamsService,
              public translationService: TranslationService) {
    super(breakpointObserver, snackBar);
  }

  upload(event) {
    const uploadTask = this.teamsService.uploadImage(event);
    this.uploadProgress = uploadTask.snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    uploadTask.then(snap => {
      this.uploadProgress = undefined;
      snap.ref.getDownloadURL().then(url => {
        if (!environment.production) console.log(url);
        if (!this.team.imgUrls) {
          this.team.imgUrls = [];
        }
        this.team.imgUrls.push(url);
        this.changedValues = true;
      });
    })
  }

  deleteImage(imagePath: string) {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.team.imgUrls.splice(this.team.imgUrls.indexOf(imagePath), 1);
        this.changedValues = true;
      }
    });
  }

  saveTeam() {
    this.teamsService.saveNewTeamValues(this.team, () => {
      this.changedValues = false;
    })
  }

  disableEditMode() {
    this.teamsService.editTeamsActive = false;
  }
}
