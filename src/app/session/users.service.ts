import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(   
    @Inject('API_URL') private API_URL,
    private http: HttpClient, 
   ) { }
   
  getLoggedUser(mode){
   if (mode=='parent') {
     return +localStorage.getItem('loggedParent')
   } else if (mode=='kid') {
     return +localStorage.getItem('loggedKid')
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
    return this.http.get(this.API_URL+ 'kids/')
  }

  getOneKid(kidId) {
    return this.http.get(this.API_URL+ 'kids/'+kidId)
  }

  deleteOneKid(kidId){
    return this.http.delete(this.API_URL+ 'kids/'+ kidId)
  }

  updateOneKid(kid){
    return this.http.put(this.API_URL+ 'kids/'+ kid['id'], kid)
  }

  createOneKid(kid){
    return this.http.post(this.API_URL+ 'kids/',kid)
  }

  fetchParents() {
    return this.http.get(this.API_URL+ 'parents/')
  }

  getOneParent(parentId) {
    return this.http.get(this.API_URL+ 'parents/'+parentId)
  }

  getParentKids(parentId){
    return this.http.get(this.API_URL+ 'parents/'+parentId+'?_embed=kids')
  }

  createOneParent(parent){
    return this.http.post(this.API_URL+ 'parents/', parent)
  }



}
