export class SghUser {
  id:string;
  admin: boolean;
  teams: string[];
  preName: string;
  lastName: string;


  constructor(preName: string, lastName: string) {
    this.preName = preName;
    this.lastName = lastName;
  }
}
