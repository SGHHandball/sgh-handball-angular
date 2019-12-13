import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractComponent} from "../../abstract/abstract.component";
import {Router} from "@angular/router";
import {
  TC_ROUTE_HEADER_CLUB,
  TC_ROUTE_HEADER_INFO,
  TC_ROUTE_HEADER_OTHER, TC_ROUTE_TEAMS,
  TranslationService
} from "../../translation.service";
import {
  NAVIGATION_ITEM_GENERAL_INFORMATION,
  NAVIGATION_ITEM_TEAM,
  NAVIGATION_ITEMS_CLUB, NAVIGATION_ITEMS_GEN_INFOS,
  NAVIGATION_ITEMS_INFO,
  NAVIGATION_ITEMS_OTHER, NavigationItem
} from "./navigation-item";
import {MatSidenav, MatSnackBar} from "@angular/material";
import {TeamsService} from "../../teams/teams.service";
import {Team} from "../../teams/team";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends AbstractComponent implements OnInit {

  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  handset: boolean;

  navItemsHeaderClubTC = TC_ROUTE_HEADER_CLUB;
  navItemsHeaderInfoTC = TC_ROUTE_HEADER_INFO;
  navItemsHeaderOtherTC = TC_ROUTE_HEADER_OTHER;

  navItemsClub = NAVIGATION_ITEMS_CLUB;
  navItemTeam = NAVIGATION_ITEM_TEAM;
  navItemGeneralInformation = NAVIGATION_ITEM_GENERAL_INFORMATION;
  navItemsInfo = NAVIGATION_ITEMS_INFO;
  navItemsOther = NAVIGATION_ITEMS_OTHER;

  teamsNavItems: NavigationItem[];

  teamsNavItemsVisible = false;

  generalInormationNavItems = NAVIGATION_ITEMS_GEN_INFOS;

  generalInformationNavItemsVisible = false;

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              public translationService: TranslationService,
              snackBar: MatSnackBar,
              public teamsService: TeamsService
  ) {
    super(breakpointObserver, snackBar);
    this.isHandset$.subscribe(handset => {
      this.handset = handset;
    })
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  closeSideNavOnHandheldMode() {
    if (this.handset) {
      this.drawer.close();
    }
  }

  toogleSideNav() {
    this.drawer.toggle();
  }

  toogleTeamsSideNav() {
    this.drawer.toggle().then(()=>{
      this.teamsNavItemsVisible = !this.teamsNavItemsVisible;
      this.drawer.toggle();
    })
  }

  toogleGenInfoSideNav() {
    this.drawer.toggle().then(()=>{
      this.generalInformationNavItemsVisible = !this.generalInformationNavItemsVisible;
      this.drawer.toggle();
    })
  }

  getTeamsAsNavItem(): Observable<NavigationItem[]> {
    const teamsToNavItemMapper = map((teams: Team[]) => {
      const teamsNavItems = [];
      teams.forEach((team: Team) => {
        teamsNavItems.push(new NavigationItem(TC_ROUTE_TEAMS, team.teamAge).withRouterDeepLink(team.teamAge))
      });
      return teamsNavItems;
    });
    return teamsToNavItemMapper(this.teamsService.loadAllTeamsAsync());
  }

  ngOnInit(): void {
    this.getTeamsAsNavItem().subscribe(navItems => {
      this.teamsNavItems = navItems;
    })
  }

}
