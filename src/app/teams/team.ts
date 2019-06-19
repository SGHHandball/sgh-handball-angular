export class Team {
  id: string;
  position: number;
  teamAge: string;
  teamSeason: string;
  imgUrls: string[];


  constructor(position: number, teamAge: string, teamSeason: string) {
    this.position = position;
    this.teamAge = teamAge;
    this.teamSeason = teamSeason;
  }
}
