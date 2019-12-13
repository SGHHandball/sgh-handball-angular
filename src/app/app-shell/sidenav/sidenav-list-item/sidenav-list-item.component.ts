import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslationService} from "../../../translation.service";
import {NavigationItem} from "../navigation-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-list-item',
  templateUrl: './sidenav-list-item.component.html',
  styleUrls: ['./sidenav-list-item.component.css']
})
export class SidenavListItemComponent {

  @Input() headerTitle: string;
  @Input() navItems: NavigationItem[];
  @Output() clickNavigationListener = new EventEmitter();

  constructor(public translationService: TranslationService,
              private router: Router) {
  }

  isRouterLinkActive(navItem: NavigationItem) {
    if (navItem.routerDeepLink) {
      return this.router.url.includes(navItem.routerLink) && this.router.url.includes(navItem.routerDeepLink)
    }
    return this.router.url.includes(navItem.routerLink);
  }

  getRouterLink(navItem: NavigationItem): string {
    if (navItem.noRouterLinkAction) return undefined;
    if (navItem.routerDeepLink) {
      return navItem.routerLink + '/' + navItem.routerDeepLink
    }
    return navItem.routerLink;
  }

}
