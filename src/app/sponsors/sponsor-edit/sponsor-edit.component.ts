import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Sponsor} from "../../model/sponsor";
import {DataService} from "../../common/data.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {IImage} from "ng2-image-compress";
import {environment} from "../../../environments/environment";
import {DefaultDialogComponent, DialogData} from "../../abstract/default-dialog/default-dialog.component";
import {TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE} from "../../translation.service";
import {MatDialog} from "@angular/material";
import {Location} from '@angular/common';
import {AbstractService} from "../../abstract/abstract.service";

@Component({
  selector: 'app-sponsor-edit',
  templateUrl: './sponsor-edit.component.html',
  styleUrls: ['./sponsor-edit.component.scss']
})
export class SponsorEditComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  uploadProgress: Observable<number>;

  sponsor: Sponsor;

  nameFormControl = new FormControl();
  linkFormControl = new FormControl();
  descriptionFormControl = new FormControl();

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private location: Location,
              private abstractService: AbstractService) {
  }

  ngOnInit() {
    this.initSponsor();
  }

  initSponsor() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const sponsorId = params['sponsorId'];
          return this.dataService.getSponsorsById(sponsorId)
        })
      ).subscribe(sponsor => {
      this.sponsor = sponsor;
      this.initFormControls();
    })
  }

  private initFormControls() {
    if (this.sponsor.sponsorName) this.nameFormControl.setValue(this.sponsor.sponsorName);
    if (this.sponsor.sponsorLink) this.linkFormControl.setValue(this.sponsor.sponsorLink);
    if (this.sponsor.sponsorDescription) this.descriptionFormControl.setValue(this.sponsor.sponsorDescription);
  }

  upload(image: IImage) {
    this.uploadProgress = undefined;
    this.dataService.uploadImage(image, this.sponsor.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          imageProgress => {
            if (imageProgress.uploadDone) {
              if (!environment.production) console.log(imageProgress);
              if (!this.sponsor.imgPaths) this.sponsor.imgPaths = [];
              if (!this.sponsor.imgLinks) this.sponsor.imgLinks = [];
              this.sponsor.imgPaths.push(imageProgress.path);
              this.sponsor.imgLinks.push(imageProgress.url);
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
              return this.dataService.changeSponsor(this.sponsor);
            }
            return of(false)
          }
        )
      ).subscribe();
  }

  saveSponsorValues() {
    this.sponsor.sponsorName = this.nameFormControl.value;
    this.sponsor.sponsorLink = this.linkFormControl.value;
    this.sponsor.sponsorDescription = this.descriptionFormControl.value;
    this.changeSponsor();
  }

  closeEditMode() {
    this.location.back();
  }


  changeSponsor() {
    this.dataService
      .changeSponsor(this.sponsor)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(_ => {
        this.abstractService.openSnackBar("Sponsor erfolgreich geändert")
      });
  }


  deleteImage(index: number) {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth => this.dialog.open(DefaultDialogComponent, {
            width: dialogWidth,
            data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
          }
          ).afterClosed()
        ),
        switchMap(result => {
            if (result) {
              return this.dataService.deleteImage(this.sponsor.imgPaths[index]);
            }
            return of("Cancel")
          }
        ),
        switchMap(result => {
          if (!result) {
            this.sponsor.imgLinks.splice(index, 1);
            this.sponsor.imgPaths.splice(index, 1);
            return this.dataService.changeSponsor(this.sponsor);
          }
          return of(undefined)
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next()
    }
  }
}
