import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractComponent} from "../../abstract/abstract.component";
import {Router} from "@angular/router";
import {TC_ROUTE_HEADER_CLUB, TC_ROUTE_HEADER_OTHER, TranslationService} from "../../translation.service";
import {AdminService} from "../../admin/admin.service";
import {NAVIGATION_ITEMS_CLUB, NAVIGATION_ITEMS_OTHER} from "./navigation-item";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends AbstractComponent {

  handset: boolean;

  navItemsHeaderClubTC = TC_ROUTE_HEADER_CLUB;
  navItemsHeaderOtherTC = TC_ROUTE_HEADER_OTHER;

  navItemsClub = NAVIGATION_ITEMS_CLUB;
  navItemsOther = NAVIGATION_ITEMS_OTHER;

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              public translationService: TranslationService) {
    super(breakpointObserver);
    this.isHandset$.subscribe(handset => {
      this.handset = handset;
    })
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  isRouterLinkActive(routerLink: string) {
    return this.router.url.includes(routerLink);
  }

  closeSideNavOnHandheldMode(drawer) {
    if (this.handset) {
      drawer.close();
    }
  }

}
