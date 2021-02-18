import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ArcocrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }

  create_Arco(record) {
    return this.firestore.collection('Arcos').add(record);
  }

  read_Arcos() {
    return this.firestore.collection('Arcos').snapshotChanges();
  }

  update_Arco(recordID, record) {
    this.firestore.doc('Arcos/' + recordID).update(record);
  }

  delete_Arco(record_id) {
    this.firestore.doc('Arcos/' + record_id).delete();
  }
}
