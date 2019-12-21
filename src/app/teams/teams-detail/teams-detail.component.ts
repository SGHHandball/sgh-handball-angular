import {Component, Input} from '@angular/core';
import {Team} from "../team";
import {MatDialog} from "@angular/material";
import {switchMap, takeUntil} from "rxjs/operators";
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
import {FormControl} from "@angular/forms";
import {SliderService} from "../../abstract/slider/slider.service";
import {IImage} from "ng2-image-compress";
import {AbstractService} from "../../abstract/abstract.service";

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent {

  @Input() team: Team;
  @Input() editTeamsActive: boolean;
  @Input() editTeamLinkActive: boolean;

  uploadProgress: Observable<number>;
  changedValues = false;

  destroy$ = new Subject();

  cancelTC = TC_CANCEL;
  saveTC = TC_SAVE;

  linkEditFormControl = new FormControl();

  constructor(public abstractService: AbstractService,
              private dialog: MatDialog,
              private dataService: DataService,
              public translationService: TranslationService,
              public sliderService: SliderService
  ) {
  }


  upload(image: IImage) {
    this.uploadProgress = undefined;
    this.dataService.uploadImage(image, this.team.id)
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
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth =>
          this.dialog.open(DefaultDialogComponent, {
              width: dialogWidth,
              data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
            }
          ).afterClosed()
        ),
        switchMap(
          result => {
            if (result) {
              return this.dataService.deleteImage(this.team.imgPaths[index]);
            }
            return of("Cancel")
          }
        ),
        switchMap(result => {
          if (!result) {
            this.team.imgLinks.splice(index, 1);
            this.team.imgPaths.splice(index, 1);
            return this.dataService.updateImagesInTeam(this.team);
          }
          return of(undefined)
        })
      )
      .subscribe();
  }

  disableEditMode() {
    this.editTeamsActive = false;
  }

  disableEditLinkMode() {
    this.team.nuLeagueLink = this.linkEditFormControl.value;
    this.dataService
      .updateTeam(this.team)
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        this.editTeamLinkActive = false;
      })
  }
}
