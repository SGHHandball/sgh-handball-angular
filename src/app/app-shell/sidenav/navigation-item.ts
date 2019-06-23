import {
  TC_ROUTE_DOCUMENTS,
  TC_ROUTE_EVENTS,
  TC_ROUTE_HALLS,
  TC_ROUTE_IMPRINT,
  TC_ROUTE_NEWS,
  TC_ROUTE_TEAMS, TC_ROUTE_TRAINING
} from "../../translation.service";

export class NavigationItem {
  routerLink: string;
  routerName: string;

  routerIcon: string;

  subNavigationItems: NavigationItem[];

  constructor(routerLink: string, routerName: string) {
    this.routerLink = routerLink;
    this.routerName = routerName;
  }

  withRouterIcon(routerIcon: string): NavigationItem {
    this.routerIcon = routerIcon;
    return this;
  }

  withSubNavigationItems(subNavigationItems: NavigationItem[]): NavigationItem {
    this.subNavigationItems = subNavigationItems;
    return this;
  }
}

export const ROUTE_INDEX = '';


export const NAVIGATION_ITEMS_CLUB = [
  new NavigationItem(TC_ROUTE_NEWS, TC_ROUTE_NEWS).withRouterIcon('notifications'),
  new NavigationItem(TC_ROUTE_TEAMS, TC_ROUTE_TEAMS).withRouterIcon('supervisor_account'),
];

export const NAVIGATION_ITEMS_INFO = [
  new NavigationItem(TC_ROUTE_EVENTS, TC_ROUTE_EVENTS).withRouterIcon('event'),
  new NavigationItem(TC_ROUTE_TRAINING, TC_ROUTE_TRAINING).withRouterIcon('fitness_center'),
 // new NavigationItem(TC_ROUTE_DOCUMENTS, TC_ROUTE_DOCUMENTS).withRouterIcon('folder'),
];

export const NAVIGATION_ITEMS_OTHER = [
  new NavigationItem(TC_ROUTE_HALLS, TC_ROUTE_HALLS).withRouterIcon('home'),
  new NavigationItem(TC_ROUTE_IMPRINT, TC_ROUTE_IMPRINT).withRouterIcon('feedback')
];
