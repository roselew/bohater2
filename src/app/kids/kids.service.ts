import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class KidsService {

  constructor(
    @Inject('API_URL') private API_URL,
    private http: HttpClient,
  ) { }


  fetchKids() {
    return this.http.get(this.API_URL+ 'kids/')
  }

  fetchHeroes(){
    return this.http.get(this.API_URL+ 'expertHeroes')
  }

  getOneKid(kidId) {
    return this.http.get(this.API_URL+ 'kids/'+kidId)
  }

  getKidHero(kidId){
    return this.http.get(this.API_URL+ 'kids/'+kidId + '?_embed=userHeroes')
  }

  deleteOneKid(kidId){
    return this.http.delete(this.API_URL+ 'kids/'+ kidId)
  }

  updateOneKid(kid){
    return this.http.put(this.API_URL+ 'kids/'+ kid['id'], kid)
  }

  updateOneHero(hero){
    return this.http.put(this.API_URL+ 'userHeroes/'+ hero['id'], hero)
  }

  createOneKid(kid){
    return this.http.post(this.API_URL+ 'kids/',kid)
  }

  createOneHero(hero){
    return this.http.post(this.API_URL+ 'userHeroes/',hero)
  }

}
