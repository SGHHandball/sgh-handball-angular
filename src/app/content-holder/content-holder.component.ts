import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AdminService} from "../admin/admin.service";
import {DataService} from "../data/data.service";
import {Content} from "../model/content";
import {share, takeUntil} from "rxjs/operators";
import {SliderImage} from "../model/slider-image";
import {Router} from "@angular/router";
import {DB_COLLECTION_CONTENT_HOME} from "../constants";
import {TC_ROUTE_EDIT} from "../translation.service";
import {IImage} from "ng2-image-compress";
import {AbstractService} from "../shared/abstract.service";
import {ContentHolderService} from "./content-holder.service";


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
              public abstractService: AbstractService,
              private contentHolderService: ContentHolderService,
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
    this.home = this.contentHolderService.getContentTopic() === DB_COLLECTION_CONTENT_HOME;
    this.initContent();
  }


  initContent() {
    const contentTopic = this.contentHolderService.getContentTopic();
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
