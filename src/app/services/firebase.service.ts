import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Kid } from '../models/Kid';

@Injectable()
export class FirebaseService {

  kidsCollection: AngularFirestoreCollection<Kid>
  kids: Observable<Kid[]>
  kidDoc: AngularFirestoreDocument<Kid>

  constructor(public db: AngularFirestore) {
    //if we don't need id
    //this.kids = db.collection('kids').valueChanges();

    this.kidsCollection = db.collection('kids');

    this.kids = this.kidsCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Kid;
        data.id = a.payload.doc.id;
        return data;
      })
    })
  }

  userMissions

  getUserMissions(kidId){
    this.kidDoc = this.db.doc(`kids/${kidId}`)
    this.userMissions = this.kidDoc.collection<any>('userMissions').valueChanges()
    return this.userMissions
  }

   getKids(){
     return this.kids
   } 

   addKid(kid: Kid){
     this.kidsCollection.add(kid)
   }

   deleteKid(kid: Kid){
     this.kidDoc = this.db.doc(`kids/${kid.id}`)
     this.kidDoc.delete()
   }

   updateKid(kid: Kid){
    this.kidDoc = this.db.doc(`kids/${kid.id}`)
    this.kidDoc.update(kid)   
   }

}


