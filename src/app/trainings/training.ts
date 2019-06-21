export class Training {
  id: string;
  team: TrainingTeam = new TrainingTeam();
  date: TrainingDate = new TrainingDate();
  trainer: Trainer = new Trainer();
  editTime: Date = new Date();
}

export class TrainingTeam {
  teamId: string;
  teamVintage: string;
}

export class TrainingDate {
  day: string;
  time: string;
  hallId: string;
}

export class Trainer {
  name: string;
  email: string;
  phoneNumber: string;
}

export class TrainingGroup {
  teamId: string;
  trainings: Training[];


  constructor(teamId: string, trainings: Training[]) {
    this.teamId = teamId;
    this.trainings = trainings;
  }
}
