import {Hall} from "../halls/hall";
import {Team} from "../teams/team";

export interface Training {
  id?: string;
  team?: TrainingTeam;
  date?: TrainingDate;
  trainer?: Trainer;
  editTime?: Date;
}

export interface TrainingTeam {
  teamId: string;
  teamVintage: string;
}

export interface TrainingDate {
  day: string;
  time: string;
  hallId: string;
}

export interface Trainer {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface TrainingGroup {
  teamId: string;
  trainings: Training[];
}

export interface TrainingsDialogData {
  training: Training,
  halls: Hall[],
  teams: Team[]
}
