import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  role?: string;
}


@Injectable()
export class AuthService {

  parent: Observable<User>
  kid: Observable<any>

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
  ) {
      this.parent = this.afAuth.authState
        .switchMap(parent => {
          if (parent) {
            return this.afs.doc(`parents/${parent['email']}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })


        this.kid = this.afAuth.authState
        .switchMap(kid => {
          if (kid) {
            kid['login']=kid['email'].replace('@bt.com','');
            return this.afs.doc(`kids/${kid['login']}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })


   }



   getUser(){
     this.afAuth.authState.switchMap(user => {
        if (user) {
          let parentDoc = this.afs.doc(`parents/${user.email}`)
          let parent = parentDoc.valueChanges()
          return parent
        }
     })
   }

}
