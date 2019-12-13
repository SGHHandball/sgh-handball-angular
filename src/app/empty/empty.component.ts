import { Component, OnInit } from '@angular/core';
import {TC_EMPTY_SITE, TranslationService} from "../translation.service";

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  emptySiteTC = TC_EMPTY_SITE;

  constructor(public translationService: TranslationService) { }

  ngOnInit() {
  }

}
