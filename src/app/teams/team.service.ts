import {Injectable} from '@angular/core';
import {DataService} from "../data/data.service";
import {Team} from "../model/team";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamDetail$ = new Subject<Team>();

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
