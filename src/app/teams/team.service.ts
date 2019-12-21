import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../data/data.service";
import {Team} from "../model/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private dataService: DataService) {
  }

  getTeamAsStringFromTeams(teamId: string, teams: Team[]): string {
    const teamList = teams.filter(team => team.id === teamId);
    if (teamList.length > 0) {
      return this.getTeamAsString(teamList[0]);
    }
    return '';
  }


  getTeamAsString(team: Team): string {
    return [team.teamAge, team.teamSeason].join(' - ');
  }

}
