export class Team {
  id: string;
  position: number;
  teamAge: string;
  teamSeason: string;
  teamVintage: string;
  imgUrls: string[];


  constructor(position: number, teamAge: string, teamSeason: string) {
    this.position = position;
    this.teamAge = teamAge;
    this.teamSeason = teamSeason;
  }
}
