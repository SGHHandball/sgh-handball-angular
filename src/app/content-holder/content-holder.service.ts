import {Injectable} from '@angular/core';
import {
  TC_ROUTE_CDH,
  TC_ROUTE_CORONA,
  TC_ROUTE_EXECUTIVES, TC_ROUTE_HANDBALL,
  TC_ROUTE_HOME,
  TC_ROUTE_REFEREES,
  TC_ROUTE_TIME_KEEPER
} from "../translation.service";
import {
  DB_COLLECTION_CONTENT_CDH,
  DB_COLLECTION_CONTENT_CORONA,
  DB_COLLECTION_CONTENT_EXECUTIVES, DB_COLLECTION_CONTENT_HANDBALL,
  DB_COLLECTION_CONTENT_HOME,
  DB_COLLECTION_CONTENT_REFEREE,
  DB_COLLECTION_CONTENT_TIME_KEEPER
} from "../constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ContentHolderService {

  constructor(
    private router: Router,
  ) {
  }

  getContentTopic(): string {
    if (this.router.url.includes(TC_ROUTE_HANDBALL)) return DB_COLLECTION_CONTENT_HANDBALL;
    if (this.router.url.includes(TC_ROUTE_CORONA)) return DB_COLLECTION_CONTENT_CORONA;
    if (this.router.url.includes(TC_ROUTE_EXECUTIVES)) return DB_COLLECTION_CONTENT_EXECUTIVES;
    if (this.router.url.includes(TC_ROUTE_REFEREES)) return DB_COLLECTION_CONTENT_REFEREE;
    if (this.router.url.includes(TC_ROUTE_TIME_KEEPER)) return DB_COLLECTION_CONTENT_TIME_KEEPER;
    if (this.router.url.includes(TC_ROUTE_CDH)) return DB_COLLECTION_CONTENT_CDH;
    if (this.router.url.includes(TC_ROUTE_HOME)) return DB_COLLECTION_CONTENT_HOME;
    return undefined;
  }
}
