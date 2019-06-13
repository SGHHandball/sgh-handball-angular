import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Team} from "../team";
import {NewsService} from "../../news/news.service";

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent{

  @Input() team: Team;

  constructor() {
  }


}
