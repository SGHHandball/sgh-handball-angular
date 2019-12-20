import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {Team} from "../../teams/team";
import {Observable, of, Subject} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../../common/data.service";
import {SeasonService} from "../../seasons/season.service";
import {AdminService} from "../../admin/admin.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends AbstractComponent implements OnInit, OnDestroy {

  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  destroy$ = new Subject();

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

  teamsAdmin: boolean;

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              public translationService: TranslationService,
              snackBar: MatSnackBar,
              private dataService: DataService,
              private seasonService: SeasonService,
              private adminService: AdminService
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
    this.drawer.toggle().then(() => {
      this.teamsNavItemsVisible = !this.teamsNavItemsVisible;
      this.drawer.toggle();
    })
  }

  toogleGenInfoSideNav() {
    this.drawer.toggle().then(() => {
      this.generalInformationNavItemsVisible = !this.generalInformationNavItemsVisible;
      this.drawer.toggle();
    })
  }

  ngOnInit(): void {
    this.initTeamsAdmin();
    this.initTeamNavItems()
  }

  initTeamsAdmin() {
    let season: string;
    this.adminService.isUserTeamsAdmin()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(teamsAdmin => {
        this.teamsAdmin = teamsAdmin;
      }
    );
  }

  initTeamNavItems() {
    let season: string;
    this.dataService.getCurrentSeason()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(currentSeason => {
          season = this.seasonService.getSeasonAsString(currentSeason);
          return this.dataService.getTeamsBySeason(season)
        }),
        map((teams: Team[]) =>
          teams.map(
            team =>
              new NavigationItem(TC_ROUTE_TEAMS, team.teamAge)
                .withRouterDeepLink([team.teamSeason, team.teamAge].join('/'))
          )
        )
      )
      .subscribe(navItems => {
        this.teamsNavItems = navItems;
        if (this.teamsAdmin) {
          this.teamsNavItems.push(
            new NavigationItem(TC_ROUTE_TEAMS, "Neu")
              .withRouterIcon("add")
              .withRouterDeepLink([season, ""].join('/')))
        }
      })
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
