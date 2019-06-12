import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractComponent} from "../../abstract/abstract.component";
import {Router} from "@angular/router";
import {
  TC_ROUTE_HEADER_CLUB,
  TC_ROUTE_HEADER_INFO,
  TC_ROUTE_HEADER_OTHER,
  TranslationService
} from "../../translation.service";
import {NAVIGATION_ITEMS_CLUB, NAVIGATION_ITEMS_INFO, NAVIGATION_ITEMS_OTHER} from "./navigation-item";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends AbstractComponent {

  handset: boolean;

  navItemsHeaderClubTC = TC_ROUTE_HEADER_CLUB;
  navItemsHeaderInfoTC = TC_ROUTE_HEADER_INFO;
  navItemsHeaderOtherTC = TC_ROUTE_HEADER_OTHER;

  navItemsClub = NAVIGATION_ITEMS_CLUB;
  navItemsInfo = NAVIGATION_ITEMS_INFO;
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

  closeSideNavOnHandheldMode(drawer) {
    if (this.handset) {
      drawer.close();
    }
  }

}
