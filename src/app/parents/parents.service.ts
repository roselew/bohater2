import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ParentsService {

  constructor(
    @Inject('API_URL') private API_URL,
    private http: HttpClient,
  ) { }


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
