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

  getOneKid(kidId) {
    return this.http.get(this.API_URL+ 'kids/'+kidId)
  }

}
