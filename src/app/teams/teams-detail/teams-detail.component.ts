import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Team} from "../team";
import {NewsService} from "../../news/news.service";
import {AbstractComponent} from "../../abstract/abstract.component";

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent extends AbstractComponent{

  @Input() team: Team;



}
