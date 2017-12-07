import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()export class MissionsService {
  constructor(       
    @Inject('API_URL') private API_URL,    
    private http: HttpClient  
   ) { }
  
  userGifts = [];
  
  fetchGifts(kidId){    
    return this.http.get(this.API_URL+ 'kids/' + kidId + '/userGifts')  
  }
  
  getOneGift(giftId) {  
    return this.http.get(this.API_URL+ 'userGifts/' + giftId)  
  }
  
  updateOneGift(giftId, gift){    
    return this.http.put(this.API_URL+ 'userGifts/'+ giftId, gift)  
  }
  
  
}
