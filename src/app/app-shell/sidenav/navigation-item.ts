import {TC_ROUTE_HALLS, TC_ROUTE_IMPRINT, TC_ROUTE_NEWS, TC_ROUTE_TEAMS} from "../../translation.service";

export class NavigationItem {
  routerLink: string;
  routerName: string;

  routerIcon: string;

  constructor(routerLink: string, routerName: string) {
    this.routerLink = routerLink;
    this.routerName = routerName;
  }

  withRouterIcon(routerIcon: string): NavigationItem {
    this.routerIcon = routerIcon;
    return this;
  }
}

export const ROUTE_INDEX = '';


export const NAVIGATION_ITEMS_CLUB = [
  new NavigationItem(TC_ROUTE_NEWS, TC_ROUTE_NEWS).withRouterIcon('notifications'),
  new NavigationItem(TC_ROUTE_TEAMS, TC_ROUTE_TEAMS).withRouterIcon('supervisor_account'),
];

export const NAVIGATION_ITEMS_OTHER = [
  new NavigationItem(TC_ROUTE_HALLS, TC_ROUTE_HALLS).withRouterIcon('home'),
  new NavigationItem(TC_ROUTE_IMPRINT, TC_ROUTE_IMPRINT).withRouterIcon('feedback')
];
