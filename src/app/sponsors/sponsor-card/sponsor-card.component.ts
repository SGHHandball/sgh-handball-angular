import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Sponsor} from "../../model/sponsor";

@Component({
  selector: 'app-sponsor-card',
  templateUrl: './sponsor-card.component.html',
  styleUrls: ['./sponsor-card.component.scss']
})
export class SponsorCardComponent implements OnInit {

  @Input() sponsor: Sponsor;

  @Output() editClickListener = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  openLink() {
    if (this.sponsor.sponsorLink)
      window.open(this.sponsor.sponsorLink);
  }

}
