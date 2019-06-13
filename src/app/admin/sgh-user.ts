import {Team} from "../teams/team";

export class SghUser {
  id: string = '';
  admin: boolean = false;
  teams: Team[] = [];
  preName: string = '';
  lastName: string = '';


  constructor(preName: string, lastName: string) {
    this.preName = preName;
    this.lastName = lastName;
  }
}
