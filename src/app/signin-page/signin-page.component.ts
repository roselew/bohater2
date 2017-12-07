import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { selector } from 'rxjs/operator/publish';
import { Component, Inject, OnInit } from '@angular/core';
import { SessionService } from "../session/session.service";

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {
  

  constructor( @Inject('API_URL') private API_URL,
    private http: HttpClient,
    private router: Router,
    private sesionService:SessionService
    ) { }

  session

  signin(user) {
    this.http.post(this.API_URL + 'users/login', user)
      .subscribe(session => {
        this.sesionService.setSession(session)

        this.router.navigate(['/'])
      })
  }

  ngOnInit(){
    this.session = this.sesionService.getSession()
  }

}
