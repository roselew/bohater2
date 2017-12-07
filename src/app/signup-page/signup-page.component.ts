import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor( @Inject('API_URL') private API_URL,
    private http: HttpClient,
    private router: Router) { }

  signup(user) {
    this.http.post(this.API_URL+'users/register',user)
    .subscribe(user => {
      console.log(user)
    })
  }

  ngOnInit() {
  }

}
