import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Kid } from '../models/Kid';

@Injectable()
export class UsersService {

  kidsCollection: AngularFirestoreCollection<Kid>
  kids: Observable<Kid[]>
  kidDoc: AngularFirestoreDocument<Kid>
  kid: Observable<Kid>

  parentsCollection: AngularFirestoreCollection<any>
  parents: Observable<any[]>
  parentDoc: AngularFirestoreDocument<any>
  parent: Observable<any>

  parentsKidsCollection: AngularFirestoreCollection<any>
  parentsKids: Observable<any[]>

  constructor(public afs: AngularFirestore) { 

    this.kidsCollection = this.afs.collection('kids');
    this.kids = this.kidsCollection.valueChanges();

    this.parentsCollection = this.afs.collection('parents');
    this.parents = this.parentsCollection.valueChanges();
   }
   
  getLoggedUser(mode){
   if (mode=='parent') {
     return localStorage.getItem('loggedParent')
   } else if (mode=='kid') {
     return localStorage.getItem('loggedKid')
   } 
  }

  setLoggedUser(mode,id){
      localStorage.clear()
    if (mode=='parent') {
      localStorage.setItem('loggedParent',id)
    } else if (mode=='kid') {
      localStorage.setItem('loggedKid',id)
    }
  }

  fetchKids() {
    return this.kids
  }

  getOneKid(kidId) {
    this.kidDoc = this.afs.doc(`kids/${kidId}`)
    this.kid = this.kidDoc.valueChanges()
    return this.kid
  }

  deleteOneKid(kid){
    this.kidDoc = this.afs.doc(`kids/${kid.login}`)
    this.kidDoc.delete()
    return this.kids
  }

  updateOneKid(kid){
    this.kidDoc = this.afs.doc(`kids/${kid.login}`)
    this.kidDoc.update(kid)  
    return this.kid 
  }

  createOneKid(kid){
    this.kidsCollection.doc(`${kid.login}`).set(kid)
    return this.kids
  }

  fetchParents() {
    return this.parents
  }

  getOneParent(parentId) {
    this.parentDoc = this.afs.doc(`parents/${parentId}`)
    this.parent = this.parentDoc.valueChanges()
    return this.parent
  }

  getParentKids(parentId){
    this.parentsKidsCollection = this.afs.collection<any>('kids', ref => {
      return ref
              .where('parentId', '==', parentId)
    });
    this.parentsKids = this.parentsKidsCollection.valueChanges();
    return this.parentsKids
  }

  createOneParent(parent){
    this.parentsCollection.doc(`${parent.email}`).set(parent)
    return this.parents
  }



}
