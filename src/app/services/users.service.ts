import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Kid } from '../models/Kid';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';

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

  authState: any = null;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private route:ActivatedRoute,) { 
    
    this.kidsCollection = this.afs.collection('kids');
    this.kids = this.kidsCollection.valueChanges();

    this.parentsCollection = this.afs.collection('parents');
    this.parents = this.parentsCollection.valueChanges();
    
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

  }


  parentLogin(parent){
    return this.afAuth.auth.signInWithEmailAndPassword(parent.email, parent.password)
    .then((user) => {
      this.authState = user
      //this.createOneParent(user,parent)
      this.router.navigate(['/rodzic']);
    })
    .catch(error => console.log(error));
  }


  parentRegister(parent) {
    return this.afAuth.auth.createUserWithEmailAndPassword(parent.email, parent.password)
      .then((user) => {
        this.authState = user
        this.createOneParent(user,parent)
        this.router.navigate(['/rodzic']);
      })
      .catch(error => console.log(error));
  }

  kidLogin(kid){
    kid.email=kid.login+'@bt.com'
    return this.afAuth.auth.signInWithEmailAndPassword(kid.email, kid.password)
    .then((user) => {
      this.authState = user
      //this.createOneKid(user,kid)
      this.router.navigate(['/dziecko']);
    })
    .catch(error => console.log(error));
  }

  kidRegister(kid) {
    kid.email = kid.login + '@bt.com'
    return this.afAuth.auth.createUserWithEmailAndPassword(kid.email, kid.password)
    .then((user) => {
      this.authState = user
      this.createOneKid(user,kid)
      this.router.navigate(['/rodzic']);
    })
    .catch(error => console.log(error));
  }
  


 // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

      // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserEmail(): string {
    if (!this.authState) { return 'Guest' }
    else { return this.authState['email'] || 'No email provided' }
  }

  get currentUserLogin(): string {
    if (!this.authState) { return 'Guest' }
    else { return this.authState['email'].replace('@bt.com','') || 'No login provided' }
  }
   
  getLoggedUser(mode){

   if (mode=='parent') {
    return this.currentUserEmail
   } else if (mode=='kid') {
    return this.currentUserLogin
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

  deleteOneKid(kidId){
    this.kidDoc = this.afs.doc(`kids/${kidId}`)
    this.kidDoc.delete()
    return this.kids
  }

  updateOneKid(kid){
    this.kidDoc = this.afs.doc(`kids/${kid.login}`)
    this.kidDoc.update(kid)  
    return this.kid 
  }



  fetchParents() {
    return this.parents
  }

  getOneParent(parentId) {
    this.parentDoc = this.afs.doc(`parents/${parentId}`)
    this.parent = this.parentDoc.valueChanges()
    return this.parent
  }

  getParentKids(){

    this.kidsCollection = this.afs.collection<any>('kids', ref => {
      return ref.where('parentId', '==', this.currentUserEmail)
    });
    this.kids = this.kidsCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    })
    return this.kids
  }

  createOneParent(user,parent){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`parents/${parent.email}`);

    const data = {
      uid: user.uid,
      email: parent.email,
      displayname: 'mama'
    }

    return userRef.set(data)
    
  }

  createOneKid(user,kid){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`kids/${kid.login}`);

    const data = {
      uid: user.uid,
      login: kid.login,
      name: kid.name,
      parentId: kid.parentId,
      badges: kid.badges,
      birth: kid.birth,
      heroId: kid.heroId,
      password: kid.password,
    }

    return userRef.set(data)
    
  }



}
