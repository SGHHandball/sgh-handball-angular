import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  DB_COLLECTION_CONTENT_EXECUTIVES, DB_COLLECTION_CONTENT_HOME,
  DB_COLLECTION_CONTENT_REFEREE,
  DB_COLLECTION_CONTENT_TIME_KEEPER
} from "../constants";
import {
  TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE,
  TC_ROUTE_CDH,
  TC_ROUTE_EXECUTIVES, TC_ROUTE_HOME, TC_ROUTE_EDIT,
  TC_ROUTE_REFEREES,
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
              public abstractService: AbstractService
  ) {
  }


  @Input() content: Content;
  @Input() contentLoaded = false;

  @Input() nonStaticContent: boolean;

  @Output() changeContentListener = new EventEmitter<Content>();
  @Output() changeImgOrderListener = new EventEmitter<Content>();
  @Output() uploadImgListener = new EventEmitter<IImage>();
  @Output() deleteImgListener = new EventEmitter<number>();

  adminRight$ = this.adminService.isUserAdmin().pipe(share());

  home: boolean;

  ngOnInit(): void {
    this.home = this.getContentTopic() === DB_COLLECTION_CONTENT_HOME;
    this.initContent();
  }


  initContent() {
    const contentTopic = this.getContentTopic();
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

  getContentTopic(): string {
    if (this.router.url.includes(TC_ROUTE_EXECUTIVES)) return DB_COLLECTION_CONTENT_EXECUTIVES;
    if (this.router.url.includes(TC_ROUTE_REFEREES)) return DB_COLLECTION_CONTENT_REFEREE;
    if (this.router.url.includes(TC_ROUTE_TIME_KEEPER)) return DB_COLLECTION_CONTENT_TIME_KEEPER;
    if (this.router.url.includes(TC_ROUTE_CDH)) return DB_COLLECTION_CONTENT_CDH;
    return DB_COLLECTION_CONTENT_HOME;
  }


  getSlideImage(imgLinks: string[]): SliderImage[] {
    return imgLinks.map(link => {
      return {img: link}
    })
  }

  openEditPage() {
    const editPage = this.router.url.replace("/", ("/" + TC_ROUTE_EDIT + "/"));
    this.router.navigate([editPage])
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
