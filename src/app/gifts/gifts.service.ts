import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()export class GiftsService {
  
  constructor(       
    @Inject('API_URL') private API_URL,    
    private http: HttpClient  
   ) { }
  
  getMissionsGiftsPoints(kidId){
    return this.http.get(this.API_URL+ 'kids/'+kidId+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
  }
  
  fetchGifts(kidId){    
    return this.http.get(this.API_URL+ 'kids/' + kidId + '/userGifts')  
  }
  
  fetchExpertGifts(){
    return this.http.get(this.API_URL+ 'expertGifts')      
  }
  
  getOneGift(giftId) {  
    return this.http.get(this.API_URL+ 'userGifts/' + giftId)  
  }
  
  getOneExpertGift(giftId) {
    return this.http.get(this.API_URL+ 'expertGifts/' + giftId)     
  }
  
  updateOneGift(gift){    
    return this.http.put(this.API_URL+ 'userGifts/'+ gift['id'], gift)  
  }
  
  deleteOneGift(giftId){  
    return this.http.delete(this.API_URL + 'userGifts/'+ giftId)
  }
  
  createOneGift(gift){
    return this.http.post(this.API_URL+ 'userGifts/', gift)
  }

  addExtraPoints(extraPoints){
    return this.http.post(this.API_URL+ 'extraPoints/', extraPoints)
  }
}
