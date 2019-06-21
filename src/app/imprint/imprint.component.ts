import {Component, OnInit} from '@angular/core';
import {
  TC_IMPRINT_FIND_DATA_PROTECTION,
  TC_IMPRINT_FIND_IMPRINT, TC_IMPRINT_HERE,
  TC_ROUTE_IMPRINT,
  TranslationService
} from "../translation.service";

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.css']
})
export class ImprintComponent {

  imprintTC = TC_ROUTE_IMPRINT;

  imprintFindTC = TC_IMPRINT_FIND_IMPRINT;
  dataProtectionFindTC = TC_IMPRINT_FIND_DATA_PROTECTION;
  hereTC = TC_IMPRINT_HERE;

  constructor(public translationService: TranslationService) {
  }


}
