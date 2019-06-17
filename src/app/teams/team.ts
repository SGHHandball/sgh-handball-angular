export class Team {
  id: string;
  position: number;
  teamAge: string;
  teamYear: string;
  imgUrls: string[];


  constructor(position: number, teamAge: string, teamYear: string) {
    this.position = position;
    this.teamAge = teamAge;
    this.teamYear = teamYear;
  }
}
