import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {
  TC_ROUTE_HEADER_CLUB,
  TC_ROUTE_HEADER_INFO,
  TC_ROUTE_HEADER_OTHER, TC_ROUTE_TEAMS,
  TranslationService
} from "../../translation.service";
import {
  NAVIGATION_ITEM_ADMIN, NAVIGATION_ITEM_ADMIN_HALLS,
  NAVIGATION_ITEM_ADMIN_LOGIN, NAVIGATION_ITEM_ADMIN_LOGOUT, NAVIGATION_ITEM_ADMIN_SEASONS,
  NAVIGATION_ITEM_GENERAL_INFORMATION,
  NAVIGATION_ITEM_TEAM,
  NAVIGATION_ITEMS_CLUB, NAVIGATION_ITEMS_GEN_INFOS,
  NAVIGATION_ITEMS_INFO,
  NAVIGATION_ITEMS_OTHER, NavigationItem
} from "./navigation-item";
import {MatSidenav} from "@angular/material";
import {Team} from "../../model/team";
import {Subject} from "rxjs";
import {first, map, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../../data/data.service";
import {SeasonService} from "../../admin/seasons/season.service";
import {AdminService} from "../../admin/admin.service";
import {AbstractService} from "../../shared/abstract.service";
import {SidenavService} from "./sidenav.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  destroy$ = new Subject();

  navItemsHeaderClubTC = TC_ROUTE_HEADER_CLUB;
  navItemsHeaderInfoTC = TC_ROUTE_HEADER_INFO;
  navItemsHeaderOtherTC = TC_ROUTE_HEADER_OTHER;

  navItemsClub = NAVIGATION_ITEMS_CLUB;
  navItemTeam = NAVIGATION_ITEM_TEAM;
  navItemGeneralInformation = NAVIGATION_ITEM_GENERAL_INFORMATION;
  navItemsInfo = NAVIGATION_ITEMS_INFO;
  navItemsOther = NAVIGATION_ITEMS_OTHER;

  navItemAdmin: NavigationItem[];

  teamsNavItems: NavigationItem[];

  generalInormationNavItems = NAVIGATION_ITEMS_GEN_INFOS;

  teamsAdmin: boolean;

  constructor(
    private router: Router,
    public translationService: TranslationService,
    private dataService: DataService,
    private seasonService: SeasonService,
    private adminService: AdminService,
    public abstractService: AbstractService,
    public sidenavService: SidenavService
  ) {
  }

  closeSideNavOnHandheldMode() {
    this.abstractService
      .isHandset$
      .pipe(first())
      .subscribe(handset => {
        if (handset) {
          this.drawer.close();
        }
      })
  }

  toggleSideNav() {
    if (this.drawer.opened && (this.sidenavService.generalInformationNavItemsVisible || this.sidenavService.teamsNavItemsVisible)) {
      if (this.sidenavService.generalInformationNavItemsVisible) {
        this.toggleGenInfoSideNav();
      } else if (this.sidenavService.teamsNavItemsVisible) {
        this.toggleTeamsSideNav();
      }
    } else
      this.drawer.toggle();
  }

  toggleTeamsSideNav() {
    this.abstractService.isHandset$
      .pipe(takeUntil(this.destroy$))
      .subscribe(handset => {
        if (handset) {
          this.drawer.toggle().then(() => {
            this.sidenavService.toggleTeamNavItems();
            this.drawer.toggle();
          })
        } else {
          this.sidenavService.toggleTeamNavItems();
        }
      });
  }

  toggleGenInfoSideNav() {
    this.abstractService.isHandset$
      .pipe(takeUntil(this.destroy$))
      .subscribe(handset => {
        if (handset) {
          this.drawer.toggle().then(() => {
            this.sidenavService.toggleGeneralInformationItems();
            this.drawer.toggle();
          })
        } else {
          this.sidenavService.toggleGeneralInformationItems();
        }
      });
  }

  ngOnInit(): void {
    this.initDrawerOnDesktop();
    this.initTeamsAdmin();
    this.initTeamNavItems();
    this.initAdmin();
  }

  initAdmin() {
    this.dataService
      .getSghUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        user => {
          this.navItemAdmin = [];
          if (user) {
            if (user.admin) {
              this.navItemAdmin.push(NAVIGATION_ITEM_ADMIN);
              this.navItemAdmin.push(NAVIGATION_ITEM_ADMIN_SEASONS);
            }
            if (user.hallsAdmin) {
              this.navItemAdmin.push(NAVIGATION_ITEM_ADMIN_HALLS);
            }
            this.navItemAdmin.push(NAVIGATION_ITEM_ADMIN_LOGOUT);
          } else {
            this.navItemAdmin.push(NAVIGATION_ITEM_ADMIN_LOGIN);
          }
        }
      )
  }

  initDrawerOnDesktop() {
    this.abstractService.isHandset$
      .pipe(first())
      .subscribe(handset => {
        if (!handset) this.toggleSideNav()
      })
  }

  initTeamsAdmin() {
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
