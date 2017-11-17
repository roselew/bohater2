import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-register',
  template: `
  <label>Email</label>
  <input placeholder='E-mail' [(ngModel)]="parent.email">
  <br>
  <label>Hasło</label>
  <input type='password' placeholder='Hasło' [(ngModel)]="parent.password">
  <br>
  <label>Powtórz hasło</label>
  <input type='password' placeholder='Powtórz Hasło' [(ngModel)]="checkpassword">

  <button (click)="addParent()">ZAREJESTRUJ</button>
  `,
  styles: [],

})
export class ParentRegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    ) { }

  ngOnInit() {
  }
  
  checkpassword
  parent = {}
  addParent(){
     if (this.parent['password']===this.checkpassword){
      this.http.post('http://localhost:3000/parents/', this.parent)
      .subscribe( parent => { 
        this.parent = parent; 
        this.router.navigate(['/rodzic-logowanie']);
      } )
    } 
  }
  


}
