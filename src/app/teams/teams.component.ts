import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TeamsService} from "./teams.service";
import {AdminService} from "../admin/admin.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent extends AbstractComponent {


  constructor(breakpointObserver: BreakpointObserver,
              public teamsService: TeamsService) {
    super(breakpointObserver);
    this.teamsService.loadAllTeams();
  }

  addNewTeamToTab() {
  }
}
