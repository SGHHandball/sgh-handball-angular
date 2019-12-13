import {Component, OnInit} from '@angular/core';
import {
  TC_IMPRINT_FIND_DATA_PROTECTION,
  TC_IMPRINT_FIND_MAIN_PAGE, TC_IMPRINT_HERE,
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

  mainPageTC = TC_IMPRINT_FIND_MAIN_PAGE;
  dataProtectionFindTC = TC_IMPRINT_FIND_DATA_PROTECTION;
  hereTC = TC_IMPRINT_HERE;

  constructor(public translationService: TranslationService) {
  }


}
