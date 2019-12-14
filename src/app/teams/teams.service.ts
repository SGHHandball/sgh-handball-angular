import {Injectable} from '@angular/core';
import {Team} from "./team";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: Team[];
  teamsLoaded = false;
  seasonToLoad = DEFAULT_YEAR;

  editTeamsActive = false;


  getTeamById(teamId: string): Team {
    let teamToReturn = undefined;
    this.teams.forEach(team => {
      if (team.id === teamId) teamToReturn = team;
    });
    return teamToReturn;
  }

  getTeamAsString(team: Team): string {
    return team.teamAge;
  }
}

export const DB_COLLECTION_TEAMS = 'teams';

export const DEFAULT_YEAR = '2019-2020';

