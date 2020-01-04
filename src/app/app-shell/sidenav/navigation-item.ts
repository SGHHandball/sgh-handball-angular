import {
  TC_ADMIN,
  TC_ROUTE_CDH,
  TC_ROUTE_EVENTS, TC_ROUTE_EXECUTIVES, TC_ROUTE_GENERAL_INFORMATION,
  TC_ROUTE_HALLS, TC_ROUTE_HOME,
  TC_ROUTE_IMPRINT, TC_ROUTE_LOGIN, TC_ROUTE_LOGOUT,
  TC_ROUTE_NEWS, TC_ROUTE_REFEREES, TC_ROUTE_SEASONS, TC_ROUTE_SGH, TC_ROUTE_SPONSORS,
  TC_ROUTE_TEAMS, TC_ROUTE_TIME_KEEPER, TC_ROUTE_TRAINING, TC_USERS
} from "../../translation.service";

export class NavigationItem {
  routerLink: string;
  routerDeepLink: string;
  routerName: string;
  routerIcon: string;

  noRouterLinkAction: boolean;

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

  withNoRouterLinkAction(noRouterLinkAction: boolean): NavigationItem {
    this.noRouterLinkAction = noRouterLinkAction;
    return this;
  }
}

export const ROUTE_INDEX = '';


export const NAVIGATION_ITEMS_CLUB = [
  new NavigationItem(TC_ROUTE_HOME, TC_ROUTE_HOME).withRouterIcon('home'),
  new NavigationItem([TC_ROUTE_SGH, TC_ROUTE_NEWS].join("/"), TC_ROUTE_NEWS).withRouterIcon('notifications'),
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
  new NavigationItem([TC_ROUTE_HOME, TC_ROUTE_EXECUTIVES].join("/"), TC_ROUTE_EXECUTIVES),
  new NavigationItem([TC_ROUTE_HOME, TC_ROUTE_REFEREES].join("/"), TC_ROUTE_REFEREES),
  new NavigationItem([TC_ROUTE_HOME, TC_ROUTE_TIME_KEEPER].join("/"), TC_ROUTE_TIME_KEEPER),
  new NavigationItem([TC_ROUTE_HOME, TC_ROUTE_CDH].join("/"), TC_ROUTE_CDH),
  /*new NavigationItem(TC_ROUTE_DOCUMENTS, TC_ROUTE_DOCUMENTS),*/
];

export const NAVIGATION_ITEMS_INFO = [
  new NavigationItem([TC_ROUTE_SGH, TC_ROUTE_EVENTS].join("/"), TC_ROUTE_EVENTS).withRouterIcon('event'),
  new NavigationItem(TC_ROUTE_TRAINING, TC_ROUTE_TRAINING).withRouterIcon('fitness_center'),
];

export const NAVIGATION_ITEMS_OTHER = [
  new NavigationItem(TC_ROUTE_SPONSORS, TC_ROUTE_SPONSORS).withRouterIcon('sports_handball'),
  new NavigationItem(TC_ROUTE_IMPRINT, TC_ROUTE_IMPRINT).withRouterIcon('feedback')
];

export const NAVIGATION_ITEM_ADMIN_LOGIN = new NavigationItem([TC_ADMIN, TC_ROUTE_LOGIN].join("/"), "Login").withRouterIcon('last_page');

export const NAVIGATION_ITEM_ADMIN = new NavigationItem([TC_ADMIN, TC_USERS].join("/"), "Nutzer").withRouterIcon('vpn_key');
export const NAVIGATION_ITEM_ADMIN_HALLS = new NavigationItem(TC_ROUTE_HALLS, TC_ROUTE_HALLS).withRouterIcon('account_balance');
export const NAVIGATION_ITEM_ADMIN_SEASONS = new NavigationItem([TC_ADMIN, TC_ROUTE_SEASONS].join("/"), "Saisons").withRouterIcon('date_range');
export const NAVIGATION_ITEM_ADMIN_LOGOUT = new NavigationItem([TC_ADMIN, TC_ROUTE_LOGOUT].join("/"), "Logout").withRouterIcon('first_page');

