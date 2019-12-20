import {
  TC_ROUTE_CDH,
  TC_ROUTE_DOCUMENTS,
  TC_ROUTE_EVENTS, TC_ROUTE_EXECUTIVES, TC_ROUTE_GENERAL_INFORMATION,
  TC_ROUTE_HALLS, TC_ROUTE_HOME,
  TC_ROUTE_IMPRINT,
  TC_ROUTE_NEWS, TC_ROUTE_REFEREES, TC_ROUTE_SPONSORS,
  TC_ROUTE_TEAMS, TC_ROUTE_TIME_KEEPER, TC_ROUTE_TRAINING
} from "../../translation.service";

export class NavigationItem {
  routerLink: string;
  routerDeepLink: string;
  routerName: string;
  routerIcon: string;

  noRouterLinkAction:boolean;

  constructor(routerLink: string, routerName: string) {
    this.routerLink = routerLink;
    this.routerName = routerName;
  }

  withRouterIcon(routerIcon: string): NavigationItem {
    this.routerIcon = routerIcon;
    return this;
  }

  withRouterDeepLink(routerDeepLink: string): NavigationItem {
    this.routerDeepLink = routerDeepLink;
    return this;
  }

  withNoRouterLinkAction(noRouterLinkAction:boolean): NavigationItem {
    this.noRouterLinkAction = noRouterLinkAction;
    return this;
  }
}

export const ROUTE_INDEX = '';


export const NAVIGATION_ITEMS_CLUB = [
  new NavigationItem(TC_ROUTE_HOME, TC_ROUTE_HOME).withRouterIcon('home'),
  new NavigationItem(TC_ROUTE_NEWS, TC_ROUTE_NEWS).withRouterIcon('notifications'),
];

export const NAVIGATION_ITEM_TEAM = [
  new NavigationItem(TC_ROUTE_TEAMS, TC_ROUTE_TEAMS)
    .withRouterIcon('supervisor_account')
    .withNoRouterLinkAction(true)
];

export const NAVIGATION_ITEM_GENERAL_INFORMATION = [
  new NavigationItem(TC_ROUTE_GENERAL_INFORMATION, TC_ROUTE_GENERAL_INFORMATION)
    .withRouterIcon('info')
    .withNoRouterLinkAction(true)
];

export const NAVIGATION_ITEMS_GEN_INFOS = [
  new NavigationItem(TC_ROUTE_EXECUTIVES, TC_ROUTE_EXECUTIVES),
  new NavigationItem(TC_ROUTE_REFEREES, TC_ROUTE_REFEREES),
  new NavigationItem(TC_ROUTE_TIME_KEEPER, TC_ROUTE_TIME_KEEPER),
  /*new NavigationItem(TC_ROUTE_DOCUMENTS, TC_ROUTE_DOCUMENTS),*/
];

export const NAVIGATION_ITEMS_INFO = [
  new NavigationItem(TC_ROUTE_EVENTS, TC_ROUTE_EVENTS).withRouterIcon('event'),
  new NavigationItem(TC_ROUTE_TRAINING, TC_ROUTE_TRAINING).withRouterIcon('fitness_center'),
];

export const NAVIGATION_ITEMS_OTHER = [
  new NavigationItem(TC_ROUTE_SPONSORS, TC_ROUTE_SPONSORS).withRouterIcon('sports_handball'),
  new NavigationItem(TC_ROUTE_HALLS, TC_ROUTE_HALLS).withRouterIcon('account_balance'),
  new NavigationItem(TC_ROUTE_IMPRINT, TC_ROUTE_IMPRINT).withRouterIcon('feedback')
];
