import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kid-login',
  template: `
  <p> Logowanie tymczasowe, kliknij na rodzica żeby się zalogować </p>
  <ul>
    <li *ngFor="let kid of kids"
        (click)="logOn(kid.id)">
        {{kid.name}}
    </li>
  </ul>

  `,
  styles: [],

})
export class KidLoginComponent implements OnInit {

  logOn(kidId){
    localStorage.clear()
    localStorage.setItem('loggedKid',kidId) 
    this.router.navigate(['/dziecko'])   
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  kids

  ngOnInit() {
    this.http.get('http://localhost:3000/kids/')
    .subscribe( kids => this.kids = kids )
  }
}
