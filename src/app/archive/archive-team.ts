import {Season} from "../model/season";
import {Team} from "../model/team";

export interface ArchiveTeam {
  season?: Season;
  teams?: Team[];
}
