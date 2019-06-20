import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Training} from "./training";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  trainingsObservable: Observable<Training[]>;

  constructor(private db: AngularFirestore) {
  }

  loadAllTrainings() {
    this.trainingsObservable = this.db.collection<Training>(DB_COLLECTION_TRAININGS).snapshotChanges()
      .pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Training;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      )
  }

  changeTraining(training: Training, existing: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (existing) {
        this.db.collection<Training>(DB_COLLECTION_TRAININGS).doc(training.id).update(
          {
            teamId: training.teamId,
            trainer:training.trainer,
            dates: training.date,
          }
        ).then(() => resolve(true)).catch(() => resolve(false))
      } else {
        this.db.collection<Training>(DB_COLLECTION_TRAININGS).add(JSON.parse(JSON.stringify(training)))
          .then(() => resolve(true)).catch(() => resolve(false))
      }
    });
  }

  deleteTraining(training: Training) {
    return this.db.collection<Training>(DB_COLLECTION_TRAININGS).doc(training.id).delete();
  }
}


export const DB_COLLECTION_TRAININGS = 'trainings';
