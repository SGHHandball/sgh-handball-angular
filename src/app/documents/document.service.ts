import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Document} from "./document";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];
  documentsLoaded = false;

  constructor(private db: AngularFirestore) {
  }

  loadAllDocuments(): Promise<void> {
    return new Promise<void>(resolve =>
      this.db.collection<Document>(DB_COLLECTION_DOCUMENTS,
        ref => ref.orderBy('name', 'asc')).snapshotChanges()
        .pipe(
          map(actions => {
              return actions.map(action => {
                const data = action.payload.doc.data() as Document;
                data.id = action.payload.doc.id;
                return data;
              })
            }
          )
        ).subscribe(documents => {
        this.documents = documents;
        this.documentsLoaded = true;
        resolve();
      }));
  }


  changeDocument(document: Document, existing: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (existing) {
        this.db.collection<Document>(DB_COLLECTION_DOCUMENTS).doc(document.id).set((JSON.parse(JSON.stringify(document))))
          .then(() => resolve(true))
          .catch(() => resolve(false))
      } else {
        this.db.collection<Document>(DB_COLLECTION_DOCUMENTS).add(JSON.parse(JSON.stringify(document)))
          .then(() => resolve(true)).catch(() => resolve(false))
      }
    });
  }

  deleteDocument(document: Document) {
    return this.db.collection<Document>(DB_COLLECTION_DOCUMENTS).doc(document.id).delete();
  }
}

export const DB_COLLECTION_DOCUMENTS = 'documents';
