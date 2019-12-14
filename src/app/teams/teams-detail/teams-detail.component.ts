import {Component, Input} from '@angular/core';
import {Team} from "../team";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog, MatSnackBar} from "@angular/material";
import {TeamsService} from "../teams.service";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultDialogComponent, DialogData} from "../../abstract/default-dialog/default-dialog.component";
import {
  TC_CANCEL,
  TC_GENERAL_DELETE_HEADER,
  TC_GENERAL_DELETE_MESSAGE, TC_SAVE,
  TranslationService
} from "../../translation.service";
import {DataService} from "../../common/data.service";

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent extends AbstractComponent {

  @Input() team: Team;

  uploadProgress: Observable<number>;
  changedValues = false;

  destroy$ = new Subject();

  cancelTC = TC_CANCEL;
  saveTC = TC_SAVE;


  constructor(breakpointObserver: BreakpointObserver,
              snackBar: MatSnackBar,
              private dialog: MatDialog,
              public teamsService: TeamsService,
              private dataService: DataService,
              public translationService: TranslationService) {
    super(breakpointObserver, snackBar);
  }


  upload(event) {
    this.uploadProgress = undefined;
    this.dataService.uploadImage(event, this.team.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          imageProgress => {
            if (imageProgress.uploadDone) {
              if (!environment.production) console.log(imageProgress);
              this.team.imgPaths.push(imageProgress.path);
              this.team.imgLinks.push(imageProgress.url);
              this.uploadProgress = of(imageProgress.progress);
            } else {
              this.uploadProgress = of(imageProgress.progress);
            }
            return of(imageProgress.uploadDone)
          }
        ),
        switchMap(
          doneUploading => {
            if (doneUploading) {
              this.uploadProgress = undefined;
              return this.dataService.updateImagesInTeam(this.team);
            }
            return of(false)
          }
        )
      ).subscribe();
  }


  deleteImage(index: number) {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteImage(this.team.imgPaths[index])
          .pipe(
            takeUntil(this.destroy$),
            switchMap(_ => {
              this.team.imgLinks.splice(index, 1);
              this.team.imgPaths.splice(index, 1);
              return this.dataService.updateImagesInTeam(this.team);
            })
          )
          .subscribe()
      }
    });
  }

  disableEditMode() {
    this.teamsService.editTeamsActive = false;
  }
}
