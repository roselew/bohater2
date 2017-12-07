import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SessionService implements HttpInterceptor {

  session

  setSession(session){
    this.session = session
  }

  getSession(){
    return this.session
  }

  removeSession(){
    this.session = null
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(this.session && this.session["user-token"]){
      req = req.clone({
        headers: req.headers.append("user-token",this.session["user-token"])
      })
    }
    
    return next.handle(req)
  }

  constructor() { }

}
