import {TC_ROUTE_ADMIN, TC_ROUTE_IMPRINT, TC_ROUTE_NEWS} from "../../translation.service";

export class NavigationItem {
  routerLink: string;
  routerName: string;


  constructor(routerLink: string, routerName: string) {
    this.routerLink = routerLink;
    this.routerName = routerName;
  }
}

export const ROUTE_INDEX = '';


export const NAVIGATION_ITEMS = [
  new NavigationItem(TC_ROUTE_NEWS, TC_ROUTE_NEWS),
  new NavigationItem(TC_ROUTE_IMPRINT, TC_ROUTE_IMPRINT)
];
