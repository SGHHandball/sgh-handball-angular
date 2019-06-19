import {Team} from "../teams/team";

export class SghUser {
  id: string = '';
  admin: boolean = false;
  eventsAdmin: boolean = false;
  hallsAdmin: boolean = false;
  teamsAdmin: boolean = false;
  teams: string[] = [];
  preName: string = '';
  lastName: string = '';


  constructor(preName: string, lastName: string) {
    this.preName = preName;
    this.lastName = lastName;
  }
}
