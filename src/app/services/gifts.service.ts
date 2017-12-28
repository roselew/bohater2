import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()export class GiftsService {
  
  userGiftsCollection: AngularFirestoreCollection<any>
  userGifts: Observable<any[]>
  userGiftDoc: AngularFirestoreDocument<any>
  userGift : Observable<any>
  
  extraPointsCollection: AngularFirestoreCollection<any>
  extraPoints: Observable<any[]>

  constructor(private afs: AngularFirestore) { }
  
   getMissionsGiftsPoints(kidId){
  //  return this.http.get(this.API_URL+ 'kids/'+kidId+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
   }
  
  fetchGifts(kidId){    
    this.userGiftsCollection = this.afs.collection<any>('userGifts', ref => {
      return ref.where('kidId', '==', kidId)
    });
    this.userGifts = this.userGiftsCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
    return this.userGifts
  }
   
  getOneGift(giftId) {  
    this.userGiftDoc = this.afs.doc(`userGifts/${giftId}`)
    this.userGift = this.userGiftDoc.valueChanges()
    return this.userGift 
  }

  updateOneGift(gift,giftId){
    this.userGiftDoc = this.afs.doc(`userGifts/${giftId}`) 
    this.userGiftDoc.update(gift)  
    return this.userGift
  }

  deleteOneGift(gift){
    this.userGiftDoc = this.afs.doc(`userGifts/${gift.id}`)
    this.userGiftDoc.delete()
    return this.userGifts
  }

  createOneGift(gift){
    this.userGiftsCollection.add(gift)
    return this.userGifts
  }

  fetchExtraPoints(kidId){
    this.extraPointsCollection = this.afs.collection<any>('extraPoints', ref => {
      return ref.where('kidId', '==', kidId)
    });
    this.extraPoints = this.extraPointsCollection.valueChanges()
    return this.extraPoints
  }

  addExtraPoints(extraPoints){
    this.extraPointsCollection = this.afs.collection<any>('extraPoints')
    this.extraPointsCollection.add(extraPoints)
    this.extraPoints = this.extraPointsCollection.valueChanges()
    return this.extraPoints
  }
}
