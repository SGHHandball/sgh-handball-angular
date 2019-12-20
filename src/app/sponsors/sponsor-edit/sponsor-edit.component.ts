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
import {MatDialog, MatSnackBar} from "@angular/material";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Location} from '@angular/common';

@Component({
  selector: 'app-sponsor-edit',
  templateUrl: './sponsor-edit.component.html',
  styleUrls: ['./sponsor-edit.component.scss']
})
export class SponsorEditComponent extends AbstractComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  uploadProgress: Observable<number>;

  sponsor: Sponsor;

  nameFormControl = new FormControl();
  linkFormControl = new FormControl();
  descriptionFormControl = new FormControl();

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              breakpointObserver: BreakpointObserver,
              private location: Location,
              snackBar: MatSnackBar,) {
    super(breakpointObserver, snackBar);
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
    console.log(this.sponsor);
    this.dataService
      .changeSponsor(this.sponsor)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(_ => {
        this.openSnackBar("Sponsor erfolgreich geändert")
      });
  }


  deleteImage(index: number) {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteImage(this.sponsor.imgPaths[index])
          .pipe(
            takeUntil(this.destroy$),
            switchMap(_ => {
              this.sponsor.imgLinks.splice(index, 1);
              this.sponsor.imgPaths.splice(index, 1);
              return this.dataService.changeSponsor(this.sponsor);
            })
          )
          .subscribe()
      }
    });
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next()
    }
  }
}
