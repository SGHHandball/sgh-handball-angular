import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Hall} from "./hall";
import {Observable} from "rxjs";
import {SghUser} from "../admin/sgh-user";
import {map} from "rxjs/operators";
import {SGH_USERS} from "../admin/admin.service";

@Injectable({
  providedIn: 'root'
})
export class HallsService {

  hallsObservable: Observable<Hall[]>;

  constructor(private db: AngularFirestore) {
  }

  loadAllHalls() {
    this.hallsObservable = this.db.collection<Hall>(DB_COLLECTION_HALLS).snapshotChanges()
      .pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Hall;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      )
  }

  changeHall(hall: Hall, existing: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (existing) {
        this.db.collection<Hall>(DB_COLLECTION_HALLS).doc(hall.id).update(
          {
            hallId: hall.hallId,
            name: hall.name,
            street: hall.street,
            postCode: hall.postCode,
            city: hall.city,
          }
        ).then(() => resolve(true)).catch(() => resolve(false))
      } else {
        this.db.collection<Hall>(DB_COLLECTION_HALLS).add(JSON.parse(JSON.stringify(hall))).then(() => resolve(true)).catch(() => resolve(false))
      }
    });
  }

  deleteHall(hall: Hall) {
    return this.db.collection<Hall>(DB_COLLECTION_HALLS).doc(hall.id).delete();
  }
}


export const DB_COLLECTION_HALLS = 'halls';
