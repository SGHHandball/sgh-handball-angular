import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {AdminService} from "../admin/admin.service";
import {MatDialog} from "@angular/material";
import {DataService} from "../data/data.service";
import {Content} from "../model/content";
import {share, switchMap, takeUntil} from "rxjs/operators";
import {SliderImage} from "../model/slider-image";
import {Router} from "@angular/router";
import {
  DB_COLLECTION_CONTENT_CDH,
  DB_COLLECTION_CONTENT_EXECUTIVES,
  DB_COLLECTION_CONTENT_REFEREE, DB_COLLECTION_CONTENT_SPONSORS,
  DB_COLLECTION_CONTENT_TIME_KEEPER
} from "../constants";
import {
  TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE,
  TC_ROUTE_CDH,
  TC_ROUTE_EXECUTIVES,
  TC_ROUTE_REFEREES,
  TC_ROUTE_SPONSORS,
  TC_ROUTE_TIME_KEEPER
} from "../translation.service";
import {IImage} from "ng2-image-compress";
import {DefaultDialogComponent, DialogData} from "../shared/default-dialog/default-dialog.component";
import {AbstractService} from "../shared/abstract.service";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-content-holder',
  templateUrl: './content-holder.component.html',
  styleUrls: ['./content-holder.component.css']
})
export class ContentHolderComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  uploadProgress: Observable<number>;

  constructor(private adminService: AdminService,
              private dataService: DataService,
              private router: Router,
              private dialog: MatDialog,
              public abstractService: AbstractService
  ) {
  }


  editContent = false;
  editImages = false;
  content: Content;
  contentLoaded = false;

  adminRight$ = this.adminService.isUserAdmin().pipe(share());

  ngOnInit(): void {
    this.initHomeContent();
  }


  initHomeContent() {
    const contentTopic = this.getContentTopic();
    if (contentTopic)
      this.dataService
        .getContent(contentTopic)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(content => {
          this.content = content;
          this.contentLoaded = true;
        });
  }

  saveContent(content: string) {
    const contentTopic = this.getContentTopic();
    if (contentTopic)
      this.dataService
        .addContent(contentTopic,
          {
            contentText: content,
            imgLinks: this.content && this.content.imgLinks ? this.content.imgLinks : [],
            imgPaths: this.content && this.content.imgPaths ? this.content.imgPaths : []
          }
        )
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(_ => {
          this.abstractService.openSnackBar("Inhalt erfolgreich bearbeitet")
        });
  }

  changeContent() {
    const contentTopic = this.getContentTopic();
    if (contentTopic)
      this.dataService
        .addContent(contentTopic, this.content)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(_ => {
          this.abstractService.openSnackBar("Reihenfolge erfolgreich geändert")
        });
  }

  getContentTopic(): string {
    if (this.router.url.includes(TC_ROUTE_EXECUTIVES)) return DB_COLLECTION_CONTENT_EXECUTIVES;
    if (this.router.url.includes(TC_ROUTE_REFEREES)) return DB_COLLECTION_CONTENT_REFEREE;
    if (this.router.url.includes(TC_ROUTE_TIME_KEEPER)) return DB_COLLECTION_CONTENT_TIME_KEEPER;
    if (this.router.url.includes(TC_ROUTE_CDH)) return DB_COLLECTION_CONTENT_CDH;
    if (this.router.url.includes(TC_ROUTE_SPONSORS)) return DB_COLLECTION_CONTENT_SPONSORS;
    return undefined;
  }

  upload(image: IImage) {
    this.uploadProgress = undefined;
    this.dataService.uploadImage(image, this.getContentTopic())
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          imageProgress => {
            if (imageProgress.uploadDone) {
              if (!environment.production) console.log(imageProgress);
              if (!this.content.imgPaths) this.content.imgPaths = [];
              if (!this.content.imgLinks) this.content.imgLinks = [];
              this.content.imgPaths.push(imageProgress.path);
              this.content.imgLinks.push(imageProgress.url);
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
              return this.dataService.addContent(this.getContentTopic(), this.content);
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
        switchMap(result => {
            if (result) {
              return this.dataService.deleteImage(this.content.imgPaths[index])
            }
            return of("Cancel")
          }
        ),
        switchMap(result => {
            if (!result) {
              this.content.imgLinks.splice(index, 1);
              this.content.imgPaths.splice(index, 1);
              return this.dataService.addContent(this.getContentTopic(), this.content);
            }
            return of(undefined)
          }
        )
      )
      .subscribe();
  }


  getSlideImage(imgLinks: string[]): SliderImage[] {
    return imgLinks.map(link => {
      return {img: link}
    })
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
