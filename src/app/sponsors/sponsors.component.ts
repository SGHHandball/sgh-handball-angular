import {Component, OnDestroy, OnInit} from '@angular/core';
import {Sponsor} from "../model/sponsor";
import {AdminService} from "../admin/admin.service";
import {share, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {DataService} from "../data/data.service";
import {Router} from "@angular/router";
import {TC_PATH_EDIT, TC_ROUTE_SPONSORS} from "../translation.service";
import {AbstractService} from "../shared/abstract.service";

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  sponsors: Sponsor[];
  sponsorsLoaded = false;

  destroy$ = new Subject();


  constructor(
    private adminService: AdminService,
    private dataService: DataService,
    private router: Router,
    private abstractService: AbstractService,
  ) {
  }

  admin$ = this.adminService.isUserSponsorAdmin().pipe(share());

  ngOnInit() {
    this.initAllSponsors();
  }

  initAllSponsors() {
    this.dataService.getSponsors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(sponsors => {
        this.sponsors = [...sponsors.filter(sponsor => !!sponsor.directImgLink), ...sponsors.filter(sponsor => !sponsor.directImgLink)];
        this.sponsorsLoaded = true;
      })
  }

  addNewSponsor() {
    this.dataService.addSponsor(
      {
        sponsorName: '',
        sponsorDescription: '',
        sponsorLink: '',
        imgLinks: [],
        imgPaths: []
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(sponsorId => {
        this.openEditSponsorPage(sponsorId);
      })

  }

  openEditSponsorPage(sponsorId: string) {
    this.router.navigate([[TC_ROUTE_SPONSORS, TC_PATH_EDIT, sponsorId].join('/')])
  }

  deleteSponsor(sponsorId: string) {
    this.dataService.deleteSponsor(sponsorId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(sponsorId => {
        this.abstractService.openSnackBar("Sponsor erfolgreich gelöscht")
      })
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
