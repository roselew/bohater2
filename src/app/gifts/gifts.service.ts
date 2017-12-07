import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()export class GiftsService {
  
  constructor(       
    @Inject('API_URL') private API_URL,    
    private http: HttpClient  
   ) { }
  

  fetchGifts(kidId){    
    return this.http.get(this.API_URL+ 'kids/' + kidId + '/userGifts')  
  }
  
  getOneGift(giftId) {  
    return this.http.get(this.API_URL+ 'userGifts/' + giftId)  
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
