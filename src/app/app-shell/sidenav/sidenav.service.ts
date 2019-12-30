import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {


  teamsNavItemsVisible = false;

  generalInformationNavItemsVisible = false;

  constructor() {
  }

  toggleTeamNavItems() {
    this.teamsNavItemsVisible = !this.teamsNavItemsVisible;
  }

  toggleGeneralInformationItems() {
    this.generalInformationNavItemsVisible = !this.generalInformationNavItemsVisible;
  }
}
