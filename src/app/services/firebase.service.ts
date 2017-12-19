import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Kid } from '../models/Kid';

@Injectable()
export class FirebaseService {

  kidsCollection: AngularFirestoreCollection<Kid>
  kids: Observable<Kid[]>
  kidDoc: AngularFirestoreDocument<Kid>

  userMissionsCollection: AngularFirestoreCollection<any>
  userMissions: Observable<any[]>
  userMissionDoc: AngularFirestoreDocument<any>

  userGiftsCollection: AngularFirestoreCollection<any>
  userGifts: Observable<any[]>
  userGiftDoc: AngularFirestoreDocument<any>

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


  getUserMissions(kidId){
    this.userMissionsCollection = this.db.collection<any>('userMissions', ref => {
      // Compose a query using multiple .where() methods
      return ref
              .where('kidId', '==', kidId)
    });
    this.userMissions = this.userMissionsCollection.valueChanges();
    return this.userMissions
  }

  getUserGifts(kidId){
    this.userGiftsCollection = this.db.collection<any>('userGifts', ref => {
      // Compose a query using multiple .where() methods
      return ref
              .where('kidId', '==', kidId)
    });
    this.userGifts = this.userGiftsCollection.valueChanges();
    return this.userGifts
  }

   getKids(){
     return this.kids
   } 

   addKid(kid: Kid){
     this.kidsCollection.doc(`${kid.login}`).set(kid)
     //this.kidsCollection.add(kid)
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


