import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {AdminService} from "../admin/admin.service";
import {MatDialog} from "@angular/material";
import {DataService} from "../data/data.service";
import {Content} from "../model/content";
import {first, switchMap, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DB_COLLECTION_CONTENT_CDH,
  DB_COLLECTION_CONTENT_CORONA,
  DB_COLLECTION_CONTENT_EXECUTIVES,
  DB_COLLECTION_CONTENT_HOME,
  DB_COLLECTION_CONTENT_REFEREE,
  DB_COLLECTION_CONTENT_TIME_KEEPER
} from "../constants";
import {
  TC_GENERAL_DELETE_HEADER,
  TC_GENERAL_DELETE_MESSAGE,
  TC_ROUTE_CDH,
  TC_ROUTE_CORONA,
  TC_ROUTE_EXECUTIVES,
  TC_ROUTE_HOME,
  TC_ROUTE_REFEREES,
  TC_ROUTE_TIME_KEEPER
} from "../translation.service";
import {IImage} from "ng2-image-compress";
import {DefaultDialogComponent, DialogData} from "../shared/default-dialog/default-dialog.component";
import {AbstractService} from "../shared/abstract.service";
import {environment} from "../../environments/environment";
import {Location} from "@angular/common";
import {Team} from "../model/team";


@Component({
  selector: 'app-content-holder-edit',
  templateUrl: './content-holder-edit.component.html',
  styleUrls: ['./content-holder-edit.component.css']
})
export class ContentHolderEditComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  uploadProgress: Observable<number>;

  constructor(private adminService: AdminService,
              private dataService: DataService,
              private router: Router,
              private dialog: MatDialog,
              public abstractService: AbstractService,
              private location: Location,
              private route: ActivatedRoute
  ) {
  }


  content: Content;
  contentLoaded = false;

  @Input() nonStaticContent: boolean;

  home: boolean;


  team: Team;

  ngOnInit(): void {
    this.home = this.getContentTopic() === DB_COLLECTION_CONTENT_HOME;
    this.initContent();
  }


  initContent() {
    const contentTopic = this.getContentTopic();
    if (contentTopic) {
      this.dataService
        .getContent(contentTopic)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(content => {
          this.content = content;
          this.contentLoaded = true;
        });
    } else {
      this.initTeam()
    }
  }

  initTeam() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => {
          let teamAge = this.route.snapshot.paramMap.get('teamAge');
          let season = this.route.snapshot.paramMap.get('season');
          return this.dataService.getTeamsBySeasonAndAge(season, teamAge);
        })
      )
      .subscribe(teams => {
        if (teams && teams.length > 0) {
          this.team = teams[0];
          this.content = {
            contentText: this.team.teamText,
            imgPaths: this.team.imgPaths,
            imgLinks: this.team.imgLinks
          };
          this.contentLoaded = true;
        }
      });
  }

  saveContent(content: string) {
    const contentTopic = this.getContentTopic();
    if (contentTopic) {
      this.dataService
        .addContent(contentTopic,
          {
            contentText: content,
            imgLinks: this.content && this.content.imgLinks ? this.content.imgLinks : [],
            imgPaths: this.content && this.content.imgPaths ? this.content.imgPaths : []
          }
        )
        .pipe(first())
        .subscribe(_ => {
          this.abstractService.openSnackBar("Inhalt erfolgreich bearbeitet")
        });
    } else {
      this.content.contentText = content;
      this.editTeam();
    }
  }

  changeThisContent() {
    this.dataService
      .addContent(this.getContentTopic(), this.content)
      .pipe(first())
      .subscribe(_ => {
        this.abstractService.openSnackBar("Inhalt erfolgreich bearbeitet")
      });
  }

  changeContent() {
    const contentTopic = this.getContentTopic();
    if (contentTopic) {
      this.changeThisContent();
    } else {
      this.editTeam();
    }
  }

  editTeam() {
    this.team.imgLinks = this.content.imgLinks;
    this.team.imgPaths = this.content.imgPaths;
    this.team.teamText = this.content.contentText;
    this.dataService.updateTeam(this.team)
      .pipe(first())
      .subscribe()
  }

  getContentTopic(): string {
    if (this.router.url.includes(TC_ROUTE_CORONA)) return DB_COLLECTION_CONTENT_CORONA;
    if (this.router.url.includes(TC_ROUTE_EXECUTIVES)) return DB_COLLECTION_CONTENT_EXECUTIVES;
    if (this.router.url.includes(TC_ROUTE_REFEREES)) return DB_COLLECTION_CONTENT_REFEREE;
    if (this.router.url.includes(TC_ROUTE_TIME_KEEPER)) return DB_COLLECTION_CONTENT_TIME_KEEPER;
    if (this.router.url.includes(TC_ROUTE_CDH)) return DB_COLLECTION_CONTENT_CDH;
    if (this.router.url.includes(TC_ROUTE_HOME)) return DB_COLLECTION_CONTENT_HOME;
    return undefined;
  }

  getBack() {
    this.location.back();
  }

  upload(image: IImage) {
    this.uploadProgress = undefined;
    this.dataService.uploadImage(image, this.team ? this.team.id : this.getContentTopic())
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          imageProgress => {
            if (imageProgress.uploadDone) {
              if (!environment.production) console.log(imageProgress);
              if (!this.content.imgPaths) this.content.imgPaths = [];
              if (!this.content.imgLinks) this.content.imgLinks = [];
              this.team ? this.team.imgPaths.push(imageProgress.path) : this.content.imgPaths.push(imageProgress.path);
              this.team ? this.team.imgLinks.push(imageProgress.url) : this.content.imgLinks.push(imageProgress.url);
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
              return this.team ? this.dataService.updateImagesInTeam(this.team) : this.dataService.addContent(this.getContentTopic(), this.content);
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
              return this.dataService.deleteImage(this.team ? this.team.imgPaths[index] : this.content.imgPaths[index])
            }
            return of("Cancel")
          }
        ),
        switchMap(result => {
            if (!result) {
              this.team ? this.team.imgLinks.splice(index, 1) : this.content.imgLinks.splice(index, 1);
              this.team ? this.team.imgPaths.splice(index, 1) : this.content.imgPaths.splice(index, 1);
              return this.team ? this.dataService.updateImagesInTeam(this.team) : this.dataService.addContent(this.getContentTopic(), this.content);
            }
            return of(undefined)
          }
        )
      )
      .subscribe();
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
