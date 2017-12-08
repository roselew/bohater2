import { Injectable} from '@angular/core';

@Injectable()
export class UsersService {

  constructor(    
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

}
