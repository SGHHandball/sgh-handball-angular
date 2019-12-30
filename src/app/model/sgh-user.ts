export interface SghUser {
  id: string;
  admin: boolean;
  eventsAdmin: boolean;
  hallsAdmin: boolean;
  teamsAdmin: boolean;
  sponsorAdmin: boolean;
  trainingsAdmin: boolean;
  documentsAdmin: boolean;
  teams: string[];
  preName: string;
  lastName: string;
}
