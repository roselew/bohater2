import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-login',
  template: `

  <label>Email</label>
  <input placeholder='E-mail' [(ngModel)]="parent.email">
  <br>
  <label>Hasło</label>
  <input type='password' placeholder='Hasło' [(ngModel)]="parent.password">

  
    <p> Logowanie tymczasowe, kliknij na rodzica żeby się zalogować </p>
    <ul>
      <li *ngFor="let parent of parents"
          (click)="logOn(parent.id)">
          {{parent.email}}
      </li>
    </ul>

    <button routerLink='/rodzic-rejestracja'>REJESTRACJA</button>
  `,
  styles: [],

})
export class ParentLoginComponent implements OnInit {

 parent ={}
 
  logOn(parentId){
    localStorage.clear()
    localStorage.setItem('loggedParent',parentId)  
    this.router.navigate(['/rodzic'])  
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  parents

  ngOnInit() {
    this.http.get('http://localhost:3000/parents/')
    .subscribe( parents => this.parents = parents )
  }

}
