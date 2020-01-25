import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Sponsor} from "../../model/sponsor";
import {AdminService} from "../../admin/admin.service";
import {share} from "rxjs/operators";

@Component({
  selector: 'app-sponsor-card',
  templateUrl: './sponsor-card.component.html',
  styleUrls: ['./sponsor-card.component.scss']
})
export class SponsorCardComponent implements OnInit {

  @Input() sponsor: Sponsor;

  @Output() editClickListener = new EventEmitter();
  @Output() deleteClickListener = new EventEmitter();

  sponsorAdmin$ = this.adminService.isUserSponsorAdmin().pipe(share());

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
  }

  openLink() {
    if (this.sponsor.sponsorLink)
      window.open(this.sponsor.sponsorLink);
  }

}
