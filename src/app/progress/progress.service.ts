import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProgressService {

  constructor(       
    @Inject('API_URL') private API_URL,    
    private http: HttpClient  
   ) { }
  
  getMissionsGiftsPoints(kidId){
    return this.http.get(this.API_URL+ 'kids/'+kidId+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
  }
  
}